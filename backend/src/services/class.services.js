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
}
module.exports = ClassService;
