const passport = require("passport");
const UserServices = require("../../../services/users");
const Boom = require("@hapi/boom");
const {BasicStrategy} = require("passport-http");
const bcrypt = require("bcrypt");

passport.use(
  new BasicStrategy(async (email, password, done) => {
    const userServices = new UserServices();
    const user = await userServices.getOneByEmail(email);
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
