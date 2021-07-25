const express = require("express");
const router = express.Router();
const {
  usignup,
  usignin,
  usignout,
  ssignup,
  ssignin,
  ssignout,
  tsignin,
  tsignout,
  tsignup
} = require("../controllers/auth");

//USER AUTHENTICATION
router.post("/signup/User", usignup);
router.post("/signin/User", usignin);
router.get("/signout/User", usignout);

//STUDENT AUTHENTICATION
// router.post("/signup/Student", ssignup);
router.post("/signin/Student", ssignin);
router.get("/signout/Student", ssignout);

//TEACHER AUTHENTICATION
// router.post("/signup/Teacher", tsignup);
router.post("/signin/Teacher", tsignin);
router.get("/signout/Teacher", tsignout);

module.exports = router;
