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
    'activate_student': function (req, res) {

        Student_login_credentials.query('UPDATE `student_login_credentials` SET `student_active`= 1 where student_id =' + req.param('id'));

        return	res.redirect('/student/login');



    },
    'stulogin': function (req, res) {
        if (req.method == "POST")
        {

            var student_firstname = req.param("student_firstname");
            var student_lastname = req.param("student_lastname");
            var student_contactno = req.param("student_contactno");
            var student_email = req.param("student_email");
            var student_password = req.param("student_password");
            var insert = "";
            var check_email_exist_or_not = "";
            var flag = 0;
            var email_check = "";
            email_check =
                    check_email_exist_or_not = "SELECT student_email FROM student_details where student_email='" + student_email + "'";

            Student_details.query(check_email_exist_or_not, function (err, email_existance)
            {
                if (email_existance.length > 0) {
                    flag = 1;
                }


                if (flag == 0) {

                    insert = "INSERT INTO `student_details` (`student_firstname`, `student_lastname`, `student_contactno`, `student_email`) VALUES ('" + student_firstname + "', '" + student_lastname + "', '" + student_contactno + "', '" + student_email + "')";

                    Student_details.query(insert, function (err, record)
                    {

                        var st_id = record.insertId;
                        var credential = "INSERT INTO `student_login_credentials` (`student_id`, `student_email`, `student_password`, `student_active`,`profile_lock`) VALUES ('" + st_id + "', '" + student_email + "',MD5('" + student_password + "'), '0','1')";

                        Student_login_credentials.query(credential, function (err, credential_record)
                        {
                            var send_grid_token = "select token from send_grid_token where id =1";
                            Send_grid_token.query(send_grid_token, function (err, token) {
                                var fetch_mail_template = "SELECT * FROM mail_template where id=1";
                                Mail_template.query(fetch_mail_template, function (err, mail_template) {
                                    mail_template = mail_template[0];

                                    var helper = require('sendgrid').mail;
                                    var from_email = new helper.Email('support@evonixtech.com');
                                    var to_email = new helper.Email(student_email);

                                    var html = mail_template.content;
                                    var html = html.replace('<~: firstname : ~>', student_firstname);
                                    var html = html.replace("<~: link : ~>", "<a href=" + sails.getBaseurl() + "/activation_link/" + st_id + "'>Click Here</a>");
//                        var html = html.replace("<~: Link : ~>", "<a href='http://52.43.77.58:1337/activation_link/" + st_id + "'>Click Here</a>");
//student_photographs_insert
                                    var subject = mail_template.subject;
                                    var content = new helper.Content('text/html', html);
                                    var mail = new helper.Mail(from_email, subject, to_email, content);

                                    var sg = require('sendgrid')(token[0].token);
                                    var request = sg.emptyRequest({
                                        method: 'POST',
                                        path: '/v3/mail/send',
                                        body: mail.toJSON(),
                                    });

                                    sg.API(request, function (error, response) {
//                                console.log(error);
//                                console.log('response.statusCode');
//                                console.log(response.statusCode);
//                                console.log(response.body);
//                                console.log(response.headers);
                                    });

                                    return res.ok();
                                    res.redirect('../studentlogin/studentlogin');
                                });
                            });
                        });
                    });
                } else {
                    res.status(500).send({error: 'Email id already exist'});
                }
            });

        }

    },
    'stu_search': function (req, res) {
        console.log(req.param('stu_name'));
        var stu_name = req.param('stu_name'); //=='undefined'? '' : req.param('stu_name');

        if (stu_name == undefined)
        {
            stu_name = '';
        }
        var bday_check = req.param('bday_check');
        var arr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ");
        var bdate = arr[0];



        var stu_search = '';
        var bday_search_string = '';
        var sort_string = '';
        if (bday_check == '1') {
            bday_search_string = 'and DATE_FORMAT(student_birthdate,"%Y-%m-%d") = "' + bdate + '"';
            bday_sort_string = ' order by sd.student_lastname';
        }
        else {
            bday_sort_string = ' order by ld.created_on DESC'
        }
        stu_search = 'SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, LEFT(sd.student_about_me, 53) student_about_me, sd.student_profile_pic_path, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join education ed on ed.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id  where slc.student_active = 1 AND slc.profile_lock = 0 and (sd.student_lastname like "%' + stu_name + '%" OR sd.student_firstname like "%' + stu_name + '%" or ed.student_education_institute like "%' + stu_name + '%" or ed.student_education_fieldofstudy like "%' + stu_name + '%")';

        stu_search += bday_search_string;

        stu_search += 'group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount';

        stu_search += bday_sort_string;

        // console.log(stu_search);
        //stu_search ="SELECT * from student_details left join loan_details on loan_details.student_id=student_details.student_id left join student_login_credentials on student_login_credentials.student_id = student_details.student_id  WHERE  (student_firstname LIKE '%"+stu_name+"%' OR student_lastname LIKE '%"+stu_name+"%' OR student_city LIKE '%"+stu_name+"%' OR student_city LIKE '%"+stu_name+"%') AND student_login_credentials.student_active=1" ;
        Student_details.query(stu_search, function (err, recordset) {
            // Student_details.query('SELECT * from student_details WHERE student_firstname LIKE '%" . '"+stu_name+"' . "%'', function(err, recordset) {         	
            // console.log('recordset');
            // console.log(recordset);
            return res.view('./allprofile/allprofile', {
                humans: recordset,
                student_find: stu_name,
                bday_check: bday_check,
                today: bdate

            });
        });

        // else{
        // 	stu_search_bday = 	
        // 	stu_search_bday ="SELECT * from student_details left join education on education.student_id=student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id WHERE student_details.student_birthdate='"+bdate+"' AND (student_firstname LIKE '%"+stu_name+"%' OR student_lastname LIKE '%"+stu_name+"%' OR student_city LIKE '%"+stu_name+"%')" ;
        // 	Student_details.query(stu_search_bday,function(err,recordset){
        //       // Student_details.query('SELECT * from student_details WHERE student_firstname LIKE '%" . '"+stu_name+"' . "%'', function(err, recordset) {         	
        //       	console.log('recordset');
        //       	console.log(recordset);
        //       	return res.view('./bday_profile/bday_profile', {

        //       		humans: recordset,
        //       		student_find:stu_name,
        //       		bday_check: bday_check,

        //       	});
        //       });
        // }
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








    'homepage_view': function (req, res) {
        var arr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ");
        var bdate = arr[0];

        Student_details.query('SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, LEFT(sd.student_about_me, 53) student_about_me, sd.student_profile_pic_path, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id  where slc.student_active = 1 AND slc.profile_lock = 0 group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount order by ld.created_on DESC limit 0,11', function (err, recordset) {

            Student_details.query('SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, LEFT(sd.student_about_me, 53) student_about_me, sd.student_profile_pic_path, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id  where slc.student_active = 1 AND slc.profile_lock = 0 and DATE_FORMAT(student_birthdate,"%Y-%m-%d") = "' + bdate + '" group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount order by sd.student_lastname', function (err, record) {

                return res.view('./homepage', {
                    student_details: recordset,
                    birthday: record,
                    today: bdate

                });

            });
        });

    },
    'allprofiles': function (req, res) {
        var stu_name = '';
        var arr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ");
        var bdate = arr[0];
        var bday_check = '';

        Student_details.query('SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, LEFT(sd.student_about_me, 53) student_about_me, sd.student_profile_pic_path, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join donors_funding_details dfd on ld.loan_id=dfd.loan_id  where slc.student_active = 1 AND slc.profile_lock = 0 group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount order by ld.created_on DESC', function (err, recordset) {
            //console.log(recordset);
            return res.view('./allprofile/allprofile', {
                humans: recordset,
                today: bdate,
                student_find: stu_name,
                bday_check: bday_check

            });

        });

    },
    'singleprofile': function (req, res) {
        Student_details.query('SELECT sd.student_id, sd.student_firstname, sd.student_lastname, DATE_FORMAT(sd.student_birthdate,"%Y-%m-%d") as student_birthdate, sd.student_about_me,  sd.student_ambition,  sd.student_city,  sd.student_state, sd.video_link, sd.student_country, sd.zip_code, sd.student_profile_pic_path, ed.student_education_institute, ed.student_education_fieldofstudy, IFNULL(ld.loan_amount,0) loan_amount, IFNULL(sum(dfd.funded_amount),0) as total_funded from student_login_credentials  slc inner join student_details sd on slc.student_id=sd.student_id left join education ed on ed.student_id=sd.student_id  left join loan_details ld on ld.student_id=sd.student_id and ld.isActive=1 left join  donors_funding_details dfd on ld.loan_id=dfd.loan_id  where slc.student_active = 1 AND slc.profile_lock = 0 and sd.student_id = ' + req.param("id") + ' group by sd.student_id, sd.student_firstname, sd.student_lastname, sd.student_birthdate, sd.student_about_me, sd.student_profile_pic_path, ld.loan_amount', function (err, recordset) {

            Student_details.query('SELECT dfd.donors_name, dfd.donors_comment, dfd.funded_amount, DATE_FORMAT(dfd.funding_date,"%Y-%m-%d") as funding_date FROM  loan_details ld  inner join donors_funding_details dfd on ld.loan_id = dfd.loan_id and ld.isActive = 1 where ld.student_id=' + req.param('id'), function (err, donor_l) {

                Student_photographs.query('SELECT * from student_photographs where student_id=' + req.param('id'), function (err, photorecord) {

                    Admin_loan_comments.query('SELECT note, DATE_FORMAT(alc.last_updated,"%Y-%m-%d") as last_updated from admin_loan_comments alc inner join loan_details ld on ld.loan_id = alc.loan_id where note_type=2 and student_id=' + req.param("id") + ' order by last_updated desc', function (err, loan_comments) {

                        console.log(recordset);

                        return res.view('./myprofile/myprofile', {
                            student_info: recordset,
                            donor_l: donor_l,
                            pics: photorecord,
                            loan_comments: loan_comments



                        });
                    });

                });

            });

        });

    },
    // 'singleprofile': function(req, res) {
    // 	Student_details.query('SELECT * from student_details left join education on education.student_id = student_details.student_id left join loan_details on loan_details.student_id=student_details.student_id where loan_details.isActive = 1 AND student_details.student_id='+req.param('id'), function(err, recordset) {   

    // 		Student_details.query('SELECT * from student_details  left join loan_details on loan_details.student_id=student_details.student_id left join donors_funding_details on loan_details.loan_id=donors_funding_details.loan_id where loan_details.isActive = 1 AND student_details.student_id='+req.param('id'), function(err, donor_l) {   

    // 			Student_photographs.query('SELECT * from student_photographs where student_id='+req.param('id'), function(err, photorecord){

    // 				//console.log(recordset);

    // 				return res.view('./myprofile/myprofile', {

    // 					student_info: recordset,
    // 					donor_l: donor_l,
    // 					pics: photorecord




    // 				});
    // 			});

    // 		});

    // 	});

    // },
};
