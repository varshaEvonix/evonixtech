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
        return res.view('./frontend/termsandconditions', {
            layout: false,
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
        return res.view('./frontend/aboutus', {
            layout: false,
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
        return res.view('./frontend/privacypolicy', {
            layout: false,
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

