//Modules
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
//jwt-strategy
require("./utils/auth/strategies/jwt");
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
app.use(
  cors({
    origin: /.*/,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);

//Routes
const usersApiRoute = require("./api/users");
const authApiRoute = require("./api/auth");

app.use("/api/auth", authApiRoute);
app.use(
  "/api/users",
  passport.authenticate("jwt", {session: false}),
  usersApiRoute
);
