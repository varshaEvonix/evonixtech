/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'studprofile': function(req, res){
  	res.view();
  },

     

     'mypro': function(req, res) {

         Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id where student_details.student_id=1', function(err, recordset) {         	
        	
        	return res.view('./studprofile/studprofile', {

      answer: recordset


    });

        });
        
    }

};

// select * from user left join personal on user.id=personal.user_id left join education on education.user_id=user.id left join loan on loan.user_id=user.id where personal.user_id=1 AND education.user_id=1 AND loan.user_id=1;