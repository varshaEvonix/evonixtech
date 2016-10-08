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



    'removedoc': function(req, res) {
    
         Table_loan_document.query('UPDATE `table_loan_document` SET `isPublic`= 0 WHERE `loan_document_id`='+req.param('loan_document_id'), function(err, recordset) {           
          
          return res.redirect('/loan_edit/'+req.param('student_id')+'/'+req.param('loan_id'));

        });
        
    },


	'editloan': function(req, res) {

         Loan_details.query('SELECT ld.loan_id, sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_profile_pic_path, ld.loan_amount, IFNULL(mst_fafsa.fafsa_values,"-") fafsa_values, IFNULL(ld.loan_fafsa_id, "-") loan_fafsa_id, IFNULL(ld.loan_bankname, "-") loan_bankname, IFNULL(ld.loan_accountno, "-") loan_accountno from student_details sd left join loan_details ld on sd.student_id = ld.student_id left join mst_fafsa on mst_fafsa.id=ld.loan_fafsa_id where sd.student_id='+req.param('student_id')+' AND ld.loan_id ='+req.param('loan_id')+' AND ld.isActive = 1' , function(err, recordset) { 

            Table_loan_document.query('SELECT * from table_loan_document where loan_id='+req.param('loan_id') , function(err, recordset1) {         	
        	
         // console.log(recordset1);
        	return res.view('./loan_edit/loan_edit', {



      student_info: recordset,
      loan_docs: recordset1

    });
           });

        });
        
    },

'editloansubmit': function(req, res) {
  	
       if(req.method=="POST")
		{

			console.log('r u t');
     var document_path = req.param('filename');
     var document_name = req.param('document_name');
     console.log('doc_name');
     console.log(document_name);
			var loan_type = req.param("loan_type");
			var fafsa_values = req.param("fafsa_values");
			var loan_bankname = req.param("loan_bankname");
			var loan_accountno =req.param("loan_accountno");
			var loan_amount =req.param("loan_amount");
			
			var update ="";
      var update_doc = "";
			 
				if(loan_type == 'bankloan'){
					update = "UPDATE `loan_details` SET `loan_fafsa_id`= '',`loan_bankname`='"+loan_bankname+"',`loan_accountno`='"+loan_accountno+"',`loan_amount`='"+loan_amount+"' WHERE `loan_id`="+req.param('loan_id');
				}else{
					update = "UPDATE `loan_details` SET `loan_fafsa_id`='"+fafsa_values+"',`loan_bankname`= '',`loan_accountno`='"+loan_accountno+"',`loan_amount`='"+loan_amount+"' WHERE `loan_id`="+req.param('loan_id');
				}
				
			  update_doc = "UPDATE `table_loan_document` SET `document_name` = '"+document_name+"',`document_path` = '"+document_path+"' WHERE `loan_id`="+req.param('loan_id');
			
      console.log(update);
			Loan_details.query(update,function(err,record)
			{

		      Table_loan_document.query(update_doc,function(err,record2)
        { 
          console.log('record');
          console.log(record);
          console.log(record2);

        });
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
      var document_path = req.param('filename');
     var document_name = req.param('document_name');
			var loan_type = req.param("loan_type");
			var fafsa_values = req.param("fafsa_values");
			var loan_bankname = req.param("loan_bankname");
			var loan_accountno =req.param("loan_accountno");
			var loan_amount =req.param("loan_amount");
			
			var insert =""; 
      var insert_doc = "";
			
				if(loan_type == 'bankloan'){
					insert = "INSERT INTO `loan_details` (`student_id`, `loan_amount`, `loan_fafsa_id`, `loan_bankname`,`loan_accountno`,`isActive`) VALUES ('"+req.param('id')+"', '"+loan_amount+"',NULL,'"+loan_bankname+"','"+loan_accountno+"','1')";
				}else{
					insert = "INSERT INTO `loan_details` (`student_id`, `loan_amount`, `loan_fafsa_id`, `loan_bankname`,`loan_accountno`,`isActive`) VALUES ('"+req.param('id')+"', '"+loan_amount+"','"+fafsa_values+"',NULL,'"+loan_accountno+"','1')";
				}
				
			insert_doc = "INSERT INTO `table_loan_document` (`document_name`, `document_path`, `loan_id`, `isPublic`) VALUES ('"+document_name+"', '"+document_path+"', '2', '1');";
			
      console.log(insert);
			Loan_details.query(insert,function(err,record)
			{

		      Table_loan_document.query(insert_doc,function(err,record2)
        { 
         
          console.log('record');
          console.log(record);

        });
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

     uploadfile: function (req, res) {

        if (req.method === 'POST') {
            var file = req.file('file');
            var filename = req.file('file')._files[0].stream.filename;
            var newfilename = Date.now() + filename;
            req.file('formdata').upload({dirname: '../public/index_files/uploads/', saveAs: newfilename}, function (err, files) {
               console.log('newfilename');
               console.log(newfilename);
                return res.ok(newfilename);
            });
        }
    },
     

};


