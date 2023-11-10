const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../../data-modals/user");
module.exports = function (req, res, next) {
  passport.use("User", new localStrategy({ usernameField: 'email' }, User.authenticate()));
  // Serialize and deserialize a User in and out of session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    if (user != null) done(null, user);
  });
  next();
};

