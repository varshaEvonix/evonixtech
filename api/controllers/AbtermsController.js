/**
 * AbtermsController
 *
 * @description :: Server-side logic for managing abterms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'abterms': function (req, res) {
        res.view();
    },
    'get_terms_and_cond': function (req, res) {
        Abterms.query('SELECT * FROM abterms', function (err, recordset) {
            console.log(recordset);
            return res.view('./admin/abterms', {
                abterms: recordset
            });


        });

    },
    'edit_terms_and_cond': function (req, res) {
        Abterms.query('SELECT * FROM abterms', function (err, recordset) {

            return res.view('./admin/editabterms', {
                abterms: recordset
            });
        });
    },
    'updateterms': function (req, res) {

        if (req.method == "POST")
        {
            var selectQuery = "UPDATE abterms SET  description ='" + req.param("description") + "', name='" + req.param("title") + "' WHERE `abterms`.`id` =1;";

            Abterms.query(selectQuery, function (err, record)
            {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    res.redirect('/abterms');
                }
            });
        }

    }

};
