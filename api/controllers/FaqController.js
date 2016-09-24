/**
 * FaqController
 *
 * @description :: Server-side logic for managing faqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'faq': function (req, res) {
        res.view();
    },
    'get_faq': function (req, res) {
        Faq.query('SELECT * FROM faq', function (err, recordset) {
            var category = [];
            recordset.forEach(function (recordset, index) {
                category.push(recordset.category);
            });

            return res.view('./admin/faq', {
                layout: false,
                faq: recordset,
            });

        });
    },
    'get_category': function (req, res) {
        Faq.query('SELECT * FROM faq', function (err, recordset) {
            var category = [];
            recordset.forEach(function (recordset, index) {
                category.push(recordset.category);
            });

            return res.ok({category: category});

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
            var selectQuery = "UPDATE faq SET category='" + req.param("category") + "',  description ='" + req.param("description") + "', name='" + req.param("name") + "' WHERE `faq`.`id` =1;";

            Faq.query(selectQuery, function (err, record)
            {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    res.redirect('/faq');
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
                    console.log(err);
                }
                else
                {
                    res.ok();
                }
            });
        }

    },
};


