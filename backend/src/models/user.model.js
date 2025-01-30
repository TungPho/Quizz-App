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
    classes: {
      type: [Types.ObjectId],
      default: [],
    },
  },
  {
    timestamp: true,
    collection: COLLECTION_NAME,
  }
);
const userModel = model(DOCUMENT_NAME, UserSchema, COLLECTION_NAME);
module.exports = userModel;
