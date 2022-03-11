const CourseController = require("../../controllers/course.controller");
const CourseModel = require("../../model/course.model");
const httpMocks = require("node-mocks-http");
const newCourse = require("../mock-data/new-course.json");
const allCourses = require("../mock-data/all-courses.json");

CourseModel.create = jest.fn();
CourseModel.find = jest.fn();
CourseModel.findById = jest.fn();
CourseModel.findByIdAndUpdate = jest.fn();
CourseModel.findByIdAndDelete = jest.fn();

let req, res, next;
const courseId = '"6229e3df34187650cdc9ed67"';

beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	next = jest.fn();
});

describe("CourseController.deleteCourse", () => {
	it("should have a deleteCourse function", () => {
		expect(typeof CourseController.deleteCourse).toBe("function");
	});
	it("should delete with CourseModel.findByIdAndDelete", async () => {
		req.params.courseId = courseId;
		await CourseController.deleteCourse(req, res, next);
		expect(CourseModel.findByIdAndDelete).toHaveBeenCalledWith(courseId);
	});
	it("should return 200 and deleted CourseModel", async () => {
		CourseModel.findByIdAndDelete.mockReturnValue(newCourse);
		await CourseController.deleteCourse(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._getJSONData()).toStrictEqual(newCourse);
		expect(res._isEndCalled()).toBeTruthy();
	});
	it("should handle errors", async () => {
		const errorMessage = { message: "Error deleting course" };
		const rejectedPromise = Promise.reject(errorMessage);
		CourseModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
		await CourseController.deleteCourse(req, res, next);
		expect(next).toHaveBeenCalledWith(errorMessage);
	});
	it("return 404 when item doesnt exist", async () => {
		CourseModel.findByIdAndDelete.mockReturnValue(null);
		await CourseController.deleteCourse(req, res, next);
		expect(res.statusCode).toBe(404);
	});
});

describe("CourseController.updateCourse", () => {
	it("should have a updateCourse function", () => {
		expect(typeof CourseController.updateCourse).toBe("function");
	});
	it("should update with CourseModel.findByIdAndUpdate", async () => {
		req.params.courseId = courseId;
		req.body = newCourse;
		await CourseController.updateCourse(req, res, next);
		// CourseModel.findByIdAndUpdate(courseId, newCourse, {
		// 	new: true,
		// 	useFindAndModify: false,
		// });
		expect(CourseModel.findByIdAndUpdate).toHaveBeenCalledWith(
			courseId,
			newCourse,
			{ new: true, useFindAndModify: false },
		);
	});
	it("should should return response with json data and status code of 200", async () => {
		req.params.courseId = courseId;
		req.body = newCourse;
		CourseModel.findByIdAndUpdate.mockReturnValue(newCourse);
		await CourseController.updateCourse(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(newCourse);
	});
	it("should handle errors", async () => {
		const errorMessage = { message: "Error" };
		const rejectedPromise = Promise.reject(errorMessage);
		CourseModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
		await CourseController.updateCourse(req, res, next);
		expect(next).toHaveBeenCalledWith(errorMessage);
	});
	it("should return 404 when item doesnt exist", async () => {
		CourseModel.findByIdAndUpdate.mockReturnValue(null);
		await CourseController.updateCourse(req, res, next);
		expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
	});
});

describe("CourseController.getCourseById", () => {
	it("should have a getCourseById function", () => {
		expect(typeof CourseController.getCourseById).toBe("function");
	});
	it("should call CourseModel.findById with route parameters", async () => {
		req.params.courseId = courseId;
		await CourseController.getCourseById(req, res, next);
		expect(CourseModel.findById).toBeCalledWith(courseId);
	});
	it("should return status code 200 and json body ", async () => {
		CourseModel.findById.mockReturnValue(newCourse);
		await CourseController.getCourseById(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(newCourse);
	});
	it("should do error handling", async () => {
		const errorMessage = { message: "error finding course" };
		const rejectedPromise = Promise.reject(errorMessage);
		CourseModel.findById.mockReturnValue(rejectedPromise);
		await CourseController.getCourseById(req, res, next);
		expect(next).toHaveBeenCalledWith(errorMessage);
	});
	it("should return status code 404 when item doesnt exist", async () => {
		CourseModel.findById.mockReturnValue(null);
		await CourseController.getCourseById(req, res, next);
		expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
	});
});

describe("CourseController.getCourses", () => {
	it("should have a getCourses function", () => {
		expect(typeof CourseController.getCourses).toBe("function");
	});
	it("should call CourseModel.find({})", async () => {
		await CourseController.getCourses(req, res, next);
		expect(CourseModel.find).toBeCalledWith({});
	});
	it("should return status code 200 and all courses", async () => {
		CourseModel.find.mockReturnValue(allCourses);
		await CourseController.getCourses(req, res, next);
		expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(allCourses);
	});
	it("should handle error in getCourses", async () => {
		const errorMessage = { message: "error finding" };
		const rejectedPromise = Promise.reject(errorMessage);
		CourseModel.find.mockReturnValue(rejectedPromise);
		await CourseController.getCourses(req, res, next);
		expect(next).toHaveBeenCalledWith(errorMessage);
	});
});

describe("CourseController.createCourse", () => {
	beforeEach(() => {
		req.body = newCourse;
	});
	it("should have createCourse function", () => {
		expect(typeof CourseController.createCourse).toBe("function");
	});
	it("should call CourseModel.create", () => {
		CourseController.createCourse(req, res, next);
		expect(CourseModel.create).toBeCalled();
	});
	it("should call CourseModel.create With request body", async () => {
		await CourseController.createCourse(req, res, next);
		expect(CourseModel.create).toBeCalledWith(newCourse);
	});
	it("should return status code 201 response", async () => {
		await CourseController.createCourse(req, res, next);
		expect(res.statusCode).toBe(201);
	});
	it("should verify send response", async () => {
		await CourseController.createCourse(req, res, next);
		expect(res._isEndCalled()).toBeTruthy();
	});
	it("should send json response ", async () => {
		CourseModel.create.mockReturnValue(newCourse);
		await CourseController.createCourse(req, res, next);
		expect(res._getJSONData()).toStrictEqual(newCourse);
	});
	it("should handle errors", async () => {
		const errorMessage = { message: "Property field missing!" };
		const rejectedPromise = Promise.reject(errorMessage);
		CourseModel.create.mockReturnValue(rejectedPromise);
		await CourseController.createCourse(req, res, next);
		expect(next).toBeCalledWith(errorMessage);
	});
});
