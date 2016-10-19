/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'studprofile': function (req, res) {
        res.view();
    },
    'mypro': function (req, res) {

        Student_details.query('SELECT mf.id, mf.fafsa_values, slc.profile_lock, sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, sd.student_about_me,sd.student_email, sd.student_contactno, IFNULL(sd.student_ambition,"") student_ambition, sd.student_city,  sd.student_state, sd.student_address, sd.video_link, sd.student_country, sd.zip_code, sd.student_profile_pic_path, IFNULL(ed.student_education_institute, "") student_education_institute, IFNULL(ed.student_education_fieldofstudy, "") student_education_fieldofstudy, ld.loan_id, ld.loan_fafsa_id, IFNULL(ld.loan_bankname, "") loan_bankname, IFNULL(ld.loan_accountno, "") loan_accountno, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join education ed on ed.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id left join mst_fafsa mf on mf.id = ld.loan_fafsa_id where slc.student_active = 1 AND sd.student_id = ' + req.param("id") + ' group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount', function (err, recordset) {

            Student_photographs.query('SELECT photo_path from student_photographs where student_id=' + req.param('id'), function (err, photorecord) {

                Loan_details.query('SELECT loan_id, student_id, loan_amount, IFNULL(mst_fafsa.fafsa_values,"-") fafsa_values, IFNULL(loan_fafsa_id, "-") loan_fafsa_id, IFNULL(loan_bankname, "-") loan_bankname, IFNULL(loan_accountno, "-") loan_accountno from loan_details left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where loan_details.student_id= ' + req.param('id') + ' AND loan_details.isActive = 0', function (err, loan_l) {

                    Student_details.query('SELECT dfd.donors_name, dfd.donors_comment, dfd.funded_amount, DATE_FORMAT(dfd.funding_date,"%Y-%m-%d") as funding_date FROM  loan_details ld  inner join donors_funding_details dfd on ld.loan_id = dfd.loan_id and ld.isActive = 1 where ld.student_id=' + req.param('id'), function (err, donor_l) {

                        Admin_loan_comments.query('SELECT note, DATE_FORMAT(alc.last_updated,"%Y-%m-%d") as last_updated from admin_loan_comments alc inner join loan_details ld on ld.loan_id = alc.loan_id where note_type=2 and student_id=' + req.param("id") + ' order by last_updated desc', function (err, loan_comments) {


                            return res.view('./studprofile/studprofile', {
                                student_info: recordset,
                                pics: photorecord,
                                loan_list: loan_l,
                                donor_list: donor_l,
                                admin_comments: loan_comments

                            });
                        });

                    });

                });

            });
        });

    },
    'stu_dashboard': function (req, res) {

        Student_details.query('SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate,  sd.student_profile_pic_path,  IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join  donors_funding_details dfd on ld.loan_id=dfd.loan_id  where  sd.student_id = ' + req.param("id") + ' group by sd.student_id, sd.student_firstname, sd.student_lastname, student_birthdate,  sd.student_profile_pic_path, ld.loan_amount', function (err, recordset) {


            Student_details.query('SELECT dfd.donors_name, dfd.donors_comment, dfd.funded_amount, DATE_FORMAT(dfd.funding_date,"%Y-%m-%d") as funding_date FROM  loan_details ld  inner join donors_funding_details dfd on ld.loan_id = dfd.loan_id and ld.isActive = 1 where ld.student_id=' + req.param('id'), function (err, donor_l) {


                return res.view('./studash/studash', {
                    student_info: recordset,
                    donor_l: donor_l

                });

            });

        });

    },
    // 'stu_dashboard': function(req, res) {


    //   Student_details.query('SELECT * from student_details where student_details.student_id=1', function(err, recordset) {  

    //    Donors_funding_details.query('SELECT * from donors_funding_details left join loan_details on loan_details.loan_id = student_details.student_id where student_details.student_id=1', function(err, donor_l) {
    //     console.log()
    //     return res.view('./studash/studash', {

    //      answer: recordset,
    //      donor_l: donor_l,

    //    });

    //   });
    //  });


    // },




    upload: function (req, res) {
        if (req.method === 'POST')
            newFilename = req.file('userPhoto')._files[0].stream.filename;

        req.file('userPhoto').upload({dirname: '../public/index_files/uploads/documents/', saveAs: newFilename}), function onUploadComplete(err, files) {

        };

        var update = "UPDATE `student_details` SET `student_profile_pic_path`='" + newFilename + "' where student_details.student_id=" + req.param('id');

        Student_details.query(update, function (err, record)
        {
            res.redirect('/personal_edit/' + req.param('id'));
        });
        // var file_name = files.filename;
        //console.log(file_name);


    },
    'uploadmedia': function (req, res) {
        console.log('are you there');

        if (req.method == "POST")
        {

            if (req.param('image1') != '')
            {
                newFilename = req.file('image1')._files[0].stream.filename;

                console.log(newFilename);
                console.log('newFilename');
                req.file('image1').upload({dirname: '../public/index_files/uploads/documents/', saveAs: newFilename}), function onUploadComplete(err, files) {

                };
                var insert_pics = "INSERT INTO `student_photographs` (`student_id`, `photo_path`, `isEnabled`) VALUES ('" + req.param('id') + "', '" + newFilename + "', '1')";

            }
            var video_link = req.param('video_link');
            var update = "UPDATE `student_details` SET `video_link`='" + video_link + "' where student_details.student_id=" + req.param('id');


            Student_details.query(update, function (err, record)
            {
                Student_photographs.query(insert_pics, function (err, record)
                {

                    return res.redirect('/viewprofile/' + req.param('id'));

                });
            });
        }
    },
    'removeimage': function (req, res) {

        Student_photographs.query('UPDATE `student_photographs` SET `isEnabled`= 0 WHERE `photo_id`=' + req.param('photo_id'), function (err, recordset) {

            return res.redirect('/media_edit/' + req.param('student_id'));

        });

    },
};

// select * from user left join personal on user.id=personal.user_id left join education on education.user_id=user.id left join loan on loan.user_id=user.id where personal.user_id=1 AND education.user_id=1 AND loan.user_id=1;