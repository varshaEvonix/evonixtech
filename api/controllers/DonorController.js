/**
 * DonorController
 *
 * @description :: Server-side logic for managing Donors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Test Secret Key : sk_test_5gf9zfejnW80X0WZvY7D8p1i
//Test Public Key : pk_test_KdIGs1802FcIkWNJZW1zpd47
//Live Secret Key : sk_test_5gf9zfejnW80X0WZvY7D8p1i
//Live Publishable Key : pk_test_KdIGs1802FcIkWNJZW1zpd47
stripe = require('stripe')('sk_test_5gf9zfejnW80X0WZvY7D8p1i');

module.exports = {
    donorpage: function (req, res) {
        var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where student_details.student_id=" + req.param('id') + " AND loan_details.isActive=1";
        Student_details.query(q, function (err, results) {
            var funded_amount = 0;
            results.forEach(function (results, index) {
                funded_amount = results.funded_amount + funded_amount;
            })

            var temp = JSON.stringify(results);
            var student_details = JSON.parse(temp)[0];
            var donor_count = results.length;

            return res.view('./frontend/donorpage', {layout: false, student_details: student_details, funded_amount: funded_amount, donor_count: donor_count});
        });

    },
    paymentpage: function (req, res) {

        var donor_name = 'NULL';
        var stripePubKey = 'pk_test_KdIGs1802FcIkWNJZW1zpd47';

        var donor_name = req.param('donor_name');
        var comment = req.param('comment');
        return res.view('./frontend/checkout', {layout: false, funding_amount: req.param('funding_amount'), email_id: req.param('email_id'), stripePubKey: stripePubKey, donor_name: donor_name, loan_id: req.param('loan_id'), comment: comment});

    },
    checkout: function (req, res) {

        return res.view('./frontend/checkout', {layout: false});
    },
    thankyoupage: function (req, res) {

        return res.view('./frontend/thankyoupage', {layout: false});
    },
    subscribe: function (req, res) {

        var stripeToken = req.param('stripeToken'),
                amount = req.param('amount'),
                email = req.param('email'),
                loan_id = req.param('loan_id'),
                donor_name = req.param('donor_name'),
                comment = req.param('comment');

        var charge = stripe.charges.create({
            amount: amount, // amount in cents, again
            currency: "usd",
            card: stripeToken,
            description: email
        },
        function (err, charge) {
            if (err && err.type === 'StripeCardError') {
                console.log('The card has been declined');
            } else {
                var q = "INSERT INTO `stumuch_db`.`donors_funding_details` (`loan_id`, `donors_profileimage`, `donors_name`, `donor_email`, `donors_comment`, `funded_amount`, `transaction_charge`, `percentage_charge`, `balance_to_transfer`, `amount_to_be_transferred`) VALUES ( '" + loan_id + "', NULL, '" + donor_name + "', '" + email + "', '" + comment + "', '" + amount + "', '80', '10', '90', '900')";
                console.log(q);
                Donors_funding_details.query(q, function (err, results) {

                })
                res.redirect('thankyoupage');
            }
            console.log('Charged');
        });

    },
};

