const passport = require("passport");
const signToken = require("./signToken");
const {sendGoodResponse} = require("../responses");
const Boom = require("@hapi/boom");

require("./strategies/basic");

function authenticateUser(req, res, next) {
  passport.authenticate("basic", function(error, user) {
    try {
      if (error) {
        next(error);
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
              response: res,
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
