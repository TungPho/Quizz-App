const bcrypt = require("bcrypt");
const UserService = require("../services/user.services");
const userModel = require("../models/user.model");
const { generateToken, verifyToken } = require("../utils/tokenHandlers");

const AUTH = {
  AUTHORIZATION: "x-authorization",
};

class UserController {
  // x-client-id
  // x-authorization: access token
  getAllUsers = async (req, res, next) => {
    try {
      const result = await UserService.getAllUser();
      res.status(200).json({
        metadata: result,
        message: "Get all Users Success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // TODO
  // password 0-8 characters
  // 1 speacial Characters
  // 1 Uppercase Chars
  registerUser = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    const foundEmail = await userModel.findOne({ email });
    if (foundEmail) {
      throw new Error("Email has already exist");
    }
    if (password.length < 8) {
      throw new Error("Password Length must be > 8 ");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { username, email, password: hashedPassword, role };
    const user = await UserService.createUser(newUser);
    const accessToken = generateToken({ username, email });
    const refreshToken = generateToken({ username, email });

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
    const accessToken = req.headers[AUTH.AUTHORIZATION];
    if (!accessToken) throw new Error("Not Authorized");
    const foundUser = await userModel.findOne({ email });
    const comparePassword = await bcrypt.compare(password, foundUser.password);
    if (!comparePassword) throw new Error("Wrong password");
    const isVerified = verifyToken({ email }, accessToken);
    if (!isVerified) throw new Error("Not Authorized");

    //TODO: every login time, give the user a new pair of tokens
    return res.status(200).json({
      message: "Login Success",
    });
  };
}

module.exports = new UserController();
