require("dotenv").config();
module.exports = {
  mongoURI: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME,
  //SYSTEM CONFIG
  dev: process.env.NODE_ENV !== "production",
  port: process.env.SERVER_PORT,
  //Auth
  authJwtSecret: process.env.AUTH_JWT_SECRET
};
