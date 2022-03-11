const request = require("supertest");
const app = require("../../app");
const newCourse = require("../mock-data/new-course.json");

const endpointUrl = "/courses/";

let firstCourse, newCourseId;
const nonExistingCourseId = "6229e764662cf7c2ddcc53cc";
const testData = {
	title: "Making integration test for PUT",
	desc: "bad course",
};

describe("endpointUrl", () => {
	test("GET " + endpointUrl, async () => {
		const response = await request(app).get(endpointUrl);
		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body[0].title).toBeDefined();
		expect(response.body[0].desc).toBeDefined();
		firstCourse = response.body[0];
	});

	test("GET" + endpointUrl + ":courseId", async () => {
		const response = await request(app).get(endpointUrl + firstCourse._id);
		expect(response.statusCode).toBe(200);
		expect(response.body.title).toBe(firstCourse.title);
		expect(response.body.desc).toBe(firstCourse.desc);
	});
	test("GET Course that doesnt exist" + endpointUrl + ":courseId", async () => {
		const response = await request(app).get(endpointUrl + nonExistingCourseId);
		expect(response.statusCode).toBe(404);
	});

	it("POST" + endpointUrl, async () => {
		const response = await request(app).post(endpointUrl).send(newCourse);
		expect(response.statusCode).toBe(201);
		expect(response.body.title).toBe(newCourse.title);
		expect(response.body.desc).toBe(newCourse.desc);
		newCourseId = response.body._id;
	});
	it(
		"should return error 500 on malformed data with POST" + endpointUrl,
		async () => {
			const response = await request(app)
				.post(endpointUrl)
				.send({ title: "Missing desc property" });
			expect(response.statusCode).toBe(500);
			expect(response.body).toStrictEqual({
				message: "Courses validation failed: desc: Path `desc` is required.",
			});
		},
	);

	it("PUT " + endpointUrl, async () => {
		const response = await request(app)
			.put(endpointUrl + newCourseId)
			.send(testData);
		expect(response.statusCode).toBe(200);
		expect(response.body.title).toBe(testData.title);
		expect(response.body.desc).toBe(testData.desc);
	});
	it("should return 404 on PUT" + endpointUrl, async () => {
		const response = await request(app)
			.put(endpointUrl + nonExistingCourseId)
			.send(testData);
		expect(response.statusCode).toBe(404);
	});

	it("DELETE" + endpointUrl, async () => {
		const response = await request(app)
			.delete(endpointUrl + newCourseId)
			.send();
		expect(response.statusCode).toBe(200);
		expect(response.body.title).toBe(testData.title);
		expect(response.body.desc).toBe(testData.desc);
	});
	it("should return 404 on DELETE", async () => {
		const response = (
			await request(app).delete(endpointUrl + nonExistingCourseId)
		).setEncoding();
		expect(response.statusCode).toBe(404);
	});
});
