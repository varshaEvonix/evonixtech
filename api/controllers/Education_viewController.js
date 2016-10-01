/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 

     'education_view': function(req, res) {
        Education.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id where student_details.student_id=1', function(err, recordset) {         	
        	
        	return res.view('./education_view/education_view', {

      answer: recordset

    });

        });
        
    }
};
