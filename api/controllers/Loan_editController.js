/**
 * Personal_editController
 *
 * @description :: Server-side logic for managing personal_edits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'editloan': function(req, res) {
  	
         Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id where student_details.student_id=1', function(err, recordset) {         	
        	
        	return res.view('./loan_edit/loan_edit', {

      answer: recordset

    });

        });
        
    },

'editloansubmit': function(req, res) {
  	
       if(req.method=="POST")
		{
			console.log("this is it");
			var loan_purpose_name = req.param("loan_purpose_name");
			var loan_amount = req.param("loan_amount");
			var loan_bankname =req.param("loan_bankname");
			var loan_accountno =req.param("loan_accountno");
			var remittance_account_bank_name =req.param("remittance_account_bank_name");
			var remittance_account_bankaccount_no =req.param("remittance_account_bankaccount_no");
			var remittance_account_ifsc =req.param("remittance_account_ifsc");
			var loan_details_note =req.param("loan_details_note");

			
			var update ="";
			try {
				update = "UPDATE `loan_details` SET `loan_purpose_name`='"+loan_purpose_name+"',`loan_amount`='"+loan_amount+"',`loan_bankname`='"+loan_bankname+"',`loan_accountno`='"+loan_accountno+"',`remittance_account_bank_name`='"+remittance_account_bank_name+"',`remittance_account_bankaccount_no`='"+remittance_account_bankaccount_no+"',`remittance_account_ifsc`='"+remittance_account_ifsc+"',`loan_details_note`='"+loan_details_note+"' WHERE `student_id` = 1";
				console.log("entering try block");
				throw "thrown message";
				console.log("this message is never seen");
			}
			catch (e) {
				console.log("entering catch block");
				console.log(e);
				console.log("leaving catch block");
			}
			console.log(update);
			Loan_details.query(update,function(err,record)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log(record);
					res.redirect('../loan_view/loan_view');
				}
			});
		}else {
			console.log('Else part');
		}

        }

};


