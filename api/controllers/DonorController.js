/**
 * DonorController
 *
 * @description :: Server-side logic for managing Donors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Test Secret Key : sk_test_5gf9zfejnW80X0WZvY7D8p1i
//Test Public Key : pk_test_KdIGs1802FcIkWNJZW1zpd47
//Live Secret Key : sk_live_e5JPUbtIxty2ImsjFc2FOOvq
//Live Publishable Key : pk_live_kBmmjDGhHdevPDoOyfBNMTYi


module.exports = {
    donorpage: function (req, res) {
        var total = 0;
        var query = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id  where student_details.student_id=" + req.param('id') + " AND loan_details.isActive=1";

        Student_details.query(query, function (err, results) {
            var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where student_details.student_id=" + req.param('id') + " AND loan_details.isActive=1";

            Student_details.query(q, function (err, donors_results) {

                donors_results.forEach(function (donors_results, index) {

                    total = donors_results.funded_amount + total;
                })

                var temp = JSON.stringify(donors_results);
                var student_details = JSON.parse(temp)[0];
                var donor_count = donors_results[0].donors_id != null ? donors_results.length : 0;
                var loan_id = results[0].loan_id;

                return res.view('./frontend/donorpage', {layout: false, student_details: student_details, funded_amount: total, donor_count: donor_count, loan_id: loan_id});
            });
        });

    },
    paymentpage: function (req, res) {
        if (req.method == "POST") {
//            try {
//                req.validate({
//                    funding_amount: {required: true},
//                    email_id: {required: true, email: true}
//                });
            var stripe_details = "select *from stripe_web_hooks";

            Stripe_web_hooks.query(stripe_details, function (err, web_hooks) {
                var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where student_details.student_id=" + req.param('student_id') + " AND loan_details.isActive=1";
                Student_details.query(q, function (err, results) {
                    var temp = JSON.stringify(results);
                    var student_details = JSON.parse(temp)[0];
                    var donor_name = 'NULL';
                    var comment = 'NULL';
                    var student_firstname = req.param('student_firstname');
                    var student_lastname = req.param('student_lastname');
                    var stripePubKey = web_hooks[0].test_mode == 1 ? web_hooks[0].test_publishable_key : web_hooks[0].live_publishable_key;
                    var donor_name = req.param('donor_name');
                    comment = req.param('comment');
                    var postdata = req.allParams();

                    return res.view('./frontend/checkout', {layout: false, stripePubKey: stripePubKey, loan_id: req.param('loan_id'), student_details: student_details, postdata: postdata});
//                return res.view('./frontend/checkout', {layout: false, funding_amount: req.param('funding_amount'), email_id: req.param('email_id'), stripePubKey: stripePubKey, donor_name: donor_name, loan_id: req.param('loan_id'), comment: comment, student_details: student_details, student_firstname: student_firstname, student_lastname: student_lastname});
                });
            });
//            } catch (err) {
//                console.log('err')
//                console.log(err)
////                return res.send(400, err);
//            }
        } else {
            res.redirect('/');
        }

    },
    checkout: function (req, res) {

        return res.view('./frontend/checkout', {layout: false});
    },
    thankyoupage: function (req, res) {

        return res.view('./frontend/thankyoupage', {layout: false});
    },
    subscribe: function (req, res) {
        var stripe_details = "select *from stripe_web_hooks";

        Stripe_web_hooks.query(stripe_details, function (err, web_hooks) {
            var stripe_secret_key = web_hooks[0].test_mode == 1 ? web_hooks[0].test_secret_key : web_hooks[0].live_secret_key;
            var stripe = require('stripe')(stripe_secret_key);
            var stripeToken = req.param('stripeToken'),
                    amount = req.param('amount'),
                    email = req.param('email'),
                    loan_id = req.param('loan_id'),
                    donor_name = req.param('donor_name'),
                    student_id = req.param('student_id'),
                    comment = req.param('comment'),
                    student_firstname = req.param('student_firstname'),
                    student_lastname = req.param('student_lastname');
            var transaction_charge = 0.30;
            var percentage_charge = (7.9 / 100) * amount;
            percentage_charge = percentage_charge.toFixed(2);
            var balance_to_transfer = amount - transaction_charge - percentage_charge;
            balance_to_transfer = balance_to_transfer.toFixed(2);
            var last_insert_id = '';

            var q = "INSERT INTO `donors_funding_details` (`loan_id`, `donors_profileimage`, `donors_name`, `donor_email`, `donors_comment`, `funded_amount`, `transaction_charge`, `percentage_charge`, `balance_to_transfer`) VALUES ( '" + loan_id + "', NULL, '" + donor_name + "', '" + email + "', '" + comment + "', '" + amount + "', '" + transaction_charge + "', '" + percentage_charge + "', '" + balance_to_transfer + "')";
            Donors_funding_details.query(q, function (err, results) {
                last_insert_id = results.insertId;
            })
            amount = amount * 100;
            var charge = stripe.charges.create({
                amount: amount, // amount in cents, again
                currency: "usd",
                card: stripeToken,
                description: email
            },
            function (err, charge) {

                if (err && err.type === 'StripeCardError') {

                    res.redirect('donorpage/' + student_id);
                } else {

                    if (charge.status == 'succeeded') {
                        var update_query = "UPDATE `donors_funding_details` SET `status` = '1', transaction_id='" + charge.id + "' WHERE `donors_funding_details`.`donors_id` =" + last_insert_id;
                        Donors_funding_details.query(update_query, function (err, results) {

                            res.redirect('thankyoupage');
                        });

                    }

                }

            });
        });
    },
};

