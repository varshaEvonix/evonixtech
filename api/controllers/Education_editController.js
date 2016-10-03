/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 

    'editeducation': function(req, res) {
  	
       Student_details.query('SELECT * from education where student_id='+req.param('id'), function(err, recordset) {         	
        	
        	return res.view('./education_edit/education_edit', {

      answer: recordset


    });

        });
        
    },


    'editeducationsubmit': function(req, res) {
  	
       if(req.method=="POST")
		{
			
			var student_education_institute = req.param("student_education_institute");
			var student_education_fieldofstudy = req.param("student_education_fieldofstudy");
			
			
			var update ="";
			try {
				update = "UPDATE `education` SET `student_education_institute`='"+student_education_institute+"',`student_education_fieldofstudy`='"+student_education_fieldofstudy+"' WHERE `student_id`=1";
				
				throw "thrown message";
				
			}
			catch (e) {
			
			}
		
			Education.query(update,function(err,record)
			{
				return res.ok();
				
			});
		}

        }

};

