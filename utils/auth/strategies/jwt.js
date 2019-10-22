const passport = require("passport");
const {Strategy, ExtractJwt} = require("passport-jwt");
const config = require("../../../config/");
const boom = require("@hapi/boom");
const UserServices = require("../../../services/users");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, done) {
      const userServices = new UserServices();

      try {
        const user = await userServices.getOneById(tokenPayload.sub);

        if (!user) {
          done(boom.unauthorized(), null);
        }

        return done(null, user);
      } catch (error) {
        done(boom.unauthorized(), null);
      }
    }
  )
);
