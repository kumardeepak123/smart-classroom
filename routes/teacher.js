const express = require("express");
const router = express.Router();
const { teacherIsSignedIn } = require("../controllers/auth");
const {
  getATeacherClass,
  addStudents,
  createPost,
  createLiveLecture,
  addQuiz
} = require("../controllers/teacher");



router.get("/classOfTeacher", teacherIsSignedIn, getATeacherClass);
router.post("/addStudents/:claaroomId", teacherIsSignedIn, addStudents);
router.post("/createPost/:classroomId", teacherIsSignedIn, createPost);
router.post(
  "/create/upcoming/liveLecture/:classroomId",
  teacherIsSignedIn,
  createLiveLecture
);
router.post("/addQuiz/:classroomId", teacherIsSignedIn , addQuiz);

module.exports = router;
