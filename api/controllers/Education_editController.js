/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {


 	'editeducation': function(req, res) {

 		Student_details.query('SELECT student_firstname, student_lastname, student_profile_pic_path, IFNULL(student_education_institute,"") student_education_institute, IFNULL(student_education_fieldofstudy,"") student_education_fieldofstudy, student_details.student_id from student_details LEFT join education on student_details.student_id=education.student_id where student_details.student_id='+req.param('id'), function(err, recordset) {         	
 			console.log('recordset');
 			console.log(recordset);
 			var temp = JSON.stringify(recordset);
 			var recordset = JSON.parse(temp)[0];
 			console.log(recordset);
 			return res.view('./education_edit/education_edit', {



 				student_info: recordset


 			});

 		});

 	},


 	'editeducationsubmit': function(req, res) {

 		if(req.method=="POST")
 		{

 			console.log('r u there');
 			var student_education_institute = req.param("student_education_institute");
 			var student_education_fieldofstudy = req.param("student_education_fieldofstudy");


 			

 			 var update = "INSERT INTO `education` (`student_id`, `student_education_institute`, `student_education_fieldofstudy`, `isEnabled`) VALUES ('1','"+student_education_institute+"','"+student_education_fieldofstudy+"','"+req.param('id')+"') ON DUPLICATE KEY UPDATE `student_education_institute`='"+student_education_institute+"',`student_education_fieldofstudy`='"+student_education_fieldofstudy+"',`isEnabled` = 1";

 			Education.query(update,function(err,record)
 			{
 				return res.ok();

 			});
 		}else {
 			console.log('Else part');
 		}

 	}

 };

