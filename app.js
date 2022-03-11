const express = require("express");
const mongodb = require("./mongodb/mongodb.connect");
const courseRouter = require("./routes/course.routes");
const app = express();

mongodb.connect();

app.use(express.json());

app.use("/courses", courseRouter);

app.use((error, req, res, next) => {
	res.status(500).json({ message: error.message });
});

module.exports = app;
