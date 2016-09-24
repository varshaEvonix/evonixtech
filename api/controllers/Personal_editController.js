/**
 * Personal_editController
 *
 * @description :: Server-side logic for managing personal_edits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'editpersonal': function (req, res) {

        Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id where student_details.student_id=1', function (err, recordset) {

            return res.view('./personal_edit/personal_edit', {
                answer: recordset

            });

        });

    },
    'editpersonalsubmit': function (req, res) {

        if (req.method == "POST")
        {
            console.log("this is it");
            var student_firstname = req.param("student_firstname");
            var student_lastname = req.param("student_lastname");
            var student_contactno = req.param("student_contactno");
            var student_email = req.param("student_email");
            var student_address = req.param("student_address");
            var student_city = req.param("student_city");
            var student_state = req.param("student_state");
            var student_country = req.param("student_country");
            var student_birthdate = req.param("student_birthdate");
            var student_about_me = req.param("student_about_me");
            var student_ambition = req.param("student_ambition");



            var update = "";
            try {
                update = "UPDATE `student_details` SET `student_firstname`='" + student_firstname + "',`student_lastname`='" + student_lastname + "',`student_contactno`='" + student_contactno + "',`student_email`='" + student_email + "',`student_address`='" + student_address + "',`student_city`='" + student_city + "',`student_state`='" + student_state + "',`student_country`='" + student_country + "',`student_birthdate`='" + student_birthdate + "',`student_about_me`='" + student_about_me + "',`student_ambition`='" + student_ambition + "',`student_profile_pic_path`='" + student_profile_pic_path + "' WHERE `student_id`=1";
                console.log("entering try block");
                throw "thrown message";
                console.log("this message is never seen");
            }
            catch (e) {
                console.log("entering catch block");
                console.log(e);
                console.log("leaving catch block");
            }
            console.log(update);
            Student_details.query(update, function (err, record)
            {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    console.log(record);
                    res.redirect('../personal_view/personal_view');
                }
            });
        } else {
            console.log('Else part');
        }

    },
//    'upload_image': function (req, res) {
//        console.log("its here");
//        if (req.method === 'POST')
//            req.file('student_profile_pic_path').upload({dirname: '../index_files/uploads/'}, function (err, files) {
//                sails.log.debug('file is :: ', +files);
//                maxBytes: 10000000;
//                var student_profile_pic_path = req.param("student_profile_pic_path");
//                var update1 = "UPDATE `student_details` SET `student_profile_pic_path`='" + student_profile_pic_path + "' WHERE `student_id`=1";
//
//
//
//                Student_details.query(update1, function (err, record) {
//
//
//                    if (err)
//                    {
//                        console.log(err);
//                    }
//                    else
//                    {
//                        console.log(record);
//                        res.redirect('../personal_view/personal_view');
//                    }
//
//                }
//                res.json({status:200, file:files});
//            });
//    }

};


