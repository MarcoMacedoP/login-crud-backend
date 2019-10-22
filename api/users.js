const router = require("express").Router();
const UserServices = require("../services/users");
const {sendGoodResponse} = require("../utils/responses");
const debug = require("debug")("app:users-api");
router.get("/", async function(req, res, next) {
  const userServices = new UserServices();

  try {
    const users = await userServices.getAll();
    sendGoodResponse({
      res,
      message: "get all users",
      statusCode: 200,
      data: users
    });
  } catch (error) {
    next();
  }
});

router.get("/:userId", async function(req, res, next) {
  const userServices = new UserServices();
  const {userId} = req.params;
  try {
    debug(userId);
    const user = await userServices.getOneById(userId);
    sendGoodResponse({
      res,
      message: "get one user",
      statusCode: 200,
      data: user
    });
  } catch (error) {
    next();
  }
});

router.put("/:userId", async function(req, res, next) {
  const userServices = new UserServices();
  const {userId} = req.params;
  const {name, about, email} = req.body;
  try {
    const updatedUser = await userServices.updateOne(userId, {
      name,
      about,
      email
    });
    sendGoodResponse({
      res,
      message: "get all users",
      statusCode: 201,
      data: updatedUser
    });
  } catch (error) {
    next();
  }
});

router.delete("/:userId", async function(req, res, next) {
  const userServices = new UserServices();
  const {userId} = req.params;
  try {
    await userServices.removeOne(userId);
    sendGoodResponse({
      res,
      message: "removed user",
      statusCode: 200
    });
  } catch (error) {
    next();
  }
});

module.exports = router;
