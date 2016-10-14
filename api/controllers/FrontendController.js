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
                    layout: false,
                    faq: recordset,
                    category: category,
                });

            });
        });
    },
    'termsandconditions': function (req, res) {
        Abterms.query('SELECT * FROM abterms', function (err, recordset) {
            recordset = recordset[0];
            var text = recordset.description;
            var re = '<br/>';
            var description = text.replace(/\n/gi, re);
            return res.view('./frontend/termsandconditions', {
                layout: false,
                recordset: recordset,
                description: description
            });
        });
//        Faq.query('SELECT * from faq', function (err, recordset) {
//            Faq.query("SELECT DISTINCT category FROM faq", function (err, cats) {
//                var category = [];
//                cats.forEach(function (cats, index) {
//                    category.push(cats.category);
//                });
//                return res.view('./frontend/faq', {
//                    faq: recordset,
//                    category: category,
//                });
//
//            });
//        });
    },
    'aboutus': function (req, res) {
        About_admin.query('SELECT * FROM about_admin', function (err, recordset) {
            recordset = recordset[0];
            var text = recordset.about_us;
            var re = '<br/>';
            var description = text.replace(/\n/gi, re);
            return res.view('./frontend/aboutus', {
                layout: false,
                recordset: recordset,
                description: description
            });
        });
//        Faq.query('SELECT * from faq', function (err, recordset) {
//            Faq.query("SELECT DISTINCT category FROM faq", function (err, cats) {
//                var category = [];
//                cats.forEach(function (cats, index) {
//                    category.push(cats.category);
//                });
//                return res.view('./frontend/faq', {
//                    faq: recordset,
//                    category: category,
//                });
//
//            });
//        });
    },
    'privacypolicy': function (req, res) {
        Privacy_policy.query('SELECT * FROM privacy_policy', function (err, recordset) {
            recordset = recordset[0];
            var text = recordset.description;
            var re = '<br/>';
            var description = text.replace(/\n/gi, re);
            return res.view('./frontend/privacypolicy', {
                layout: false,
                recordset: recordset,
                description: description
            });
        });
//        Faq.query('SELECT * from faq', function (err, recordset) {
//            Faq.query("SELECT DISTINCT category FROM faq", function (err, cats) {
//                var category = [];
//                cats.forEach(function (cats, index) {
//                    category.push(cats.category);
//                });
//                return res.view('./frontend/faq', {
//                    faq: recordset,
//                    category: category,
//                });
//
//            });
//        });
    },
};

