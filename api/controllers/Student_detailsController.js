/**
* UserController
*
* @description :: Server-side logic for managing users
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
// Insert:function(req,res)
// {
//     if(req.method=="POST")
//         {
//             console.log("Post");
//             var name = req.param("name");
//             var username = req.param("username");
//             var email =req.param("email");
//             console.log(userName);
//             var insert = "INSERT INTO user(name,username,email) VALUES("+name+",'"+username+"','"+email+"')";
//             User.query(insert,function(err,record)
//             {
//                 if(err)
//                 {
//                     console.log(err);
//                 }
//                 else
//                 {
//                     console.log(record);
//                     res.redirect('/');
//                 }
//             });
//         }
//         else
//         {
//             res.render("create");
//         }
// },


// var BackofficeController = require('./BackofficeController');
module.exports = {

	
	'stulogin':function(req,res){
		if(req.method=="POST")
		{
			
			var student_firstname = req.param("student_firstname");
			var student_lastname = req.param("student_lastname");
			var student_contactno =req.param("student_contactno");
			var student_email =req.param("student_email");
			var student_password =req.param("student_password");
			
			var insert ="";
			insert = "INSERT INTO `student_details` (`student_firstname`, `student_lastname`, `student_contactno`, `student_email`) VALUES ('"+student_firstname+"', '"+student_lastname+"', '"+student_contactno+"', '"+student_email+"')";
			
			Student_details.query(insert,function(err,record)
			{
				
				var st_id=record.insertId;
				var credential = "INSERT INTO `student_login_credentials` (`student_id`, `student_email`, `student_password`, `student_active`) VALUES ('"+st_id+"', '"+student_email+"', '"+student_password+"', '0')";
				Student_login_credentials.query(credential,function(err,credential_record)
				{
					return res.ok();
					res.redirect('../studentlogin/studentlogin');
					
				});
				
				
			});
		}

		else {
		
		}
	},



	'stu_search': function(req, res) {
		var stu_name= req.param('stu_name');
		var bday_check= req.param('bday_check');
		var arr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ");
		var bdate=arr[0];
		
		

		var stu_search='';
		if(bday_check!='1'){
			stu_search = 	
			stu_search ="SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id WHERE  student_firstname LIKE '%"+stu_name+"%' OR student_lastname LIKE '%"+stu_name+"%' OR student_city LIKE '%"+stu_name+"%' OR student_city LIKE '%"+stu_name+"%'" ;
			Student_details.query(stu_search,function(err,recordset){
        // Student_details.query('SELECT * from student_details WHERE student_firstname LIKE '%" . '"+stu_name+"' . "%'', function(err, recordset) {         	
        	
        	return res.view('./allprofile/allprofile', {

        		humans: recordset,
        		student_find: stu_name,
        		bday_check: bday_check,
        		today: bdate

        	});
        });
		}
		else{
			stu_search_bday = 	
			stu_search_bday ="SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id WHERE student_details.student_birthdate='"+bdate+"' AND (student_firstname LIKE '%"+stu_name+"%' OR student_lastname LIKE '%"+stu_name+"%' OR student_city LIKE '%"+stu_name+"%')" ;
			Student_details.query(stu_search_bday,function(err,recordset){
        // Student_details.query('SELECT * from student_details WHERE student_firstname LIKE '%" . '"+stu_name+"' . "%'', function(err, recordset) {         	
        
        	return res.view('./bday_profile/bday_profile', {

        		humans: recordset,
        		student_find:stu_name,
        		bday_check: bday_check,

        	});
        });
		}
	},





// $term = mysql_real_escape_string($_REQUEST['term']);    

// $sql = "SELECT * FROM liam WHERE Description LIKE '%".$term."%'";
// $r_query = mysql_query($sql);

// while ($row = mysql_fetch_array($r_query)){ 
// echo 'Primary key: ' .$row['PRIMARYKEY']; 
// echo '<br /> Code: ' .$row['Code']; 
// echo '<br /> Description: '.$row['Description']; 
// echo '<br /> Category: '.$row['Category']; 
// echo '<br /> Cut Size: '.$row['CutSize'];  
// } 

	// 'loginfunc':function(req,res)
	// {
	// 	console.log('login block');
	// 	if(req.method=="post")
	// 	{
	// 		var email ="";
	// 		email = req.param("email");
	// 		var password1 =req.param("password1");
	// 		var insert ="";
	// 		try 
	// 		{
	// 			if(email!="")
	// 			{
	// 				var selectQuery="SELECT * FROM `user` WHERE `email`='"+email+"' and `password1`='"+password1+"';";
	// 				console.log(selectQuery);
	// 				User.query(selectQuery,function(err,record)
	// 				{
	// 					if(err)
	// 					{
	// 						console.log(err);
	// 					}
	// 					else
	// 					{
	// 						console.log(record);
	// 						res.redirect('../admin_dash/admin_dash');
	// 					}
	// 				});
	// 			}
	// 		}
	// 		catch (e) {
	// 			console.log("entering catch block");
	// 			console.log(e);
	// 			console.log("leaving catch block");
	// 		}
	// 	}else {
	// 		console.log('Else part');
	// 	}
	// },








	'homepage_view': function(req, res) {
		var arr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ");
		var bdate=arr[0];
		Student_details.query('SELECT * from student_details left join loan_details on loan_details.student_id=student_details.student_id where loan_details.isActive = 1', function(err, recordset) {

				
			Student_details.query("SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id WHERE student_details.student_birthdate='"+bdate+"'", function(err, record) {
				
				return res.view('./homepage', {

					answer: recordset,
					birthday: record,
					today: bdate

				});

			});
		});
		
	},





	'allprofiles': function(req, res) {
		var arr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ");
		var bdate=arr[0];
		Student_details.query('SELECT * from student_details left join loan_details on loan_details.student_id=student_details.student_id where loan_details.isActive = 1', function(err, recordset) {         	
			
			return res.view('./allprofile/allprofile', {

				humans: recordset,
				today: bdate

			});

		});
		
	},




	'singleprofile': function(req, res) {
		Student_details.query('SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id where student_details.student_id='+req.param('id'), function(err, recordset) {     
			Student_details.query('SELECT * from student_details  left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id where student_details.student_id='+req.param('id'), function(err, donor_l) {    
				Student_photographs.query('SELECT * from student_photographs where student_id='+req.param('id'), function(err, photorecord){
					
				

					return res.view('./myprofile/myprofile', {

						humans: recordset,
						donor_l: donor_l,
						pics: photorecord
						


						
					});
				});

			});

		});
		
	},
};
