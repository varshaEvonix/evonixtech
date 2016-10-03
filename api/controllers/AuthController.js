/**
 * AuthController
 *
 */
//var Passwords = require('machinepack-passwords');
var md5 = require('MD5');
module.exports = {
    login: function (req, res) {

        return res.view('./admin/login', {layout: false});
    },
    process: function (req, res) {

        Admin_details.query("select * from admin_details where admin_email ='" + req.param('email') + "'", function (err, vals) {
            if (vals.length > 0) {
                var temp = JSON.stringify(vals);
                var admin = JSON.parse(temp)[0];

                if (md5(req.param('password')) === admin.admin_password) {
                    req.session.admin_id = admin.admin_id;
                    req.session.admin_email = admin.admin_email;
                    req.session.admin_firstname = admin.admin_firstname;
                    req.session.admin_lastname = admin.admin_lastname;
                    req.session.admin_contactno = admin.admin_contactno;
                    return res.ok();
                } else {
                    res.status(500).send({error: 'Password is wrong'});
                }
            } else {
                res.status(500).send({error: 'Usename is wrong'});
            }
        });
    },
    logout: function (req, res) {
        //req.logout();
        res.redirect('admin/login');
    }

};



