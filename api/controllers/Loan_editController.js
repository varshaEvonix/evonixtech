/**
 * Personal_editController
 *
 * @description :: Server-side logic for managing personal_edits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'addloan': function(req, res) {
  	
         Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where student_details.student_id='+req.param('id'), function(err, recordset) {         	
        	
        	return res.view('./addloan/addloan', {

      answer: recordset

    });

        });
        
    },

	'editloan': function(req, res) {
  	
         Student_details.query('SELECT * from loan_details left join mst_fafsa on mst_fafsa.id=loan_details.loan_fafsa_id where student_id='+req.param('id'), function(err, recordset) {         	
        	
        	return res.view('./loan_edit/loan_edit', {

      answer: recordset

    });

        });
        
    },

'editloansubmit': function(req, res) {
  	
       if(req.method=="POST")
		{

			console.log('r u t');
			
			var loan_type = req.param("loan_type");
			var fafsa_values = req.param("fafsa_values");
			var loan_bankname = req.param("loan_bankname");
			var loan_accountno =req.param("loan_accountno");
			var loan_amount =req.param("loan_amount");
			
			var update ="";
			
				if(loan_type == 'bankloan'){
					update = "UPDATE `loan_details` SET `loan_fafsa_id`= NULL,`loan_bankname`='"+loan_bankname+"',`loan_accountno`='"+loan_accountno+"',`loan_amount`='"+loan_amount+"' WHERE `loan_id`="+req.param('id');
				}else{
					update = "UPDATE `loan_details` SET `loan_fafsa_id`='"+fafsa_values+"',`loan_bankname`= NULL,`loan_accountno`='"+loan_accountno+"',`loan_amount`='"+loan_amount+"' WHERE `loan_id`="+req.param('id');
				}
				
			
			console.log(update);
			Loan_details.query(update,function(err,record)
			{

		
         
          console.log('record');
          console.log(record);

        });
            
       
        return res.ok();
    // var file_name = files.filename;
     //console.log(file_name);
          
			
		}else {
			console.log('Else part');
		}

        },


        'addloansubmit': function(req, res) {
  	
       if(req.method=="POST")
		{
			console.log('r u t');
			var loan_type = req.param("loan_type");
			var fafsa_values = req.param("fafsa_values");
			var loan_bankname = req.param("loan_bankname");
			var loan_accountno =req.param("loan_accountno");
			var loan_amount =req.param("loan_amount");
			
			var insert ="";
			
				if(loan_type == 'bankloan'){
					insert = "INSERT INTO `loan_details` (`student_id`, `loan_amount`, `loan_fafsa_id`, `loan_bankname`,`loan_accountno`,`isActive`) VALUES ('"+req.param('id')+"', '"+loan_amount+"',NULL,'"+loan_bankname+"','"+loan_accountno+"','1')";
				}else{
					insert = "INSERT INTO `loan_details` (`student_id`, `loan_amount`, `loan_fafsa_id`, `loan_bankname`,`loan_accountno`,`isActive`) VALUES ('"+req.param('id')+"', '"+loan_amount+"','"+fafsa_values+"',NULL,'"+loan_accountno+"','1')";
				}
				
			
			console.log(insert);
			Loan_details.query(insert,function(err,record)
			{

		
         
          console.log('record');
          console.log(record);

        });
            
       
        return res.ok();
    // var file_name = files.filename;
     //console.log(file_name);
          
			
		}else {
			console.log('Else part');
		}

        },



     'uploaddocs': function(req, res) {
      console.log('are you there');
      console.log(req.method);
         if(req.method=="POST")
    {
      
      	var doc_name = req.param('document_name');
        var newFilename = req.file('document_path')._files[0].stream.filename;
      req.file('document_path').upload({dirname:'../public/index_files/uploads/documents/',saveAs: newFilename}, function onUploadComplete(err, files) {
        console.log(files);
        var file_name='';
        files.forEach(function(files, index){
   file_name=files.filename;
   console.log('here');
   console.log(req.param('student_id'));
   console.log(file_name);

   
  
         // var insert = "INSERT INTO `student_photographs` ('student_id','photo_path','isEnabled') VALUES ('','','1')";
var insert = "INSERT INTO `table_loan_document` (`document_name`, `document_path`, `loan_id`, `isPublic`) VALUES ('"+doc_name+"', '"+file_name+"', '"+req.param('loan_id')+"', '1')";
          Table_loan_document.query(insert,function(err,record)
        {
         
          console.log('record');
          console.log(record);
          console.log('record');
        });
            });
       
        return res.redirect('/viewprofile/'+req.param('student_id'));
    // var file_name = files.filename;
     //console.log(file_name);
            
     });
    }



        },



        uploaddocuments: function (req, res) {

        if (req.method === 'POST') {
            var file = req.file('file');
            var filename = req.file('file')._files[0].stream.filename;
            var newfilename = Date.now() + filename;
            console.log(newfilename);
            req.file('formdata').upload({dirname: '../public/index_files/loan_docs/', saveAs: newfilename}, function (err, files) {
                return res.ok(newfilename);
            });
        }
    },
     

};


