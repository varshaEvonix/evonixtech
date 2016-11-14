/**
 * Personal_editController
 *
 * @description :: Server-side logic for managing personal_edits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mysql = require('mysql');
module.exports = {
    'editpersonal': function (req, res) {
        if (req.session.student_id || req.session.student_id != undefined) {
            Student_details.query('SELECT *, DATE_FORMAT(student_details.student_birthdate,"%Y-%m-%d") as student_birthdate, IFNULL(student_details.student_ambition, "") student_ambition from student_details where student_details.student_id= ' + req.session.student_id, function (err, recordset) {

                return res.view('./personal_edit/personal_edit', {
                    student_info: recordset

                });

            });
        } else {
            return  res.redirect('/login');
        }
    },
    'editpersonalsubmit': function (req, res) {


        if (req.method == "POST")
        {
            var student_firstname = req.param("student_firstname");
            var student_lastname = req.param("student_lastname");
            var student_contactno = req.param("student_contactno");
//            var student_email = req.param("student_email");
            var student_address = req.param("student_address");
            var student_city = req.param("student_city");
            var student_state = req.param("student_state");
            var student_country = req.param("student_country");
            var student_birthdate = req.param("student_birthdate");
            var zip_code = req.param("zip_code");
            var student_about_me = req.param("student_about_me");
            var student_ambition = req.param("student_ambition");
            var imagedata = req.param('image');

            var student_profile_pic_path = '';
            if (imagedata != undefined) {
                var fs = require("fs");
                var dir_name = req.param('id');
                var dir = '.tmp/public/index_files/uploads/' + dir_name;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }


                var matches = imagedata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                        response = {};

                if (matches.length !== 3) {
                    return new Error('Invalid input string');
                }

                response.type = matches[1];
                response.data = new Buffer(matches[2], 'base64');
                var image_name = Date.now() + '.jpg';
                fs.writeFile('.tmp/public/index_files/uploads/' + dir_name + '/' + image_name, response.data, function (err) {
                });
//        var imageBuffer = decodeBase64Image(data);
                student_profile_pic_path = image_name;
            }
            var update = "";

            update = "UPDATE `student_details` SET `student_firstname`=" + mysql.escape(student_firstname) + ",`student_lastname`=" + mysql.escape(student_lastname) + ",`student_contactno`=" + mysql.escape(student_contactno) + ",`student_address`=" + mysql.escape(student_address) + ",`student_city`=" + mysql.escape(student_city) + ",`student_state`=" + mysql.escape(student_state) + ",`student_country`=" + mysql.escape(student_country) + ",`student_birthdate`=" + mysql.escape(student_birthdate) + ",`zip_code`=" + mysql.escape(zip_code) + ",`student_about_me`=" + mysql.escape(student_about_me) + ",`student_ambition`=" + mysql.escape(student_ambition) + ", student_profile_pic_path = " + mysql.escape(student_profile_pic_path) + " WHERE `student_id`=" + req.param('id');

            Student_details.query(update, function (err, record)
            {
                if (err) {

                    req.flash('error', '<div class="alert alert-danger "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + err[0].Error + '</div>');
                } else {
                    req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Information updated successfully</div>');
                }

                return res.ok();
            });
        }

    },
    'editmedia': function (req, res) {

        if (req.session.student_id || req.session.student_id != undefined) {
            Student_details.query('SELECT * from student_details where student_details.student_id= ' + req.param('id'), function (err, recordset) {
                Student_details.query('SELECT * from student_photographs left join student_details on student_details.student_id=student_photographs.student_id where  student_photographs.isEnabled = 1 AND student_details.student_id= ' + req.param('id'), function (err, pics) {
                    return res.view('./media_edit/media_edit', {
                        student_info: recordset,
                        photos: pics,
                    });
                });

            });
        } else {
            return  res.redirect('/login');
        }

    },
};



