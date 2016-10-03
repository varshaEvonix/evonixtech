/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 

     'stud_right': function(req, res) {
        Student_details.query('SELECT * from donors_funding_details where donors_funding_details.donors_id=1', function(err, recordset) {         	
        	
        	return res.view('./personal_view/personal_view', {

      donor_details: recordset

    });

        });
        
    }
};

