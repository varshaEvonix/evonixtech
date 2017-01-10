/**
 * Admin_dashController
 *
 * @description :: Server-side logic for managing admin_dashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var pager = require('sails-pager');
var mysql = require('mysql');
module.exports = {
    'admin_dash': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var student_count = 0;
            var active_student_count = 0;
            var inactive_student_count = 0;
            var locked_student_count = 0;
            Student_details.query('SELECT count(*) as student_count from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id', function (err, the_rows) {

                student_count = the_rows[0].student_count;

                Student_details.query('SELECT count(*) as active_student_count from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_active="1"', function (err, active_student) {

                    active_student_count = active_student[0].active_student_count;

                    Student_details.query('SELECT count(*) as inactive_student_count from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_active="0"', function (err, inactive_student) {

                        inactive_student_count = inactive_student[0].inactive_student_count;

                        Student_details.query('SELECT count(*) as locked_student_count from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where profile_lock="1"', function (err, locked_student) {

                            locked_student_count = locked_student[0].locked_student_count;

                            return res.view('./admin/admin_dash', {
                                layout: false,
                                student_count: student_count,
                                active_student_count: active_student_count,
                                inactive_student_count: inactive_student_count,
                                locked_student_count: locked_student_count,
                            });
                        });
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }

    },
    get_student: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = 'SELECT *,student_details.student_id as student_id FROM student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id order by student_details.created_on desc LIMIT ' + start_from + ', ' + per_page + '';

            Student_details.query(q, function (err, results) {

                var all_rows = Student_details.query('SELECT count(*) as erow from student_details ', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }
                    res.view('./admin/student_listing', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    viewdetails: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var recordset = [];
            var photorecord = [];
            var loan_l = [];
            var donor_l = [];
            var loan_comments = [];
            Student_details.query('SELECT mf.id, mf.fafsa_values, slc.profile_lock, sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%m-%d-%Y") as student_birthdate, sd.student_about_me,sd.student_email, sd.student_contactno, IFNULL(sd.student_ambition,"") student_ambition, sd.student_city,  sd.student_state, sd.student_address, sd.video_link, sd.student_country, sd.zip_code, sd.student_profile_pic_path, IFNULL(ed.student_education_institute, "") student_education_institute, IFNULL(ed.student_education_fieldofstudy, "") student_education_fieldofstudy, ld.loan_id, ld.loan_fafsa_id, IFNULL(ld.loan_bankname, "") loan_bankname, IFNULL(ld.loan_accountno, "") loan_accountno, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join education ed on ed.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id left join mst_fafsa mf on mf.id = ld.loan_fafsa_id where sd.student_id = ' + req.param("id") + ' group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount', function (err, recordset) {

                Student_photographs.query('SELECT * from student_photographs where student_id=' + req.param('id'), function (err, photorecord) {

                    Loan_details.query('SELECT loan_id, student_id, loan_amount, IFNULL(mst_fafsa.fafsa_values,"-") fafsa_values, IFNULL(loan_fafsa_id, "-") loan_fafsa_id, IFNULL(loan_bankname, "-") loan_bankname, IFNULL(loan_accountno, "-") loan_accountno from loan_details left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where loan_details.student_id= ' + req.param('id') + ' AND loan_details.isActive = 0', function (err, loan_l) {

                        Student_details.query('SELECT dfd.donors_name, dfd.donors_comment, dfd.donor_email, dfd.funded_amount, DATE_FORMAT(dfd.funding_date,"%Y-%m-%d") as funding_date FROM  loan_details ld  inner join donors_funding_details dfd on ld.loan_id = dfd.loan_id and ld.isActive = 1 where ld.student_id=' + req.param('id'), function (err, donor_l) {

                            Admin_loan_comments.query('SELECT *, DATE_FORMAT(alc.last_updated,"%Y-%m-%d") as last_updated from admin_loan_comments alc inner join loan_details ld on ld.loan_id = alc.loan_id where student_id=' + req.param("id") + ' order by last_updated desc', function (err, loan_comments) {

                                return res.view('./admin/studprofile', {
                                    student_info: recordset[0],
                                    pics: photorecord,
                                    loan_list: loan_l,
                                    doner_result: donor_l,
                                    admin_comments: loan_comments

                                });
                            });

                        });

                    });

                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    activestudent: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = 'SELECT *,student_details.student_id as student_id FROM student_details  left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.student_active="1" order by student_details.created_on desc LIMIT ' + start_from + ', ' + per_page + '';

            Student_details.query(q, function (err, results) {
                var all_rows = Student_details.query('SELECT count(*) as erow from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.student_active="1"', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }

                    res.view('./admin/activate_student_listing', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    inactivestudent: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = 'SELECT *,student_details.student_id as student_id FROM student_details  left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.student_active="0" order by student_details.created_on desc LIMIT ' + start_from + ', ' + per_page + '';

            Student_details.query(q, function (err, results) {

                var all_rows = Student_details.query('SELECT count(*) as erow from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.student_active="0" ', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }

                    res.view('./admin/inactive_student_listing', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    lockedstudent: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = 'SELECT *,student_details.student_id as student_id FROM student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.profile_lock="1" order by student_login_credentials.last_updated desc LIMIT ' + start_from + ', ' + per_page + '';

            Student_details.query(q, function (err, results) {

                var all_rows = Student_details.query('SELECT count(*) as erow from student_details left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.profile_lock="1" ', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }

                    res.view('./admin/locked_student_listing', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    change_status: function (req, res) {

        var q = "UPDATE `student_login_credentials` SET `student_active` = '" + req.param('stu_status') + "' WHERE `student_login_credentials`.`student_id` =" + req.param('student_id');
        Student_login_credentials.query(q, function (err, doner_result) {

            res.ok();

        });

    },
    upload_file: function (req, res) {

        if (req.method === 'POST') {
            var file = req.file('file');
            var filename = req.file('file')._files[0].stream.filename;
            var newfilename = Date.now() + filename;
            req.file('formdata').upload({dirname: '../public/index_files/uploads/', saveAs: newfilename}, function onUploadComplete(err, files) {

                return res.ok(newfilename);
            });
        }
    },
    add_notes: function (req, res) {

        var fs = require("fs");
        var file = req.file('file');
        var student_id = req.param('student_id');
//        var filename = req.file('file')._files[0].stream.filename;
        var dir_name = student_id;
        var dir = '.tmp/public/index_files/uploads/' + dir_name;
        var newfilename = '';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

//            var newfilename = Date.now() + filename;
        req.file('file').upload({dirname: '../public/index_files/uploads/' + dir_name + '/'}, function onUploadComplete(err, files) {
            if (err) {
         
            }
            if (files.length > 0) {

                newfilename = files[0].fd.split('/').slice(-1);
            }

            var insert_query = "INSERT INTO `admin_loan_comments` (`loan_id`, `note`, `note_type`, `note_attachment`, `admin_id`) VALUES ('" + req.param('loan_id') + "', " + mysql.escape(req.param('note')) + ", '" + req.param('note_type') + "', '" + newfilename + "', '1')";

            Admin_loan_comments.query(insert_query, function (err, record)
            {
                console.log(insert_query)

            });
            return res.redirect('admin/viewdetails/' + req.param('student_id'));
        });

    },
    studlockedprofile: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var q = 'SELECT *, DATE_FORMAT(student_changed_time,"%Y-%m-%d") as student_changed_time FROM student_changed_val left join student_field_master on student_changed_val.student_master_field_id=student_field_master.student_master_field_id where student_changed_val.is_new_change="1" AND student_changed_val.admin_approval=0 AND student_changed_val.student_id=' + req.param('id') + ' order by student_changed_val.student_changed_time desc';

            Student_changed_val.query(q, function (err, results) {
                var mst_fafsa = 'SELECT * from mst_fafsa';

                Mst_fafsa.query(mst_fafsa, function (err, mst_fafsa_result) {
                    var fields = 'SELECT * from student_field_master';

                    Student_field_master.query(fields, function (err, all_fields) {

                        return   res.view('./admin/studlockedprofile', {
                            layout: false,
                            student_records: results,
                            mst_fafsa: mst_fafsa_result,
                            all_fields: all_fields,
                        });
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    update_student_profile: function (req, res) {

        var student_details = '';
        var admin_approve = req.param('profile_status');
        var approved_values = req.param('approved_values');

        if (approved_values != undefined && admin_approve == '1') {

            approved_values.forEach(function (values, index) {
                var query = "UPDATE `student_changed_val` SET `admin_approval` = '" + admin_approve + "', is_new_change='0', admin_changed_time=NOW() WHERE `student_changed_val`.`student_master_field_id`='" + values + "' AND `student_changed_val`.`student_id` =" + req.param('student_id');
                Student_changed_val.query(query, function (err, results) {

                });
            });
        }

        if (admin_approve == '0') {

            var insert = "INSERT INTO `notifications` (`notifiaction`, `student_id`, `by_admin`) VALUES ('" + req.param('admin_note') + "', '" + req.param('student_id') + "', '1');";
            console.log('insert')
            console.log(insert)
            Notifications.query(insert, function (err, results) {

                var fetch_student = "select * from student_details where student_id =" + req.param('student_id');
                console.log('fetch_student')
                console.log(fetch_student)
                Student_details.query(fetch_student, function (err, studentdetails) {
                    var send_grid_token = "select token from send_grid_token where id =1";
                    Send_grid_token.query(send_grid_token, function (err, token) {

                        var temp = JSON.stringify(studentdetails);
                        var student_details = JSON.parse(temp)[0];
                        var helper = require('sendgrid').mail;
                        var from_email = new helper.Email('support@stumuch.com');
                        var to_email = new helper.Email(student_details.student_email);
                        var subject = 'Stumuch Notification';
                        var html = req.param('admin_note');
                        html = html.replace(/\n/gi, '<br/>');
                        var mail_content = "Hi " + student_details.student_firstname + ' <br/><br/>' + html;
                        var content = new helper.Content('text/html', mail_content);
                        var mail = new helper.Mail(from_email, subject, to_email, content);

                        var sg = require('sendgrid')(token[0].token);
                        var request = sg.emptyRequest({
                            method: 'POST',
                            path: '/v3/mail/send',
                            body: mail.toJSON(),
                        });

                        sg.API(request, function (error, response) {
//                                console.log(token[0].token);
//                                console.log('response.statusCode');
//                                console.log(response.statusCode);
//                                console.log(response.body);
//                                console.log(response.headers);
                        });

                    });
                });

            });
            req.flash('error', '<div class="alert alert-danger "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>You have disapproved some field changes. An email has been sent out to the user who owns this account to inform about the disapproval. Make sure that when you disapprove a change, explain yourself, ask for documentation, and / or suggest for further clarifications or changes.</div>');
        } else {
            req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Fields are approved</div>');
        }
        return res.redirect('admin/locked_student_profile/' + req.param('student_id'));

    },
    locked_student_profile: function (req, res) {
        var q = "SELECT * FROM student_changed_val where student_id=" + req.param('student_id') + " AND admin_approval=0 AND is_new_change='1'";
        Student_changed_val.query(q, function (err, record) {

            if (record.length == 0) {
                var update_query = "UPDATE `student_login_credentials` SET `profile_lock` =0 WHERE `student_login_credentials`.`student_id` =" + req.param('student_id');

                Student_login_credentials.query(update_query, function (err, results) {

                });
//                var path = '/admin/viewdetails/' + req.param('student_id');
                var path = '/admin/lockedstudent/1';
            } else {
                var path = '/admin/studlockedprofile/' + req.param('student_id');
            }
            return res.ok({path: path});
        });
    },
    donors_listing: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = 'SELECT *,DATE_FORMAT(funding_date,"%Y-%m-%d") as funding_date FROM donors_funding_details left join loan_details on loan_details.loan_id=donors_funding_details.loan_id left join student_details on loan_details.student_id=student_details.student_id where loan_details.isActive="1" order by donors_funding_details.funding_date desc LIMIT ' + start_from + ', ' + per_page + '';

            Donors_funding_details.query(q, function (err, results) {

                var all_rows = Student_details.query('SELECT count(*) as erow from donors_funding_details left join loan_details on loan_details.loan_id=donors_funding_details.loan_id left join student_details on loan_details.student_id=student_details.student_id where loan_details.isActive="1" ', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }

                    res.view('./admin/donor_listing', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    alltransactions: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = 'SELECT donors_funding_details.*,TIME_FORMAT(funding_date,"%H:%i %r") as funding_time,DATE_FORMAT(funding_date,"%Y-%m-%d") as funding_date,TIME_FORMAT(transfered_date,"%H:%i %r") as transfered_time,DATE_FORMAT(transfered_date,"%Y-%m-%d") as transfered_date,student_details.student_id, student_details.student_firstname,student_details.student_lastname,student_details.student_email FROM donors_funding_details left join loan_details on loan_details.loan_id=donors_funding_details.loan_id left join student_details on loan_details.student_id=student_details.student_id where loan_details.isActive="1" order by donors_funding_details.funding_date desc LIMIT ' + start_from + ', ' + per_page;

            Donors_funding_details.query(q, function (err, results) {

                var all_rows = Student_details.query('SELECT count(*) as erow from donors_funding_details left join loan_details on loan_details.loan_id=donors_funding_details.loan_id left join student_details on loan_details.student_id=student_details.student_id where loan_details.isActive="1" ', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }

                    res.view('./admin/donor_listing', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    payouts: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var current_page = req.param('id');
            if (typeof current_page !== 'undefined') {
                var page = current_page;
            }
            else {
                var page = 1;
            }

            var per_page = 10;
            var start_from = (page - 1) * per_page;
            var q = "SELECT student_details.student_firstname, student_details.student_lastname, student_details.student_email, count( * ) AS pending_paouts, sum( donors_funding_details.balance_to_transfer ) AS pending_payout_amount, student_details.student_id AS student_id FROM student_details LEFT JOIN student_login_credentials ON student_login_credentials.student_id = student_details.student_id LEFT JOIN loan_details ON loan_details.student_id = student_details.student_id LEFT JOIN donors_funding_details ON donors_funding_details.loan_id = loan_details.loan_id WHERE donors_funding_details.status=1 AND donors_funding_details.payout = '0' GROUP BY donors_funding_details.loan_id ORDER BY student_details.created_on DESC LIMIT " + start_from + ', ' + per_page;

            Student_details.query(q, function (err, results) {

                var all_rows = Student_details.query('SELECT count(*) as erow from student_details LEFT JOIN student_login_credentials ON student_login_credentials.student_id = student_details.student_id LEFT JOIN loan_details ON loan_details.student_id = student_details.student_id LEFT JOIN donors_funding_details ON donors_funding_details.loan_id = loan_details.loan_id WHERE donors_funding_details.status=1 AND donors_funding_details.payout = "0" GROUP BY donors_funding_details.loan_id', function (err, the_rows) {

                    das_rows = the_rows[0].erow;

                    var total_pages = Math.ceil(das_rows / per_page);

                    var the_p = parseInt(current_page) - 1;
                    var the_n = parseInt(current_page) + 1;

                    if (current_page == 1) {
                        var the_p = 1;
                    }
                    if (current_page == total_pages) {
                        var the_n = total_pages;
                    }
                    res.view('./admin/payouts', {
                        layout: false,
                        tot: total_pages,
                        js: the_rows,
                        post: results,
                        the_prev: the_p,
                        the_next: the_n,
                        curr: current_page,
//                            title: 'This is the hi page title.'
                    });
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    payoutsdetails: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var student_id = req.param('id');

            var q = "SELECT donors_funding_details.*, loan_details.loan_amount,student_details.student_firstname, student_details.student_lastname, student_details.student_email,  student_details.student_id AS student_id FROM student_details LEFT JOIN student_login_credentials ON student_login_credentials.student_id = student_details.student_id LEFT JOIN loan_details ON loan_details.student_id = student_details.student_id LEFT JOIN donors_funding_details ON donors_funding_details.loan_id = loan_details.loan_id WHERE donors_funding_details.status=1 AND donors_funding_details.payout = '0' AND student_details.student_id=" + student_id;

            Student_details.query(q, function (err, results) {

                res.view('./admin/payoutsdetails', {
                    layout: false,
                    post: results,
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    submit_payout_details: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var student_id = req.param('id');

            var q = "SELECT donors_funding_details.*, loan_details.loan_amount,student_details.student_firstname, student_details.student_lastname, student_details.student_email,  student_details.student_id AS student_id FROM student_details LEFT JOIN student_login_credentials ON student_login_credentials.student_id = student_details.student_id LEFT JOIN loan_details ON loan_details.student_id = student_details.student_id LEFT JOIN donors_funding_details ON donors_funding_details.loan_id = loan_details.loan_id WHERE donors_funding_details.payout = '0' AND student_details.student_id=" + student_id;

            Student_details.query(q, function (err, results) {

                res.view('./admin/payoutsdetails', {
                    layout: false,
                    post: results,
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    submitpayout: function (req, res) {
        if (req.method == "POST") {
            var student_record = req.param('student_record');
            student_record.forEach(function (values, index) {
                var query = "UPDATE `donors_funding_details` SET `payout` = '1',transfered_date=NOW() WHERE `donors_funding_details`.`donors_id` =" + values;
                Donors_funding_details.query(query, function (err, results) {
                });
            });
            return  res.redirect('admin/checkpayout/' + req.param('student_id') + '/' + req.param('loan_id'));
        }
    },
    checkpayout: function (req, res) {
        var loan_id = req.param('loan_id');
        var student_id = req.param('student_id');
        var query = "select payout from donors_funding_details where payout='0' AND loan_id=" + loan_id;

        Donors_funding_details.query(query, function (err, results) {

            req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Fields are approved</div>');
            if (results.length > 0) {
                return  res.redirect('admin/payoutsdetails/' + student_id);
            } else {
                return  res.redirect('admin/payouts/1');
            }
        });


    },
    submitwebhooks: function (req, res) {

        if (req.method == "POST") {
            var test_mode = req.param('test_mode');
            test_mode = test_mode[0];
            var enable_stripe = req.param('enable_stripe') != undefined ? req.param('enable_stripe') : 0;
            var enable_stripe_connect = req.param('enable_stripe_connect') != undefined ? req.param('enable_stripe_connect') : 0;
            var q = "UPDATE `stripe_web_hooks` SET stripe_currency='" + req.param('stripe_currency') + "', live_publishable_key=" + mysql.escape(req.param('live_publishable_key')) + ", live_secret_key=" + mysql.escape(req.param('live_secret_key')) + ", test_publishable_key=" + mysql.escape(req.param('test_publishable_key')) + ", test_secret_key=" + mysql.escape(req.param('test_secret_key')) + ", test_mode='" + test_mode + "' WHERE `stripe_web_hooks`.`id` =1";
            Stripe_web_hooks.query(q, function (err, results) {
                req.flash('success', '<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Fields updated successfully</div>');
                res.redirect('admin/webhooks');
            });
        }

    },
    webhooks: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var query = "SELECT * FROM `stripe_web_hooks` where stripe_web_hooks.id=1";

            Stripe_web_hooks.query(query, function (err, record) {
                res.view('./admin/webhooks', {
                    layout: false,
                    record: record,
                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
};

