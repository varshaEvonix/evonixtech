/**
 * About_adminController
 *
 * @description :: Server-side logic for managing about_admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    'about_admin': function (req, res) {
        res.view();
    },
    'get_about_us': function (req, res) {
        About_admin.query('SELECT * FROM about_admin', function (err, recordset) {

            return res.view('./admin/about_admin', {
                layout: false,
                varsha: recordset
            });


        });
    },
    'edit_about_us': function (req, res) {
        About_admin.query('SELECT * FROM about_admin', function (err, recordset) {

            return res.view('./admin/edit_about_admin', {
                layout: false,
                varsha: recordset
            });


        });
    },
    'updateaboutus': function (req, res) {

        if (req.method == "POST")
        {
            console.log('varsha');
            console.log(req.param("video_link"));

            var selectQuery = "UPDATE about_admin SET video_link = '" + req.param("video_link") + "', about_us ='" + req.param("about_us") + "', name='" + req.param("about_us_title") + "' WHERE `about_admin`.`id` =1;";
//            console.log(selectQuery);
            About_admin.query(selectQuery, function (err, record)
            {
               console.log('record');
               console.log(record);
               return res.ok(record);

            });
//             return true;
        }

    }

};




