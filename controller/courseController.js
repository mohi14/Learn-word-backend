const Courses = require("../models/Courses");

const addCourse = async (req, res) => {
  try {
    const newCourse = new Courses(req.body);
    await newCourse.save();
    res.status(200).send({
      message: "Course Added Successfully!",
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courses = await Courses.find({});
    res.send(courses);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = { addCourse, getAllCourse };
