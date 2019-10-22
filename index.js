//Modules
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

//Config
const config = require("./config/");
const app = express();

//Server init
app.listen(config.port, () => {
  console.log("server at port", config.port);
});

//Middlewares---------------------------------
// parse aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());
// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS, PATCH"
  );
  next();
});