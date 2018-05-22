const passport = require("passport");
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// passport config area



// passport.use(new GoogleStrategy({
//   clientID: "client ID here",
//   clientSecret: "client secret here",
//   callbackURL: "/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOne({ googleID: profile.id }, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     if (user) {
//       return done(null, user);
//     }

//     const newUser = new User({
//       googleID: profile.id
//     });

//     newUser.save((err) => {
//       if (err) {
//         return done(err);
//       }
//       done(null, newUser);
//     });
//   });

// }));
  // end passport config area
