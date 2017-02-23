/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    attributes: {
        student_firstname:
                {
                    type: 'string',
                    required: true
                },
        student_id:
                {
                    type: 'integer',
                    primaryKey: true
                },
        student_lastname:
                {
                    type: 'string',
                    required: true
                },
        student_contactno:
                {
                    type: 'string',
                    required: true
                },
        student_email:
                {
                    type: 'email',
                    required: true
                },
        student_address:
                {
                    type: 'string',
                    required: true
                },
        student_city:
                {
                    type: 'string',
                    required: true
                },
        student_state:
                {
                    type: 'string',
                    required: true
                },
        student_country:
                {
                    type: 'string',
                    required: true
                },
        student_birthdate:
                {
                    type: 'string',
                    required: true
                },
        student_about_me:
                {
                    type: 'text',
                    required: true
                },
        student_ambition:
                {
                    type: 'text',
                    required: true
                },
        student_profile_pic_path:
                {
                    type: 'string',
                    required: true
                },
    },
    CallStudentFunction: function (req, res) {
        Student_details.query('SELECT * from student_login_credentials where student_login_credentials.student_id= ' + req.session.student_id, function (err, studentdetails) {
            if (studentdetails[0].profile_lock == 1) {
                var send_grid_token = "select token from send_grid_token where id =1";
                Send_grid_token.query(send_grid_token, function (err, token) {
                    var temp = JSON.stringify(studentdetails);
                    var student_details = JSON.parse(temp)[0];
                    var helper = require('sendgrid').mail;
                    var from_email = new helper.Email('support@stumuch.com');
                    var to_email = new helper.Email('team@stumuch.com');
                    var subject = 'Locked state notice';
                    var protocol = req.connection.encrypted ? 'https' : 'http';
                    var baseUrl = protocol + '://' + req.headers.host + '/';
                    var mail_content = "Hi Admin <br/><br/> Student profile <a href='" + baseUrl + "admin/studlockedprofile/" + req.session.student_id + "'>" + baseUrl + "admin/studlockedprofile/" + req.session.student_id + "</a> is now locked and awaiting admin attention.";
                    var content = new helper.Content('text/html', mail_content);
                    var mail = new helper.Mail(from_email, subject, to_email, content);

                    var sg = require('sendgrid')(token[0].token);
                    var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: mail.toJSON(),
                    });

                    sg.API(request, function (error, response) {

                    });

                });
            }
        })
    }



};