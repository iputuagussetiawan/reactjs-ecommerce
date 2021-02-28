require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
	fileupload({
		useTempFiles: true,
	})
);

//Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));

//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
	URI,
	{
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log("Connect To Mongo DB :)");
	}
);

// app.get("/", (req, res) => {
// 	res.json({ msg: "Welcome To My First Ecommerce Project" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server is Running on Port", PORT);
});
