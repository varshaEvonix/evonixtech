/**
 * Personal_editController
 *
 * @description :: Server-side logic for managing personal_edits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'addloan': function (req, res) {

        Student_details.query('SELECT student_id, student_firstname, student_lastname, student_profile_pic_path from student_details where student_details.student_id=' + req.param('id'), function (err, recordset) {

            return res.view('./addloan/addloan', {
                student_info: recordset

            });

        });

    },
    'removedoc': function (req, res) {

        Table_loan_document.query('UPDATE `table_loan_document` SET `isPublic`= 0 WHERE `loan_document_id`=' + req.param('loan_document_id'), function (err, recordset) {


            return res.ok();

        });

    },
    'editloan': function (req, res) {

        Loan_details.query('SELECT ld.loan_id, sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_profile_pic_path,ld.loan_type, ld.loan_amount, IFNULL(mst_fafsa.fafsa_values,"-") fafsa_values, IFNULL(ld.loan_fafsa_id, "-") loan_fafsa_id, IFNULL(ld.loan_bankname, "-") loan_bankname, IFNULL(ld.loan_accountno, "-") loan_accountno from student_details sd left join loan_details ld on sd.student_id = ld.student_id left join mst_fafsa on mst_fafsa.id=ld.loan_fafsa_id where sd.student_id=' + req.param('student_id') + ' AND ld.loan_id =' + req.param('loan_id') + ' AND ld.isActive = 1', function (err, recordset) {

            Table_loan_document.query('SELECT ld.loan_id, ld.student_id, tld.document_name, tld.document_path, tld.loan_document_id, tld.isPublic from table_loan_document tld left join loan_details ld on ld.loan_id = tld.loan_id where tld.loan_id=' + req.param('loan_id') + ' AND isPublic = 1', function (err, recordset1) {


                return res.view('./loan_edit/loan_edit', {
                    student_info: recordset,
                    loan_docs: recordset1

                });
            });

        });

    },
    'editloansubmit': function (req, res) {

        if (req.method == "POST")
        {
            console.log('req.allParams()')
            console.log(req.allParams())
            var education_id = req.param('education_id');
            var student_id = req.param('student_id');
            var loan_id = req.param('loan_id');

            var education_query = "UPDATE `education` SET `student_education_institute` = '" + req.param('student_education_institute') + "', `student_education_fieldofstudy`='" + req.param('student_education_fieldofstudy') + "'  WHERE `education`.`student_id` ='" + student_id + "'";
            var student_details_query = "UPDATE `student_details` SET `student_about_me` = '" + req.param('student_about_me') + "', `student_ambition`='" + req.param('student_ambition') + "'  WHERE `student_details`.`student_id` ='" + student_id + "'";

            var loan_type = req.param("loan_type");
            var fafsa_values = req.param("fafsa_values");
            var loan_bankname = req.param("loan_bankname");
            var loan_accountno = req.param("loan_accountno");
            var loan_amount = req.param("loan_amount");

            var update = "";
            var update_doc = "";


            if (loan_type == 'bankloan') {
                update = "UPDATE `loan_details` SET `loan_fafsa_id`= NULL,`loan_bankname`='" + loan_bankname + "',`loan_accountno`='" + loan_accountno + "',`loan_amount`='" + loan_amount + "',loan_type= '" + loan_type + "' WHERE `loan_id`=" + req.param('loan_id');
            } else {
                update = "UPDATE `loan_details` SET `loan_fafsa_id`='" + fafsa_values + "',`loan_bankname`= '',`loan_accountno`='" + loan_accountno + "',`loan_amount`='" + loan_amount + "',loan_type= '" + loan_type + "' WHERE `loan_id`=" + req.param('loan_id');
            }

            Loan_details.query(update, function (err, record)
            {
                Education.query(education_query, function (err, education)
                {

                });
                Student_details.query(student_details_query, function (err, student_details)
                {

                });

            });

            for (var i = 0; i <= 5; i++) {

                if (req.param('document_name' + i) != undefined && req.param('document_name' + i) != '') {

                    var newFilename = "";
                    var document_name = "";
                    var insert_doc = "";
                    var fs = require("fs");
                    var dir_name = student_id;

                    var dir = '.tmp/public/index_files/uploads/' + dir_name;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    document_name = req.param('document_name' + i);

                    req.file('file' + i).upload({dirname: '../public/index_files/uploads/' + dir_name + '/'}, function (err, uploadedFiles) {
                        if (uploadedFiles.length > 0) {
                            newFilename = uploadedFiles[0].fd.split('/').slice(-1);
                            insert_doc = "INSERT INTO `table_loan_document` (`document_name`, `document_path`, `loan_id`, `isPublic`) VALUES ('" + document_name + "', '" + newFilename + "', '" + loan_id + "', '1');";

                            Table_loan_document.query(insert_doc, function (err, loan_document)
                            {

                            });

                        }
                    });
                }

            }
            req.flash('success', '<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Information updated successfully</div>');
            req.flash('active_menu', 'menu1');
            res.redirect('/viewprofile');
        }


    },
    'add_loan_education': function (req, res) {

        if (req.method == "POST")
        {
            var student_id = req.param("student_id") == undefined ? req.session.student_id : req.param("student_id");
            var education_query = "INSERT INTO `education` (`student_id`, `student_education_institute`, `student_education_fieldofstudy`, `isEnabled`) VALUES ('" + student_id + "', '" + req.param('student_education_institute') + "', '" + req.param('student_education_fieldofstudy') + "', '1')";
            Education.query(education_query, function (err, education)
            {

            });
            var student_details_query = "UPDATE `student_details` SET `student_about_me` = '" + req.param('student_about_me') + "', `student_ambition`='" + req.param('student_ambition') + "'  WHERE `student_details`.`student_id` ='" + student_id + "'";
            Student_details.query(student_details_query, function (err, student_details)
            {

            });
            var loan_type = req.param("loan_type");
            var loan_fafsa_id = req.param("fafsa_values") != undefined ? req.param("fafsa_values") : '';
            var loan_bankname = req.param("loan_bankname") != undefined ? req.param("loan_bankname") : '';
            var loan_accountno = req.param("loan_accountno");
            var loan_amount = req.param("loan_amount");

            var insert_query = "INSERT INTO loan_details (student_id,loan_amount,loan_type,loan_fafsa_id,loan_bankname,loan_accountno,isActive) VALUES('" + student_id + "','" + loan_amount + "','" + loan_type + "','" + loan_fafsa_id + "','" + loan_bankname + "','" + loan_accountno + "',1)";

            Loan_details.query(insert_query, function (err, record)
            {
console.log('insert_query')
console.log(insert_query)
                var loan_id = record.insertId;
                for (var i = 0; i <= 5; i++) {

                    if (req.param('document_name' + i) != undefined && req.param('document_name' + i) != '') {

                        var newFilename = "";
                        var document_name = "";
                        var insert_doc = "";
                        var fs = require("fs");
                        var dir_name = student_id;

                        var dir = '.tmp/public/index_files/uploads/' + dir_name;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        document_name = req.param('document_name' + i);

                        req.file('file' + i).upload({dirname: '../public/index_files/uploads/' + dir_name + '/'}, function (err, uploadedFiles) {
                            if (uploadedFiles.length > 0) {
                                newFilename = uploadedFiles[0].fd.split('/').slice(-1);
                                insert_doc = "INSERT INTO `table_loan_document` (`document_name`, `document_path`, `loan_id`, `isPublic`) VALUES ('" + document_name + "', '" + newFilename + "', '" + loan_id + "', '1');";

                                Table_loan_document.query(insert_doc, function (err, loan_document)
                                {

                                });

                            }
                        });
                    }
                }

            });
            req.flash('success', '<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Information added successfully</div>');
            req.flash('active_menu', 'menu1');
            res.redirect('/viewprofile');

        }
    },
    'addloansubmit': function (req, res) {

        if (req.method == "POST")
        {

            var newFilename = "";

            newFilename = req.file('document_path')._files[0].stream.filename;

            req.file('document_path').upload({dirname: '../public/index_files/uploads/documents/', saveAs: newFilename}), function onUploadComplete(err, files) {


            };

            var document_name = req.param('document_name');
            var loan_type = req.param("loan_type");
            var fafsa_values = req.param("fafsa_values");
            var loan_bankname = req.param("loan_bankname");
            var loan_accountno = req.param("loan_accountno");
            var loan_amount = req.param("loan_amount");

            var insert = "";
            var insert_doc = "";
            var update = 'UPDATE `loan_details` SET `isActive`= 0 WHERE `student_id` =' + req.param('id') + ' AND `isActive` = 1';


            if (loan_type == 'bankloan') {
                insert = "INSERT INTO `loan_details` (`student_id`, `loan_amount`, `loan_fafsa_id`, `loan_bankname`,`loan_accountno`,`isActive`) VALUES ('" + req.param('id') + "', '" + loan_amount + "',NULL,'" + loan_bankname + "','" + loan_accountno + "','1')";

            } else {
                insert = "INSERT INTO `loan_details` (`student_id`, `loan_amount`, `loan_fafsa_id`, `loan_bankname`,`loan_accountno`,`isActive`) VALUES ('" + req.param('id') + "', '" + loan_amount + "','" + fafsa_values + "','','" + loan_accountno + "','1')";

            }

            Loan_details.query(update, function (err, loan_active)
            {
                Loan_details.query(insert, function (err, record)
                {

                    var loan_id = record.insertId;


                    insert_doc = "INSERT INTO `table_loan_document` (`document_name`, `document_path`, `loan_id`, `isPublic`) VALUES ('" + document_name + "', '" + newFilename + "', '" + loan_id + "', '1');";


                    Table_loan_document.query(insert_doc, function (err, record2)

                    {

                        res.redirect('/viewprofile');

                    });
                });
            });

            // var file_name = files.filename;
            //console.log(file_name);


        }

    },
    'uploaddocs': function (req, res) {

        if (req.method == "POST")
        {

            var doc_name = req.param('document_name');
            var newFilename = req.file('document_path')._files[0].stream.filename;
            req.file('document_path').upload({dirname: '../public/index_files/uploads/documents/', saveAs: newFilename}, function onUploadComplete(err, files) {

                var file_name = '';
                files.forEach(function (files, index) {
                    file_name = files.filename;




                    // var insert = "INSERT INTO `student_photographs` ('student_id','photo_path','isEnabled') VALUES ('','','1')";
                    var insert = "INSERT INTO `table_loan_document` (`document_name`, `document_path`, `loan_id`, `isPublic`) VALUES ('" + doc_name + "', '" + file_name + "', '" + req.param('loan_id') + "', '1')";
                    Table_loan_document.query(insert, function (err, record)
                    {

                    });
                });

                return res.redirect('/viewprofile');
                // var file_name = files.filename;
                //console.log(file_name);

            });
        }



    },
    uploadfile: function (req, res) {

        if (req.method === 'POST') {
            var file = req.file('file');
            var filename = req.file('file')._files[0].stream.filename;
            var newfilename = Date.now() + filename;
            req.file('formdata').upload({dirname: '../public/index_files/uploads/', saveAs: newfilename}, function (err, files) {
                return res.ok(newfilename);
            });
        }
    },
};


