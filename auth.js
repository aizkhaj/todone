// Where Passport and JWT are implemented for User authentication.
// implemented with aid of:
// https://blog.jscrambler.com/implementing-jwt-using-passport/
require('dotenv').config({path: 'variables.env'});
const passport = require('passport');
const passportJWT = require('passport-jwt');
const userModel = require('./models/User.js');
const config = require('./config.js');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

module.exports = () => {
  const strategy = new Strategy(params, (payload, done) => {
    const userPromise = userModel.model.findById(payload.id).exec();
    console.log(user);
    userPromise.then( user => {})
    if (user) {
      return done(null, {
        id: user.id
      });
    } else {
      return done(new Error("User not found"), null);
    }
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
