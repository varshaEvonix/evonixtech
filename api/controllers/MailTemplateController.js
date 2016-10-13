/**
 * MailTemplateController
 *
 * @description :: Server-side logic for managing Mailtemplates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'registration': function (req, res) {

        Mail_template.query('SELECT * FROM mail_template', function (err, mail_template) {

            return res.view('./admin/mail_template', {
                layout: false,
                mail_template: mail_template
            });

        });

    },
    'editmailtemplate': function (req, res) {

        Mail_template.query('SELECT * FROM mail_template where id=' + req.param('id'), function (err, mail_template) {

            return res.view('./admin/edit_mail_template', {
                layout: false,
                mail_template: mail_template[0]
            });

        });

    },
    'edit_mail_template': function (req, res) {
        var query = "UPDATE `mail_template` SET `subject` = '" + req.param('subject') + "', `content` = '" + req.param('content') + "' WHERE `mail_template`.`id` =" + req.param('template_id');
        console.log(query);
        Mail_template.query(query, function (err, mail_template) {
            return res.ok();
        });

    },
};

