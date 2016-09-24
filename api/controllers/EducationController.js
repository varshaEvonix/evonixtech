/**
 * EducationController
 *
 * @description :: Server-side logic for managing educations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *//**
 * PersonalController
 *
 * @description :: Server-side logic for managing personals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'education': function(req, res){
  	res.view();
  },

  'inserteducation':function(req,res){
  	console.log('entered');
		if(req.method=="POST")
		{
			console.log("Post");
			var student_education_institute = req.param("student_education_institute");
			var student_education_fieldofstudy = req.param("student_education_fieldofstudy");
			
			
			var insert ="";
			try {
				insert = " INSERT INTO `student_education` (`student_education_institute`, `student_education_fieldofstudy`) VALUES ('"+student_education_institute+"', '"+student_education_fieldofstudy+"');";
				console.log("entering try block");
				throw "thrown message";
				console.log("this message is never seen");
			}
			catch (e) {
				console.log("entering catch block");
				console.log(e);
				console.log("leaving catch block");
			}
			console.log(insert);
			Education.query(insert,function(err,record)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log(record);
					res.redirect('../studash/studash');
				}
			});
		}else {
			console.log('Else part');
		}
	},

};

