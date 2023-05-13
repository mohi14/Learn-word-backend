const express = require("express");
const { getAllCourse, addCourse } = require("../controller/courseController");

const router = express.Router();

// gett all courses
router.get("/", getAllCourse);

// upload a course
router.post("/add", addCourse);

module.exports = router;
