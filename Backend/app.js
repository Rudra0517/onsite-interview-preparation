const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());

const cors = require("cors");
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.MY_PORT,
    credentials: true,
  }),
);

const {
  testController,
  pendingAdminsController,
  pendingAdminStausController,
  loginController,
  verifyEmailController,
  verifyOtpController,
  resetpasswordController,
  adminRegisterController,
  adminUpdateController,
  adminDeleteController,
  allusersController,
  userRegisterController,
  userUpdateController,
  userDeleteController,
  createQuestionController,
  allusersByCourseController,
  allQuestionsController,
  allAdminsController,
  filterQuestions,
  freezeController,
  deleteController,
  filterQuestionsByTypeController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
} = require("./controllers/userControllers");

const authMiddleware = require("./middleware/authMiddleware");
const authorization = require("./middleware/authorization");

app.get("/me", authMiddleware, (req, res) => {
  try {
    res.json({ ...req.user, isLoggedIn: true });
  } catch (error) {
    console.log(error);
    res.send({ isLoggedIn: false });
  }
});
app.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Accont deleted sucessfully" });
});

app.post("/login", loginController);

//! user Register
app.post("/user-register", userRegisterController);
app.put("/user-update", userUpdateController);
app.delete("/user-delete", userDeleteController);

//! admin CRUD apis
app.get("/allusers", authMiddleware, allusersController);
app.post("/admin-register", adminRegisterController);
app.put("/admin-update", adminUpdateController);
app.delete("/admin-delete", adminDeleteController);

//! pending admins
app.get("/pendingadmins", pendingAdminsController);
app.post(
  "/pendingadmins/status",
  authMiddleware,
  authorization("Super Admin"),
  pendingAdminStausController,
);

//! forget password apis
//* verify-email
app.post("/verify-email", verifyEmailController);
//* verify-otp
app.post("/verify-otp", verifyOtpController);
//* resetpasword
app.post("/resetpassword", resetpasswordController);

//! post Q&A apis
app.post("/createQuestion", authMiddleware, createQuestionController);

//! get all the questions and answers from your course
app.get("/allusersbycourse", authMiddleware, allusersByCourseController);

app.get("/allquestions", authMiddleware, allQuestionsController);

app.get(
  "/alladmins",
  authMiddleware,
  authorization("Super Admin"),
  allAdminsController,
);

app.put(
  "/freeze",
  authMiddleware,
  authorization("Super Admin", "Admin"),
  freezeController,
);

app.delete(
  "/delete",
  authMiddleware,
  authorization("Super Admin", "Admin"),
  deleteController,
);

app.post("/filterquestions", filterQuestions);

app.post(
  "/filterquestionsByType",
  authMiddleware,
  filterQuestionsByTypeController,
);
app.post("/getquestion", getQuestionController);

app.put("/updatequestion", updateQuestionController);
app.delete("/deletequestion", deleteQuestionController);

module.exports = app;
