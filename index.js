const port = process.env.PORT || 5000
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = requires('cors')
app.use(cors({
	origin: "*"
}))

dotenv.config();

app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB connected!"))
	.catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

//Server Production Assests
if (process.env.NODE_ENV === "production") {
	app.use('/', express.static(path.join("client/build")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

app.listen(port, () => {
	console.log(`Backend server is running in port ${port}`);
});
