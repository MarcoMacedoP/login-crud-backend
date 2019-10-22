const MongoLib = require("../lib/mongodb");
const bcrypt = require("bcrypt");
class Users {
  constructor() {
    this.mongodb = new MongoLib("users");
  }
  getAll() {
    return this.mongodb.readAll().then(users => {
      return users.map(user => ({...user, password: null}));
    });
  }
  getOneById(userId) {
    return this.mongodb
      .readById(userId)
      .then(user => ({...user, password: null}));
  }
  getOneByEmail(email) {
    return this.mongodb.readOne({email});
  }
  async insertOne(user) {
    const {password, name, email, about} = user;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.mongodb
      .createOne({
        password: hashedPassword,
        name,
        email,
        about
      })
      .then(user => ({...user, password: null}));
  }
  removeOne(userId) {
    return this.mongodb.removeOneById(userId);
  }
  updateOne(userId, newData) {
    return this.mongodb.updateOneById(userId, newData);
  }
}
module.exports = Users;
