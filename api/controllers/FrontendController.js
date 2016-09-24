/**
 * MyprofileController
 *
 * @description :: Server-side logic for managing myprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'fetch_faq': function (req, res) {
        Faq.query('SELECT * from faq', function (err, recordset) {
            Faq.query("SELECT DISTINCT category FROM faq", function (err, cats) {
                var category = [];
                cats.forEach(function (cats, index) {
                    category.push(cats.category);
                });
                return res.view('./frontend/faq', {
                    faq: recordset,
                    category: category,
                });

            });
        });
    }
};

