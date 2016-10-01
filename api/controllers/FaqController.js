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
            return res.view('./admin/faq', {
                faq: recordset
            });

        });
    },
    'editfaq': function (req, res) {
        Faq.query('SELECT * FROM faq', function (err, recordset) {
            return res.view('./admin/editfaq', {
                faq: recordset
            });

        });
    },
    'updatefaq': function (req, res) {
        if (req.method == "POST")
        {
            var selectQuery = "UPDATE faq SET  description ='" + req.param("description") + "', name='" + req.param("name") + "' WHERE `faq`.`id` =1;";

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
    }
};


