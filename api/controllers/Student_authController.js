 

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

                        var path = '/studash/'+req.session.student_id;
                    req.session.student_email = student.student_email;
                    return res.ok({path:path});
                } else {
                    res.status(500).send({error: 'Password is wrong'});
                }
            } else {
                res.status(500).send({error: 'Usename is wrong'});
            }
        });
    },
   student_logout: function (req, res) {
        //req.logout();
        res.redirect('./studentlogin/studentlogin');
    }

};