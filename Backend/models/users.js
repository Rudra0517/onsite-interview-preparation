const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    gender: String,
    course: String,
    role: String,
    OTP: String,
    adminname: String,
    isBlocked: Boolean,
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);
const pendingAdminModel = mongoose.model("pending_admins", userSchema);

const postSchema = new mongoose.Schema({
  question: String,
  answer: String,
  questionType: String,
  subject: String,
  course: String,
  role: String,
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  location: String,
  companyType: String,
});

const postModel = mongoose.model("posts", postSchema);

module.exports = { userModel, pendingAdminModel, postModel };
