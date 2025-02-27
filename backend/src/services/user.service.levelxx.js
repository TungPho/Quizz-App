const {
  userModel,
  teacherModel,
  studentModel,
} = require("../models/user.model");

class UserServiceFactory {
  static userRegistry = {};
  static registerUserRole = (role, classRef) => {
    this.userRegistry[role] = classRef;
  };
  static async createUser({ role, payload }) {
    // lấy user class tại đây
    const userClass = this.userRegistry[role];
    console.log(userClass);
    if (!userClass) throw new Error(`Invalid Type ${role}`);

    return new userClass(payload).createUser();
  }
}
// tạo class con (teacher, student) trước rồi tạo user chính
class User {
  constructor({ username, email, password, role, classes, user_attributes }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.classes = classes;
    this.user_attributes = user_attributes;
  }
  async createUser(userID) {
    console.log("3");
    const newUser = await userModel.create({ ...this, _id: userID });
    return newUser;
  }
  updateUser = async (userID) => {};
}

class Teacher extends User {
  createUser = async () => {
    const newTeacher = await teacherModel.create({ ...this.user_attributes });
    if (!newTeacher) throw new Error("Error create teacher");
    const newUser = await super.createUser(newTeacher._id);
    if (!newUser) throw new Error("Error create user");
    return newUser;
  };
}

class Student extends User {
  createUser = async () => {
    const newStudent = await studentModel.create({ ...this.user_attributes });
    if (!newStudent) throw new Error("Error create student");
    const newUser = await super.createUser(newStudent._id);

    if (!newStudent) throw new Error("Error create user");
    return newStudent;
  };
}
UserServiceFactory.registerUserRole("teacher", Teacher);
UserServiceFactory.registerUserRole("student", Student);

module.exports = UserServiceFactory;
