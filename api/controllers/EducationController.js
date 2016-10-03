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
  	
		if(req.method=="POST")
		{
			
			var student_education_institute = req.param("student_education_institute");
			var student_education_fieldofstudy = req.param("student_education_fieldofstudy");
			
			
			var insert ="";
			try {
				insert = " INSERT INTO `student_education` (`student_education_institute`, `student_education_fieldofstudy`) VALUES ('"+student_education_institute+"', '"+student_education_fieldofstudy+"');";
				
				throw "thrown message";
				
			}
			catch (e) {
			
			}
		
			Education.query(insert,function(err,record)
			{
				if(err)
				{
			
				}
				else
				{
				
					res.redirect('../studash/studash');
				}
			});
		}
	},

};

