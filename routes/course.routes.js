const express = require("express");
const router = express.Router();

const CourseController = require("../controllers/course.controller");

router.post("/", CourseController.createCourse);
router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourseById);
router.put("/:courseId", CourseController.updateCourse);
router.delete("/:courseId", CourseController.deleteCourse);

module.exports = router;
