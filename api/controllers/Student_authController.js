

var md5 = require('MD5');

module.exports = {
    student_login: function (req, res) {

        return res.view('./studentlogin/studentlogin', {layout: false});
    },
    student_process: function (req, res) {

        Student_login_credentials.query("select * from student_login_credentials where student_login_credentials.student_active = 1 AND student_email ='" + req.param('email') + "' ", function (err, vals) {

            if (vals.length > 0) {
                var temp = JSON.stringify(vals);
                var student = JSON.parse(temp)[0];
                console.log(md5(req.param('password')));


                if (md5(req.param('password')) === student.student_password) {
                    req.session.student_id = student.student_id;

                    var path = '/studash/' + req.session.student_id;
                    req.session.student_email = student.student_email;
                    return res.ok({path: path});
                } else {
                    res.status(500).send({error: 'Invalid Username/Password', errormessage: "Still can't sign in? Be sure to check your spam folder, your account may need verification"});
                }
            } else {
                res.status(500).send({error: 'Invalid Username/Password', errormessage: "Still can't sign in? Be sure to check your spam folder, your account may need verification"});
            }
        });
    },
    student_logout: function (req, res) {
        //req.logout();
        req.session.destroy();
        res.redirect('/student/login');
    },
    forgotpassword: function (req, res) {

        return res.view('./forgotpassword', {layout: false});
    },
    submitforgotpassword: function (req, res) {
        console.log(req.allParams())
         var link = new Buffer(1).toString('base64');
      
//        if (req.method === 'POST') {
//            var student_email = req.param('email');
//            var check_email_exist_or_not = "SELECT student_id,student_email,student_firstname FROM student_details where student_email='" + student_email + "'";
//
//            Student_details.query(check_email_exist_or_not, function (err, email_existance)
//            {
//                var student_firstname = email_existance[0].student_firstname;
//                var student_id = email_existance[0].student_id;
//                if (email_existance.length < 0) {
//                    req.flash('error', '<div class="alert alert-danger "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Email does not exist</div>');
//                } else {
//                    var fetch_mail_template = "SELECT * FROM mail_template where id=4";
//                    Mail_template.query(fetch_mail_template, function (err, mail_template) {
//                        mail_template = mail_template[0];
//
//                        var helper = require('sendgrid').mail;
//                        var from_email = new helper.Email('support@evonixtech.com');
//                        var to_email = new helper.Email(student_email);
//
//                        var html = mail_template.content;
//                        var html = html.replace(/\n/gi, '<br/>');
//
//                        var html = html.replace('<~:firstname:~>', student_firstname);
//                       
//                        var html = html.replace("<~:link:~>", "<a href=" + sails.getBaseurl() + "/resetpassword/" + student_id + "'>Click Here</a>");
//                        console.log('html')
//                        console.log(html)
//                        var subject = mail_template.subject;
//                        var content = new helper.Content('text/html', html);
//                        var mail = new helper.Mail(from_email, subject, to_email, content);
//
//                        var sg = require('sendgrid')(token[0].token);
//                        var request = sg.emptyRequest({
//                            method: 'POST',
//                            path: '/v3/mail/send',
//                            body: mail.toJSON(),
//                        });
//
//                        sg.API(request, function (error, response) {
////                                console.log(error);
////                                console.log('response.statusCode');
////                                console.log(response.statusCode);
////                                console.log(response.body);
////                                console.log(response.headers);
//                        });
//
//                        return res.ok();
//                        res.redirect('../studentlogin/studentlogin');
//                    });
//                    req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Fields are approved</div>');
//                }
//                return res.redirect('/forgotpassword');
//            });
//        }
    }

};