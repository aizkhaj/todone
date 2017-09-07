// Where Passport and JWT are implemented for User authentication.
// implemented with aid of:
// https://blog.jscrambler.com/implementing-jwt-using-passport/
require('dotenv').config({path: 'variables.env'});
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/User.js');
const userModel = User.model;
const config = require('./config.js');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

module.exports = () => {
  const strategy = new Strategy(options, (payload, done) => {
    const userPromise = userModel.findById(payload.id).exec();
    userPromise.then(user => {
      if (user) {
        return done(null, {
          id: user.id
        });
      } else {
       return done(new Error("User not found"), null);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", config.jwtSession);
    }
  };
};
