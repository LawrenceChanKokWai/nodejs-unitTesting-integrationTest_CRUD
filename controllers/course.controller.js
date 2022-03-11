const CourseModel = require("../model/course.model");

// POST a course to the database
exports.createCourse = async (req, res, next) => {
	try {
		const createdCourse = await CourseModel.create(req.body);
		res.status(201).json(createdCourse);
	} catch (error) {
		next(error);
	}
};

//GET all courses in database
exports.getCourses = async (req, res, next) => {
	try {
		const allCourses = await CourseModel.find({});
		res.status(200).json(allCourses);
	} catch (error) {
		next(error);
	}
};

//GET a course by Id
exports.getCourseById = async (req, res, next) => {
	try {
		const course = await CourseModel.findById(req.params.courseId);
		if (course) {
			res.status(200).json(course);
		} else {
			res.status(404).send();
		}
	} catch (error) {
		next(error);
	}
};

exports.updateCourse = async (req, res, next) => {
	try {
		const updatedCourse = await CourseModel.findByIdAndUpdate(
			req.params.courseId,
			req.body,
			{
				new: true,
				useFindAndModify: false,
			},
		);
		if (updatedCourse) {
			res.status(200).json(updatedCourse);
		} else {
			res.status(404).send();
		}
	} catch (error) {
		next(error);
	}
};

exports.deleteCourse = async (req, res, next) => {
	try {
		const deletedCourse = await CourseModel.findByIdAndDelete(
			req.params.courseId,
		);
		if (deletedCourse) {
			res.status(200).json(deletedCourse);
		} else {
			res.status(404).send();
		}
	} catch (error) {
		next(error);
	}
};
