const passport = require("passport");
const UserServices = require("../../../services/users");
const Boom = require("@hapi/boom");
const {BasicStrategy} = require("passport-http");
const bcrypt = require("bcrypt");
const debug = require("debug")("app:basic-strategie");
passport.use(
  new BasicStrategy(async (email, password, done) => {
    debug(email, password);
    const userServices = new UserServices();
    const user = await userServices.getOneByEmail(email);
    debug(user);
    if (!user) {
      //bad user
      return done(Boom.unauthorized(), false);
    } else {
      bcrypt.compare(password, user.password, (error, samePass) => {
        if (error || !samePass) {
          return done(Boom.unauthorized(), false);
        }
        //ok
        return done(null, user);
      });
    }
  })
);
