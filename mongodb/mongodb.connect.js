const mongoose = require("mongoose");

const connect = () => {
	try {
		mongoose.connect(
			"<your MONGODB address>",
		);
	} catch (error) {
		console.log(error);
		console.log("error connecting to mongodb");
	}
};

module.exports = { connect };
