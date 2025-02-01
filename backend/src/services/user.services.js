const userModel = require("../models/user.model");

class UserService {
  static getAllUser = async () => {
    const users = await userModel.find();
    return users;
  };
  static createUser = async (user) => {
    const newUser = await userModel.create(user);
    return { newUser };
  };
}
module.exports = UserService;
