

var md5 = require('MD5');

module.exports = {
    student_login: function (req, res) {

        return res.view('./studentlogin/studentlogin', {layout: false});
    },
    student_process: function (req, res) {
        var select_query = "select * from student_login_credentials where student_login_credentials.student_active = 1 AND student_email ='" + req.param('email') + "' ";

        Student_login_credentials.query(select_query, function (err, vals) {

            if (vals.length > 0) {
                var temp = JSON.stringify(vals);
                var student = JSON.parse(temp)[0];

                if (md5(req.param('password')) === student.student_password) {
                    req.session.student_id = student.student_id;

                    var path = '/dashboard';
                    req.session.student_email = student.student_email;
                    return res.ok({path: path});
                } else {
                    req.flash('error', '<div class="alert alert-danger "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Invalid Username/Password</br>Still can not sign in? Be sure to check your spam folder, your account may need verification</div>');
                    res.status(500).send();
                }
            } else {
                req.flash('error', '<div class="alert alert-danger "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Invalid Username/Password</br>Still can not sign in? Be sure to check your spam folder, your account may need verification</div>');
                res.status(500).send();
            }
        });
    },
    student_logout: function (req, res) {
        //req.logout();
        req.session.destroy();
        res.redirect('/login');
    },
    forgotpassword: function (req, res) {

        return res.view('./forgotpassword', {layout: false});
    },
    submitforgotpassword: function (req, res) {
        if (req.method === 'POST') {
            var student_email = req.param('email');
            var check_email_exist_or_not = "SELECT student_id,student_email,student_firstname FROM student_details where student_email='" + student_email + "'";

            Student_details.query(check_email_exist_or_not, function (err, email_existance)
            {
                var student_firstname = email_existance[0].student_firstname;
                var student_id = email_existance[0].student_id;

                if (email_existance.length < 0) {
                    req.flash('error', '<div class="alert alert-danger "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Email does not exist</div>');
                } else {
                    var send_grid_token = "select token from send_grid_token where id =1";
                    Send_grid_token.query(send_grid_token, function (err, token) {
                        var fetch_mail_template = "SELECT * FROM mail_template where id=4";
                        Mail_template.query(fetch_mail_template, function (err, mail_template) {
                            mail_template = mail_template[0];

                            var helper = require('sendgrid').mail;
                            var from_email = new helper.Email('support@stumuch.com');
                            var to_email = new helper.Email(student_email);

                            var html = mail_template.content;
                            var html = html.replace(/\n/gi, '<br/>');

                            var html = html.replace('<~:firstname:~>', student_firstname);
                            student_id = parseInt(student_id)

//                            student_id = new Buffer(student_id).toString('base64');

                            var html = html.replace("<~:link:~>", "<a href=" + sails.getBaseurl() + "/resetpassword/" + student_id + "'>Click Here</a>");

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

                        });
                    });
                    req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please check your mail to reset password</div>');
                }
                return res.redirect('/forgotpassword');
            });
        }
    },
    resetpassword: function (req, res) {
        var student_id = req.param('student_id');

//        student_id = new Buffer(student_id, 'base64').toString();
//        student_id = student_id.toString('utf8');

        return res.view('./resetpassword', {layout: false, student_id: student_id});
    },
    submitresetpassword: function (req, res) {
        if (req.method === 'POST') {
            console.log('if')
            var student_id = req.param('student_id');
            var password = md5(req.param('password'));
            var query = "UPDATE `student_login_credentials` SET `student_password` = '" + password + "' WHERE `student_login_credentials`.`student_id` =" + student_id;
            Student_login_credentials.query(query, function (err, vals) {
                req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Password has been changed successfully</div>');
                return res.redirect('/login');
            });
        }
    }

};