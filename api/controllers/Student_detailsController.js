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

	// myLogin:function(req,res)
	// {
	// 	console.log("right now");
	// 	console.log(" in myLogin block");
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

	'stulogin':function(req,res){
		if(req.method=="POST")
		{
			console.log("Post");
			var student_firstname = req.param("student_firstname");
			var student_lastname = req.param("student_lastname");
			var student_contactno =req.param("student_contactno");
			var student_email =req.param("student_email");
			var student_password =req.param("student_password");
			console.log(student_firstname);
			var insert ="";
				insert = "INSERT INTO `student_details` (`student_firstname`, `student_lastname`, `student_contactno`, `student_email`) VALUES ('"+student_firstname+"', '"+student_lastname+"', '"+student_contactno+"', '"+student_email+"')";
			console.log(insert);
			Student_details.query(insert,function(err,record)
			{
				
				var st_id=record.insertId;
				var credential = "INSERT INTO `student_login_credentials` (`student_id`, `student_email`, `student_password`, `student_active`) VALUES ('"+st_id+"', '"+student_email+"', '"+student_password+"', '0')";
				Student_login_credentials.query(credential,function(err,credential_record)
				{
					console.log(credential_record);
					res.redirect('../studentlogin/studentlogin');
		 
				});
				
				 	
			});
		}

		else {
			console.log('Else part');
		}
	},



	'loginfunc':function(req,res)
	{
		console.log('login block');
		if(req.method=="post")
		{
			var email ="";
			email = req.param("email");
			var password1 =req.param("password1");
			var insert ="";
			try 
			{
				if(email!="")
				{
					var selectQuery="SELECT * FROM `user` WHERE `email`='"+email+"' and `password1`='"+password1+"';";
					console.log(selectQuery);
					User.query(selectQuery,function(err,record)
					{
						if(err)
						{
							console.log(err);
						}
						else
						{
							console.log(record);
							res.redirect('../admin_dash/admin_dash');
						}
					});
				}
			}
			catch (e) {
				console.log("entering catch block");
				console.log(e);
				console.log("leaving catch block");
			}
		}else {
			console.log('Else part');
		}
	},


	

};