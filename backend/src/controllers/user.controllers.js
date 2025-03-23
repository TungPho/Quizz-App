const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const UserService = require("../services/user.services");
const { userModel, studentModel } = require("../models/user.model");
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
    const { email, password, role, user_attributes } = req.body;
    const student_id = req.body.user_attributes.student_id;
    const foundEmail = await userModel.findOne({ email });
    if (foundEmail) {
      throw new Error("Email has already exist");
    }
    if (password.length < 8) {
      throw new Error("Password Length must be > 8 ");
    }
    const foundStudent = await studentModel.find({
      student_id,
    });
    // console.log(student_id.length, foundStudent.length);
    // if (student_id.length < 9 || foundStudent.length > 0) {
    //   throw new Error("Student ID not valid ");
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserServiceFactory.createUser({
      role,
      payload: {
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

  // request reset-password using nodemailer:
  ///////////////////////////////////////////////
  // TEST THIS SHIT
  requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    // mã hóa jwt = SECRET + password gốc (bcrypt) sign như nào giải mã ra sẽ như thế
    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign({ id: user._id, email: user.email }, secret);
    // Put the frontend URL here and compare userid and token from the URL param
    const resetURL = `${process.env.FRONT_END_URL}forgot-password/${user._id}/${token}`;
    // http://localhost:3000/api/v1/users/reset-password/${user._id}/${token}
    console.log(resetURL);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.APP_GMAIL,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL, //ductungpho1005@gmail.com
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetURL}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link sent", link: resetURL });
  };
  //////////////////////////
  resetPassword = async (req, res, next) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const verify = jwt.verify(token, secret);
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    await userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    await user.save();
    res.status(200).json({ message: "Password has been reset" });
  };

  verifyUser = async (req, res, next) => {
    const { userId, token } = req.body;
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }
    // mã hóa token như nào thì giải mã như thế
    const secret = process.env.JWT_SECRET + user.password;
    const verify = jwt.verify(token, secret);
    return res.status(200).json({
      message: "Verify Success",
    });
  };
}

module.exports = new UserController();
