const { Types } = require("mongoose");
const classModel = require("../models/class.model");
const {
  studentModel,
  userModel,
  teacherModel,
} = require("../models/user.model");

class ClassService {
  static getAllClasses = async () => {
    const results = await classModel.find();
    return results;
  };
  static createClass = async (inputClass) => {
    console.log(inputClass);
    const newClass = await classModel.create(inputClass);
    return newClass;
  };
  static getClassById = async (id) => {
    const newClass = await classModel.findById(new Types.ObjectId(id));
    return newClass;
  };

  static getClassByTeacherId = async (teacherId) => {
    const foundUser = await teacherModel.findById(teacherId);
    if (!foundUser) throw new Error("Can't find this teacher's id");

    const classes = await classModel.find({
      teacherId: teacherId,
    });
    return classes;
  };

  static updateClassById = async (classId, className) => {
    if (!className) {
      throw new Error("className không được để trống");
    }

    const updatedClass = await classModel.findByIdAndUpdate(
      classId,
      { name: className },
      { new: true, runValidators: true } // Trả về bản ghi mới sau cập nhật, chạy validators
    );

    if (!updatedClass) {
      throw new Error("Không tìm thấy lớp học với ID đã cho");
    }
    return updatedClass;
  };

  // delete class
  static deleteClass = async (classId) => {
    const deletedClass = await classModel.findByIdAndDelete(classId);
    return deletedClass;
  };
  static addStudentToClassById = async (id, studentID) => {
    // 1.
    const foundClass = await classModel.findById(new Types.ObjectId(id));
    const student = await studentModel.findOne({
      student_id: studentID,
    });
    if (!student) throw new Error("Can't find this student");

    // find if this student already in the class
    const isStudentInTheClass = studentModel.find({ classes: id });
    if (isStudentInTheClass)
      throw new Error("This Student already in the class");
    console.log(student._id);
    // 1. tìm class và add student đó vào:
    foundClass.students.push(student._id);
    foundClass.save();
    // 2. Tìm student và add class id vào
    student.classes.push(foundClass._id);
    student.save();
    return foundClass;
  };
}
module.exports = ClassService;
