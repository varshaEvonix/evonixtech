/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
'editeducation': function (req, res) {
if (req.session.student_id || req.session.student_id != undefined) {

//        Student_details.query('SELECT student_firstname, student_lastname, student_profile_pic_path, IFNULL(student_education_institute,"") student_education_institute, IFNULL(student_education_fieldofstudy,"") student_education_fieldofstudy, student_details.student_id from student_details LEFT join education on student_details.student_id=education.student_id where student_details.student_id=' + req.param('id'), function (err, eudcation_recordset) {
var select_query = 'SELECT sd.student_about_me, sd.student_ambition, ld.loan_id, sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_profile_pic_path, IFNULL(ld.loan_amount,"") loan_amount, IFNULL(mst_fafsa.fafsa_values,"") fafsa_values,IFNULL(ld.loan_type, "") loan_type, IFNULL(ld.loan_fafsa_id, "") loan_fafsa_id, IFNULL(ld.loan_bankname, "") loan_bankname, IFNULL(ld.loan_accountno, "") loan_accountno, IFNULL(student_education_institute,"") student_education_institute,IFNULL(education.id,null) education_id, IFNULL(student_education_fieldofstudy,"") student_education_fieldofstudy, sd.student_id from student_details sd left join loan_details ld on sd.student_id = ld.student_id left join mst_fafsa on mst_fafsa.id=ld.loan_fafsa_id LEFT join education on sd.student_id=education.student_id where sd.student_id =' + req.session.student_id
        Loan_details.query(select_query, function (err, recordset) {

        if (recordset[0].loan_id != null){
        Table_loan_document.query('SELECT ld.loan_id, ld.student_id, tld.document_name, tld.document_path, tld.loan_document_id, tld.isPublic from table_loan_document tld left join loan_details ld on ld.loan_id = tld.loan_id where tld.loan_id=' + recordset[0].loan_id + ' AND isPublic = 1', function (err, loan_document) {

        return res.view('./loan_edit/loan_edit',
        {
        student_info: recordset,
                loan_docs: loan_document
        });
        });
        } else{
        return res.view('./loan_edit/loan_edit',
        {
        student_info: recordset,
        });
        }
        });
} else {
return  res.redirect('/login');
        }
},
        'editeducationsubmit': function (req, res) {

        if (req.method == "POST")
        {

        var student_education_institute = req.param("student_education_institute");
                var student_education_fieldofstudy = req.param("student_education_fieldofstudy");
                var update = "INSERT INTO `education` (`student_id`, `student_education_institute`, `student_education_fieldofstudy`, `isEnabled`) VALUES ('" + req.param('id') + "','" + student_education_institute + "','" + student_education_fieldofstudy + "',1) ON DUPLICATE KEY UPDATE `student_education_institute`='" + student_education_institute + "',`student_education_fieldofstudy`='" + student_education_fieldofstudy + "',`isEnabled` = 1";
                console.log('update');
                Education.query(update, function (err, record)
                {
                return res.ok();
                });
        }

        },
        'uploaddocs': function (req, res) {
console.log("req.file('file[]')");
console.log(req.file('file[]'));
//        var student_id = '1';
//                var fs = require("fs");
//                var dir_name = student_id;
//                var dir = '.tmp/public/index_files/uploads/' + dir_name;
//                if (!fs.existsSync(dir)) {
//        fs.mkdirSync(dir);
//        }
//
//        var newFilename = req.file('file[]')._files[0].stream.filename;
//                console.log('newFilename')
//                console.log(newFilename)
////        newFilename = Date.now() + newFilename;
//
//                req.file('file').upload({dirname: '../public/index_files/uploads/' + dir_name + '/', saveAs: newFilename}), function onUploadComplete(err, files) {
//        console.log(err)
//        };
//                return res.ok(newFilename);
        }

};

