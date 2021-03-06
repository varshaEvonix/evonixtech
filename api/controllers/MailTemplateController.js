/**
 * MailTemplateController
 *
 * @description :: Server-side logic for managing Mailtemplates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mysql = require('mysql');

module.exports = {
    'mailtemplate': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            Mail_template.query('SELECT * FROM mail_template', function (err, mail_template) {

                return res.view('./admin/mail_template', {
                    layout: false,
                    mail_template: mail_template
                });

            });
        } else {
            return  res.redirect('admin/login');
        }

    },
    'editmailtemplate': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            Mail_template.query('SELECT * FROM mail_template where id=' + req.param('id'), function (err, mail_template) {
                content = mail_template[0].content;
                var re = '<br/>';
                var content = content.replace(/\n/gi, re);
                return res.view('./admin/edit_mail_template', {
                    layout: false,
                    mail_template: mail_template[0],
                    content: content,
                });

            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'edit_mail_template': function (req, res) {
        var query = "UPDATE `mail_template` SET `template_name` = " + mysql.escape(req.param('title')) + ", `subject` = " + mysql.escape(req.param('subject')) + ", `content` = " + mysql.escape(req.param('content')) + " WHERE `mail_template`.`id` =" + mysql.escape(req.param('template_id'));
 
        Mail_template.query(query, function (err, mail_template) {
            return res.ok();
        });

    },
};

