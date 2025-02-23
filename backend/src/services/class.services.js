const { Types } = require("mongoose");
const classModel = require("../models/class.model");

class ClassService {
  static getAllClasses = async () => {
    const results = await classModel.find();
    console.log(results);
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
    foundClass.students.push(new Types.ObjectId(studentID));
    foundClass.save();
    return foundClass;
  };
}
module.exports = ClassService;
