const passport = require("passport");
const signToken = require("./signToken");
const {sendGoodResponse} = require("../responses");
const Boom = require("@hapi/boom");
const debug = require("debug")("app:debug");

require("./strategies/basic");

function authenticateUser(req, res, next) {
  passport.authenticate("basic", function(error, user) {
    try {
      debug(req.headers);
      if (error) {
        next(error);
        debug(error);
      }
      if (!user) {
        next(Boom.unauthorized());
      } else {
        req.logIn(user, {session: false}, async error => {
          if (error) {
            next(Boom.unauthorized());
          } else {
            const accessToken = signToken({
              sub: user._id,
              email: user.email
            });
            sendGoodResponse({
              res,
              message: "good auth",
              data: {
                user,
                token: {
                  accessToken
                }
              }
            });
          }
        });
      }
    } catch (error) {
      next(Boom.unauthorized());
    }
  })(req, res, next);
}
module.exports = authenticateUser;
