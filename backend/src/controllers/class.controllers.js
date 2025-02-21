const classModel = require("../models/class.model");
const ClassService = require("../services/class.services");

class ClassController {
  // admin's function
  getAllClasses = async (req, res, next) => {
    const results = await ClassService.getAllClasses();
    res.status(200).json({
      messaege: "Get all classes success",
      metadata: results,
    });
  };

  getClassById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const results = await ClassService.getClassById(id);
    res.status(200).json({
      messaege: "Get class success",
      metadata: results,
    });
  };

  createClass = async (req, res, next) => {
    const { name, teacherId, students, tests } = req.body;
    const newClass = { name, teacherId, students, tests };
    const result = await ClassService.createClass(newClass);
    res.status(200).json({
      messaege: "Create a new class success",
      metadata: result,
    });
  };
  updateClass = async (req, res, next) => {
    res.status(200).json({
      messaege: "Update class success",
      metadata: {},
    });
  };
  deleteClass = async (req, res, next) => {
    res.status(200).json({
      messaege: "Delete a  class success",
      metadata: {},
    });
  };
}
module.exports = new ClassController();
