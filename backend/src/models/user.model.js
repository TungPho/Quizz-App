const { model, Schema, Types } = require("mongoose");
const COLLECTION_NAME = "Users";
const DOCUMENT_NAME = "User";

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    // xem xet cai nay
    classes: {
      type: [Types.ObjectId],
      default: [],
    },
    user_attributes: {
      type: Object,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school_name: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school_name: {
      type: String,
      required: true,
    },
    student_id: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
const userModel = model(DOCUMENT_NAME, UserSchema, COLLECTION_NAME);
const teacherModel = model("Teachers", TeacherSchema, "Teachers");
const studentModel = model("Students", StudentSchema, "Students");

module.exports = { userModel, teacherModel, studentModel };
