//var passport = require('passport'),
//        LocalStrategy = require('passport-local').Strategy,
//        bcrypt = require('bcrypt');
//
//passport.serializeUser(function (user, done) {
//    done(null, user.id);
//});
//
//passport.deserializeUser(function (id, done) {
//    User.findOne({id: id}, function (err, user) {
//        done(err, user);
//    });
//});
//
//passport.use(new LocalStrategy({
//    usernameField: 'email',
//    passwordField: 'password'
//},
//function (email, password, done) {
//
//    User.findOne({email: email}, function (err, user) {
//        if (err) {
//            return done(err);
//        }
//        if (!user) {
//            return done(null, false, {message: 'Incorrect email.'});
//        }
//
//        bcrypt.compare(password, user.password, function (err, res) {
//            if (!res)
//                return done(null, false, {
//                    message: 'Invalid Password'
//                });
//            var returnUser = {
//                email: user.email,
//                createdAt: user.createdAt,
//                id: user.id
//            };
//            return done(null, returnUser, {
//                message: 'Logged In Successfully'
//            });
//        });
//    });
//}
//));
var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;
module.exports = {
    express: {
        customMiddleware: function (app) {
            console.log('Express midleware for passport');
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};