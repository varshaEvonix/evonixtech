/**
 * Admin_dashController
 *
 * @description :: Server-side logic for managing admin_dashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var pager = require('sails-pager');
module.exports = {
    'admin_dash': function (req, res) {
        res.view();
    },
    'admin_dash': function (req, res) {
        return res.view('./admin/admin_dash', {
            layout: false,
        });

    },
            get_student: function (req, res) {
                var current_page = req.param('id');
                if (typeof current_page !== 'undefined') {
                    var page = current_page;
                }
                else {
                    var page = 1;
                }

                var per_page = 10;
                var start_from = (page - 1) * per_page;
                var q = 'SELECT *,student_details.student_id as student_id FROM student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join student_login_credentials on student_login_credentials.student_id=student_details.student_id order by student_details.created_on desc LIMIT ' + start_from + ', ' + per_page + '';

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
            },
    viewdetails: function (req, res) {

        var q = 'SELECT * FROM student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join student_login_credentials on student_login_credentials.student_id=student_details.student_id  where student_details.student_id=' + req.param('id');

        Student_details.query(q, function (err, results) {
            var query = 'SELECT * FROM student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where loan_details.isActive="1" AND  student_details.student_id=' + req.param('id');

            Student_details.query(query, function (err, doner_result) {
                var loan_id = '';
                results.forEach(function (result, index) {
                    loan_id = result.loan_id;
                });
                var comments_query = 'SELECT * FROM admin_loan_comments  where admin_loan_comments.loan_id=' + loan_id;
                Admin_loan_comments.query(comments_query, function (err, comments) {

                    res.view('./admin/studprofile', {
                        layout: false,
                        data: results,
                        doner_result: doner_result,
                        comments: comments,
                    });

                });
            });
        });
    },
    activestudent: function (req, res) {
        var current_page = req.param('id');
        if (typeof current_page !== 'undefined') {
            var page = current_page;
        }
        else {
            var page = 1;
        }

        var per_page = 10;
        var start_from = (page - 1) * per_page;
        var q = 'SELECT *,student_details.student_id as student_id FROM student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.student_active="1" LIMIT ' + start_from + ', ' + per_page + '';

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
    },
    inactivestudent: function (req, res) {
        var current_page = req.param('id');
        if (typeof current_page !== 'undefined') {
            var page = current_page;
        }
        else {
            var page = 1;
        }

        var per_page = 10;
        var start_from = (page - 1) * per_page;
        var q = 'SELECT *,student_details.student_id as student_id FROM student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join student_login_credentials on student_login_credentials.student_id=student_details.student_id where student_login_credentials.student_active="0" LIMIT ' + start_from + ', ' + per_page + '';

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
            req.file('formdata').upload({dirname: '../public/index_files/notes_attachment/', saveAs: newfilename}, function (err, files) {
                return res.ok(newfilename);
            });
        }
    },
    add_notes: function (req, res) {

        if (req.method === 'POST') {
            var file_name = req.param('filename') == 'undefined' ? ' ' : req.param('filename');
            var insert_query = "INSERT INTO `admin_loan_comments` (`loan_id`, `note`, `note_type`, `note_attachment`, `admin_id`) VALUES ('" + req.param('loan_id') + "', '" + req.param('note') + "', '" + req.param('note_type') + "', '" + file_name + "', '1')";
         
            Admin_loan_comments.query(insert_query, function (err, record)
            {

            });
            return res.ok({student_id: req.param('student_id')});

        }
    },
    studlockedprofile: function (req, res) {
        var q = 'SELECT *, DATE_FORMAT(student_changed_time,"%Y-%m-%d") as student_changed_time FROM student_changed_val left join student_field_master on student_changed_val.student_master_field_id=student_field_master.student_master_field_id where student_changed_val.is_new_change="1" AND student_changed_val.admin_approval=0 AND student_changed_val.student_id=' + req.param('id');

        Student_changed_val.query(q, function (err, results) {

            return   res.view('./admin/studlockedprofile', {
                layout: false,
                student_records: results
            });
        });
    },
    update_student_profile: function (req, res) {

        var student_details = '';
        var admin_approve = req.param('profile_status') == '1' ? '0' : '1';
        var approved_values = req.param('approved_values');
        if (approved_values == 'undefined' && approved_values.length > 0) {
            approved_values.forEach(function (values, index) {
                var query = "UPDATE `student_changed_val` SET `admin_approval` = '" + admin_approve + "', is_new_change='0' WHERE `student_changed_val`.`student_master_field_id`='" + values + "' AND `student_changed_val`.`student_id` =" + req.param('student_id');
                Student_changed_val.query(query, function (err, results) {

                });
            });
        }
        var q = "SELECT * FROM student_changed_val where student_id=" + req.param('student_id') + " AND admin_approval=0 AND is_new_change='1'";
        Student_changed_val.query(q, function (err, record) {
            if (record.length == 0) {
                var update_query = "UPDATE `student_login_credentials` SET `profile_lock` ='" + req.param('profile_status') + "' WHERE `student_login_credentials`.`student_id` =" + req.param('student_id');
                Student_login_credentials.query(update_query, function (err, results) {
                    if (admin_approve == '0') {
                        var insert = "INSERT INTO `notifications` (`notifiaction`, `student_id`, `by_admin`) VALUES ('" + req.param('admin_note') + "', '" + req.param('student_id') + "', '1');";
                    }
                    Student_login_credentials.query(update_query, function (err, results) {

                    });

                });
            }


        });



        var q = "UPDATE `student_login_credentials` SET `profile_lock` ='" + req.param('profile_status') + "' WHERE `student_login_credentials`.`student_id` =" + req.param('student_id');
        Student_login_credentials.query(q, function (err, results) {
            var query = "UPDATE `student_changed_val` SET `admin_approval` = '" + admin_approve + "' WHERE `student_changed_val`.`student_id` =" + req.param('student_id');
            Student_login_credentials.query(query, function (err, query_results) {
//                var path = '/admin/studlockedprofile/' + req.param('student_id');
                if (admin_approve == 0) {
                    var fetch_student = "select * from student_details where student_id =" + req.param('student_id');
                    Student_details.query(fetch_student, function (err, studentdetails) {
                        var temp = JSON.stringify(studentdetails);
                        var student_details = JSON.parse(temp)[0];

                        var helper = require('sendgrid').mail;
                        var from_email = new helper.Email('support@evonixtech.com');
                        var to_email = new helper.Email(student_details.student_email);
                        var subject = 'Stumuch Notification';
                        var mail_content = "Hi " + student_details.student_firstname + '</br>' + req.param('admin_note');
//                        console.log('mail_content');
//                        console.log(mail_content);
                        var content = new helper.Content('text/plain', mail_content);
                        var mail = new helper.Mail(from_email, subject, to_email, content);

                        var sg = require('sendgrid')("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");
                        var request = sg.emptyRequest({
                            method: 'POST',
                            path: '/v3/mail/send',
                            body: mail.toJSON(),
                        });

                        sg.API(request, function (error, response) {
//                        console.log(response.statusCode);
//                        console.log(response.body);
//                        console.log(response.headers);
                        });

                    });

//                var path = '/admin/studlockedprofile/1';
                    var path = '1';
                    return res.ok({path: path});
                } else {
                    var path = '/admin/studlockedprofile/' + req.param('student_id');
                    return res.ok({path: path});
                }
            });
        });
    },
    'send_mail': function (req, res) {
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('support@evonixtech.com');
        var to_email = new helper.Email('varsha@evonix.co');
        var subject = 'Hello World from the SendGrid Node.js Library!';
        var content = new helper.Content('text/plain', 'Hello, Email!');
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')("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");
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
//            console.log(response.statusCode);
//            console.log(response.body);
//            console.log(response.headers);
        });
    },
};

