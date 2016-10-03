		/**
		 * Personal_editController
		 *
		 * @description :: Server-side logic for managing personal_edits
		 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
		 */

		module.exports = {
			'editpersonal': function(req, res) {
		  	
		         Student_details.query('SELECT * from student_details where student_details.student_id= '+req.param('id'), function(err, recordset) {         	
		        	
		        	return res.view('./personal_edit/personal_edit', {

		      answer: recordset

		    });

		        });
		        
		    },

		'editpersonalsubmit': function(req, res) {
		  	
		       if(req.method=="POST")
				{
					
					var student_firstname = req.param("student_firstname");
					var student_lastname = req.param("student_lastname");
					var student_contactno =req.param("student_contactno");
					var student_email =req.param("student_email");
					var student_address =req.param("student_address");
					var student_city =req.param("student_city");
					var student_state =req.param("student_state");
					var student_country =req.param("student_country");
					var student_birthdate =req.param("student_birthdate");
					var zip_code =req.param("zip_code");
					var student_about_me =req.param("student_about_me");
					var student_ambition =req.param("student_ambition");
					

					
					var update ="";
					try {
						update = "UPDATE `student_details` SET `student_firstname`='"+student_firstname+"',`student_lastname`='"+student_lastname+"',`student_contactno`='"+student_contactno+"',`student_email`='"+student_email+"',`student_address`='"+student_address+"',`student_city`='"+student_city+"',`student_state`='"+student_state+"',`student_country`='"+student_country+"',`student_birthdate`='"+student_birthdate+"',`zip_code`='"+zip_code+"',`student_about_me`='"+student_about_me+"',`student_ambition`='"+student_ambition+"' WHERE `student_id`='1'";
						
						throw "thrown message";
					
					}
					catch (e) {
					
					
					}
				
					Student_details.query(update,function(err,record)
					{
						return res.ok();
					});
				}

		        },

		        'editmedia': function(req, res) {
		  	
		  		
		         Student_details.query('SELECT * from student_details where student_details.student_id= '+req.param('id'), function(err, recordset) { 
		        	 Student_details.query('SELECT * from student_photographs left join student_details on student_details.student_id=student_photographs.student_id where student_details.student_id= '+req.param('id'), function(err, pics) {         	
		        	
		        	return res.view('./media_edit/media_edit', {

		      answer: recordset,
		      photos: pics,
		      loan_list: loan_l,

		    });

		  
		        	});

		        });
		        
		    },

		       

		};



