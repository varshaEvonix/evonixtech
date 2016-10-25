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
        var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id  where student_details.student_id=" + req.param('id') + " AND loan_details.isActive=1";
        Student_details.query(q, function (err, results) {
            var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where student_details.student_id=" + req.param('id') + " AND loan_details.isActive=1";
            Student_details.query(q, function (err, donors_results) {
                var funded_amount = 0;
                results.forEach(function (donors_results, index) {
                    funded_amount = donors_results.funded_amount + funded_amount;
                })

                var temp = JSON.stringify(donors_results);
                var student_details = JSON.parse(temp)[0];
                var donor_count = donors_results.length;
                var loan_id = results[0].loan_id;

                return res.view('./frontend/donorpage', {layout: false, student_details: student_details, funded_amount: funded_amount, donor_count: donor_count, loan_id: loan_id});
            });
        });

    },
    paymentpage: function (req, res) {
        if (req.method == "POST") {
            var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where student_details.student_id=" + req.param('student_id') + " AND loan_details.isActive=1";
            Student_details.query(q, function (err, results) {
                var temp = JSON.stringify(results);
                var student_details = JSON.parse(temp)[0];
                var donor_name = 'NULL';
                var comment = 'NULL';
                var student_firstname = req.param('student_firstname');
                var student_lastname = req.param('student_lastname');
                var stripePubKey = 'pk_test_KdIGs1802FcIkWNJZW1zpd47';

                var donor_name = req.param('donor_name');
                comment = req.param('comment');
                return res.view('./frontend/checkout', {layout: false, funding_amount: req.param('funding_amount'), email_id: req.param('email_id'), stripePubKey: stripePubKey, donor_name: donor_name, loan_id: req.param('loan_id'), comment: comment, student_details: student_details, student_firstname: student_firstname, student_lastname: student_lastname});
            });
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

        var stripeToken = req.param('stripeToken'),
                amount = req.param('amount'),
                email = req.param('email'),
                loan_id = req.param('loan_id'),
                donor_name = req.param('donor_name'),
                student_id = req.param('student_id'),
                comment = req.param('comment'),
                student_firstname = req.param('student_firstname'),
                student_lastname = req.param('student_lastname');

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
                var q = "INSERT INTO `donors_funding_details` (`loan_id`, `donors_profileimage`, `donors_name`, `donor_email`, `donors_comment`, `funded_amount`, `transaction_charge`, `percentage_charge`, `balance_to_transfer`, `amount_to_be_transferred`,`stripe_token`) VALUES ( '" + loan_id + "', NULL, '" + donor_name + "', '" + email + "', '" + comment + "', '" + amount + "', '80', '10', '90', '900','" + stripeToken + "')";
                console.log(q)
                Donors_funding_details.query(q, function (err, results) {
//                    var q = "select * from student_details left join loan_details on student_details.student_id=loan_details.student_id left join donors_funding_details on donors_funding_details.loan_id=loan_details.loan_id where student_details.student_id=" + student_id + " AND loan_details.isActive=1";
//                    console.log(q);
//                    console.log(student_id);
//                    Student_details.query(q, function (err, stude_results) {
//                        var temp = JSON.stringify(stude_results);
//                        var student_details = JSON.parse(temp)[0];
//                        console.log(student_details);


                })
                res.redirect('thankyoupage');
//                res.redirect('thankyoupage', {student_firstname: student_firstname, student_lastname: student_lastname
//                });

            }
            console.log('Charged');
        });

    },
};

