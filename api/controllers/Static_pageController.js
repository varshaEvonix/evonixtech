/**
 * About_adminController
 *
 * @description :: Server-side logic for managing about_admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mysql = require('mysql');
module.exports = {
    'get_about_us': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            About_admin.query('SELECT * FROM about_admin', function (err, recordset) {
                recordset = recordset[0];
                var text = recordset.about_us;
                var re = '<br/>';
                var about_us = text.replace(/\n/gi, re);
                return res.view('./admin/about_admin', {
                    layout: false,
                    recordset: recordset,
                    about_us: about_us
                });

            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'edit_about_us': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
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
        } else {
            return  res.redirect('admin/login');
        }
    },
    'updateaboutus': function (req, res) {

        if (req.method == "POST")
        {
            var selectQuery = "UPDATE about_admin SET video_link = " + mysql.escape(req.param("video_link")) + ", about_us =" + mysql.escape(req.param("about_us")) + ", name='" + req.param("about_us_title") + "' WHERE `about_admin`.`id` =1;";

            About_admin.query(selectQuery, function (err, record)
            {
                return res.ok(record);
            });
        }
    },
    'get_terms_and_cond': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            Abterms.query('SELECT * FROM abterms', function (err, recordset) {
                recordset = recordset[0];
                var text = recordset.description;
                var re = '<br/>';
                var description = text.replace(/\n/gi, re);
                return res.view('./admin/abterms', {
                    layout: false,
                    abterms: recordset,
                    description: description
                });

            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'edit_terms_and_cond': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
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
        } else {
            return  res.redirect('admin/login');
        }
    },
    'updateterms': function (req, res) {

        if (req.method == "POST")
        {
            var updateQuery = "UPDATE abterms SET  description =" + mysql.escape(req.param("description")) + ", name=" + mysql.escape(req.param("title")) + " WHERE `abterms`.`id` =1;";
            Abterms.query(updateQuery, function (err, record)
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
        if (req.session.admin_id || req.session.admin_id != undefined) {
            Faq.query('SELECT * FROM faq left join mst_category on mst_category.category_id=faq.category_id  where mst_category.status=1 AND faq.isEnabled=1', function (err, recordset) {
                Faq.query("SELECT * from faq left join mst_category on mst_category.category_id=faq.category_id where isEnabled=1 AND mst_category.status=1 group by faq.category_id", function (err, cats) {
                    return res.view('./admin/faq', {
                        layout: false,
                        faq: recordset,
                        category: cats,
                    });

                });
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'get_category': function (req, res) {

        Faq.query("SELECT * FROM mst_category", function (err, cats) {
            var category = [];

            cats.forEach(function (cats, index) {
                category.push(cats.category_name);
            });

            return res.ok({category: category});

        });


    },
    'editfaq': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            Faq.query('SELECT * FROM faq left join mst_category on mst_category.category_id=faq.category_id where faq.id=' + req.param("id"), function (err, recordset) {
                recordset = recordset[0];
                var text = recordset.description;
                var re = '<br/>';
                var description = text.replace(/\n/gi, re);
                return res.view('./admin/editfaq', {
                    layout: false,
                    faq: recordset,
                    description: description
                });

            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'delete_faq': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var faq_query = "UPDATE `faq` SET `isEnabled` = '0' WHERE `faq`.`id` =" + req.param('faq_id');
            Faq.query(faq_query, function (err, recordset) {
                req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Record Deleted</div>');
                return res.ok();
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'delete_category': function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
            var faq_query = "UPDATE `mst_category` SET `status` = '0' WHERE `mst_category`.`category_id` =" + req.param('category_id');
            Faq.query(faq_query, function (err, recordset) {
                req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Category Deleted</div>');
                return res.ok();
            });
        } else {
            return  res.redirect('admin/login');
        }
    },
    'updatefaq': function (req, res) {

        if (req.method == "POST")
        {
            var postdata = req.allParams();
            var category_id = '';
            var select_category = "select * from mst_category where category_name=" + mysql.escape(req.param("category"));
            Mst_category.query(select_category, function (err, category_result)
            {
                if (category_result.length > 0) {
                    category_id = category_result[0].category_id;
                    var category_query = "UPDATE `mst_category` SET `status` = '1' WHERE `mst_category`.`category_id` =" + category_id;
                    Mst_category.query(category_query, function (err, result)
                    {
                    });
                    var selectQuery = "UPDATE faq SET category_id=" + category_id + ",  description =" + mysql.escape(req.param("description")) + ", name=" + mysql.escape(req.param("name")) + " WHERE `faq`.`id` =" + req.param("faq_id");

                    Faq.query(selectQuery, function (err, record)
                    {

                    });
                } else {
                    var category_query = 'INSERT INTO `mst_category` (`category_name`,  `status`) VALUES (' + mysql.escape(req.param("category")) + ',1)';
                    Mst_category.query(category_query, function (err, result)
                    {

                        category_id = result.insertId;
                        var selectQuery = "UPDATE faq SET category_id=" + category_id + ",  description =" + mysql.escape(req.param("description")) + ", name=" + mysql.escape(req.param("name")) + " WHERE `faq`.`id` =" + req.param("faq_id");

                        Faq.query(selectQuery, function (err, record)
                        {

                        });
                    });

                }
                req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Faq Updated successfully</div>');
                return  res.redirect('admin/faq');

            });

        }
    },
    addfaq: function (req, res) {
        if (req.method == "POST")
        {
            var category_id = '';
            var select_category = "select * from mst_category where category_name=" + mysql.escape(req.param("category"));
            Mst_category.query(select_category, function (err, category_result)
            {
                if (category_result.length > 0) {
                    category_id = category_result[0].category_id;
                    var category_query = "UPDATE `mst_category` SET `status` = '1' WHERE `mst_category`.`category_id` =" + category_id;
                    Mst_category.query(category_query, function (err, result)
                    {
                    });
                    var selectQuery = "INSERT INTO `faq` (`name`, `description`,  `category_id`) VALUES (" + mysql.escape(req.param("question")) + ", " + mysql.escape(req.param("description")) + "," + category_id + ")";

                    Faq.query(selectQuery, function (err, record)
                    {

                    });
                } else {
                    var category_query = 'INSERT INTO `mst_category` (`category_name`,  `status`) VALUES (' + mysql.escape(req.param("category")) + ',1)';
                    Mst_category.query(category_query, function (err, result)
                    {
                        category_id = result.insertId;
                        var selectQuery = "INSERT INTO `faq` (`name`, `description`,  `category_id`) VALUES (" + mysql.escape(req.param("question")) + ", " + mysql.escape(req.param("description")) + "," + category_id + ")";

                        Faq.query(selectQuery, function (err, record)
                        {

                        });

                    });
                }

            });
            req.flash('success', '<div class="alert alert-success "><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Faq Added successfully</div>');
            res.ok();
        }

    },
    privacypolicy: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {

            Privacy_policy.query('SELECT * FROM privacy_policy', function (err, recordset) {
                recordset = recordset[0];
                var text = recordset.description;
                var re = '<br/>';
                var description = text.replace(/\n/gi, re);
                return res.view('./admin/privacypolicy',
                        {
                            layout: false,
                            privacypolicy: recordset,
                            description: description
                        });
            });
        } else {
            return  res.redirect('admin/login');
        }

    },
    editprivacypolicy: function (req, res) {
        if (req.session.admin_id || req.session.admin_id != undefined) {
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
        } else {
            return  res.redirect('admin/login');
        }

    },
    updateprivacypolicy: function (req, res) {

        if (req.method == "POST")
        {
            var selectQuery = "UPDATE privacy_policy SET  description =" + mysql.escape(req.param("description")) + ", name=" + mysql.escape(req.param("title")) + " WHERE `privacy_policy`.`id` =1;";

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




