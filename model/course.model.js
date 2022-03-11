const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
});

const CourseModel = mongoose.model("Courses", CourseSchema);
module.exports = CourseModel;
