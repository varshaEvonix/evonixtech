/**
 * About_adminController
 *
 * @description :: Server-side logic for managing about_admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    'get_about_us': function (req, res) {
        About_admin.query('SELECT * FROM about_admin', function (err, recordset) {
            recordset = recordset[0];

            return res.view('./admin/about_admin', {
                layout: false,
                recordset: recordset
            });


        });
    },
    'edit_about_us': function (req, res) {
        About_admin.query('SELECT * FROM about_admin', function (err, recordset) {

            recordset = recordset[0];
            var text = recordset.about_us;
            var re = '<br/>';
            var about_us = text.replace(/\n/gi, re);
            return res.view('./admin/edit_about_admin', {
                layout: false,
                recordset: recordset,
                about_us: about_us
            });


        });
    },
    'updateaboutus': function (req, res) {

        if (req.method == "POST")
        {
            var selectQuery = "UPDATE about_admin SET video_link = '" + req.param("video_link") + "', about_us ='" + req.param("about_us") + "', name='" + req.param("about_us_title") + "' WHERE `about_admin`.`id` =1;";

            About_admin.query(selectQuery, function (err, record)
            {
                return res.ok(record);
            });
        }
    },
    'get_terms_and_cond': function (req, res) {
        Abterms.query('SELECT * FROM abterms', function (err, recordset) {

            return res.view('./admin/abterms', {
                layout: false,
                abterms: recordset
            });


        });

    },
    'edit_terms_and_cond': function (req, res) {
        Abterms.query('SELECT * FROM abterms', function (err, recordset) {
            recordset = recordset[0];
            var text = recordset.description;
            var re = '<br/>';
            var description = text.replace(/\n/gi, re);
            return res.view('./admin/editabterms', {
                layout: false,
                abterms: recordset,
                description: description
            });
        });
    },
    'updateterms': function (req, res) {

        if (req.method == "POST")
        {
            var selectQuery = "UPDATE abterms SET  description ='" + req.param("description") + "', name='" + req.param("title") + "' WHERE `abterms`.`id` =1;";
            console.log(selectQuery);
            Abterms.query(selectQuery, function (err, record)
            {
                if (err)
                {

                }
                else
                {
                    res.ok();
                }
            });
        }
    },
    'get_faq': function (req, res) {
        Faq.query('SELECT * FROM faq', function (err, recordset) {
            Faq.query("SELECT DISTINCT category FROM faq", function (err, cats) {
                var category = [];
                cats.forEach(function (cats, index) {
                    category.push(cats.category);
                });

                return res.view('./admin/faq', {
                    layout: false,
                    faq: recordset,
                    category: category,
                });

            });
        });
    },
    'get_category': function (req, res) {
        Faq.query('SELECT * FROM faq', function (err, recordset) {
            Faq.query("SELECT DISTINCT category FROM faq", function (err, cats) {
                var category = [];

                cats.forEach(function (cats, index) {
                    category.push(cats.category);
                });

                return res.ok({category: category});

            });
        });
    },
    'editfaq': function (req, res) {
        Faq.query('SELECT * FROM faq where id=' + req.param("id"), function (err, recordset) {
            return res.view('./admin/editfaq', {
                layout: false,
                faq: recordset
            });

        });
    },
    'updatefaq': function (req, res) {
        if (req.method == "POST")
        {
            var selectQuery = "UPDATE faq SET category='" + req.param("category") + "',  description ='" + req.param("description") + "', name='" + req.param("name") + "' WHERE `faq`.`id` =" + req.param("faq_id");

            Faq.query(selectQuery, function (err, record)
            {
                if (err)
                {

                }
                else
                {
                    res.ok();
                }
            });
        }
    },
    addfaq: function (req, res) {
        if (req.method == "POST")
        {
            var selectQuery = "INSERT INTO `stumuch_db`.`faq` (`name`, `description`,  `category`) VALUES ('" + req.param("question") + "', '" + req.param("description") + "','" + req.param("category") + "')";

            Faq.query(selectQuery, function (err, record)
            {
                if (err)
                {

                }
                else
                {
                    res.ok();
                }
            });
        }

    },
    privacypolicy: function (req, res) {

        Privacy_policy.query('SELECT * FROM privacy_policy', function (err, recordset) {

            return res.view('./admin/privacypolicy', {
                layout: false,
                privacypolicy: recordset
            });


        });

    },
    editprivacypolicy: function (req, res) {

        Privacy_policy.query('SELECT * FROM privacy_policy', function (err, recordset) {
            recordset = recordset[0];
            var text = recordset.description;
            var re = '<br/>';
            var description = text.replace(/\n/gi, re);
            return res.view('./admin/edit_privacypolicy', {
                layout: false,
                privacypolicy: recordset,
                description: description
            });


        });

    },
    updateprivacypolicy: function (req, res) {

        if (req.method == "POST")
        {
            var selectQuery = "UPDATE privacy_policy SET  description ='" + req.param("description") + "', name='" + req.param("title") + "' WHERE `privacy_policy`.`id` =1;";

            Privacy_policy.query(selectQuery, function (err, record)
            {
                if (err)
                {

                }
                else
                {
                    res.ok();
                }
            });
        }

    },
};




