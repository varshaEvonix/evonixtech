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
	'loan': function(req, res){
  	res.view();
  },

  'insertloan':function(req,res){
  
		if(req.method=="POST")
		{
			
			var bank = req.param("bank");
			var branch = req.param("branch");
			var ifsc =req.param("ifsc");
			var account_no =req.param("account_no");
			var account_name =req.param("account_name");
			var loan_name =req.param("loan_name");
			var loan_type =req.param("loan_type");
			var loan_id =req.param("loan_id");
			
			
			var insert ="";
			try {
				insert = " INSERT INTO `loan` (`bank`, `branch`, `ifsc`, `account_no`, `account_name`, `loan_name`, `loan_type`,`loan_id`, `createdAt`, `updatedAt`) VALUES ('"+bank+"', '"+branch+"', '"+ifsc+"', '"+account_no+"', '"+account_name+"','"+loan_name+"','"+loan_type+"','"+loan_id+"', NULL, NULL);";
				
				throw "thrown message";
				
			}
			catch (e) {
			
			}
		
			Loan.query(insert,function(err,record)
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

