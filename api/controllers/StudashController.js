/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 

     'studash': function(req, res) {
       // Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id where student_details.student_id=2', function(err, recordset) {
        Student_details.query('SELECT * from student_details  left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id where student_details.student_id=2', function(err, recordset) {         	
        	console.log(recordset);
        	return res.view('./studash/studash', {

      answer: recordset

    });

        });
        
    }
};

