const { Types } = require("mongoose");
const classModel = require("../models/class.model");
const { studentModel } = require("../models/user.model");

class ClassService {
  static getAllClasses = async () => {
    const results = await classModel.find();
    return results;
  };
  static createClass = async (inputClass) => {
    const newClass = await classModel.create(inputClass);
    return newClass;
  };
  static getClassById = async (id) => {
    const newClass = await classModel.findById(new Types.ObjectId(id));
    return newClass;
  };
  // delete class

  static addStudentToClassById = async (id, studentID) => {
    const foundClass = await classModel.findById(new Types.ObjectId(id));
    const student = await studentModel.findOne({
      student_id: studentID,
    });
    console.log(student._id);
    foundClass.students.push(student._id);
    foundClass.save();
    return foundClass;
  };
}
module.exports = ClassService;
