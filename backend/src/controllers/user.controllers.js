const bcrypt = require("bcrypt");
const UserService = require("../services/user.services");
const { userModel } = require("../models/user.model");
const { generateToken, verifyToken } = require("../utils/tokenHandlers");
const UserServiceFactory = require("../services/user.service.levelxx");

const AUTH = {
  AUTHORIZATION: "x-authorization",
};

class UserController {
  // x-client-id
  // x-authorization: access token
  // x-api-key
  getAllUsers = async (req, res, next) => {
    const result = await UserService.getAllUser();
    res.status(200).json({
      metadata: result,
      message: "Get all Users Success",
    });
  };
  // TODO
  // password 0-8 characters
  // 1 speacial Characters
  // 1 Uppercase Chars
  registerUser = async (req, res, next) => {
    const { username, email, password, role, user_attributes } = req.body;
    const foundEmail = await userModel.findOne({ email });
    if (foundEmail) {
      throw new Error("Email has already exist");
    }
    if (password.length < 8) {
      throw new Error("Password Length must be > 8 ");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserServiceFactory.createUser({
      role,
      payload: {
        username,
        email,
        password: hashedPassword,
        role,
        user_attributes,
      },
    });
    const accessToken = generateToken({ email });
    const refreshToken = generateToken({ email });

    // remember to save refreshToken to the DB
    // take the accesst token and save it to the local storage
    res.status(200).json({
      metadata: user,
      message: "Create a user success",
      AT: accessToken,
    });
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ email });
    const comparePassword = await bcrypt.compare(password, foundUser.password);
    if (!comparePassword) throw new Error("Wrong password");
    //TODO: every login time, give the user a new pair of tokens
    const accessToken = generateToken({ email });
    return res.status(200).json({
      message: "Login Success",
      AT: accessToken,
      role: foundUser.role,
      id: foundUser._id,
    });
  };
}

module.exports = new UserController();
