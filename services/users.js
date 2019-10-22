const MongoLib = require("../lib/mongodb");

class Users {
  constructor() {
    this.mongodb = new MongoLib("users");
  }
  getAll() {
    return this.mongodb.readAll({});
  }
  getOneById(userId) {
    return this.mongodb.readById(userId);
  }
  getOneByEmail(emial) {
    return this.mongodb.readOne({emial});
  }
  insertOne(user) {
    return this.mongodb.createOne(user);
  }
  removeOne(userId) {
    return this.mongodb.removeOneById(userId);
  }
  updateOne(userId, newData) {
    return this.mongodb.updateOneById(userId, newData);
  }
}
module.exports = Users;
