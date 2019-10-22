const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const debug = require("debug")("app:api:auth");
//Services
const UserServices = require("../services/users");
//utils
const {sendGoodResponse} = require("../utils/responses");
const authenticateUser = require("../utils/auth/authenticateUser");
const createBasicAuthHeader = require("../utils/auth/createBasicAuthHeader");

///Login and obtain token
router.post("/login", async (req, res, next) => {
  try {
    const {email, password} = req.body;
    req.headers.authorization = createBasicAuthHeader(
      email,
      password
    );
    await authenticateUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

//Signup and obtain token
router.post("/signup", async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const userServices = new UserServices();
    const user = await userServices.insertOne(req.body);
    if (user) {
      req.headers.authorization = createBasicAuthHeader(
        email,
        password
      );
      await authenticateUser(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

//refresh the token from an existing token
router.post("/token", async (req, res, next) => {
  const {refreshToken} = req.body;
  debug(req.body);

  try {
    const refresh = new RefreshToken();
    const accessToken = await refresh.getAccessTokenFromRefreshToken(
      refreshToken
    );
    sendGoodResponse({
      response: res,
      message: "Token updated succesfully",
      data: {accessToken}
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
