// import environment variables
require('dotenv').config({path: 'variables.env'});

module.exports = {
  jwtSecret: process.env.JWTSECRET,
  jwtSession: {
    session: false
  }
};
