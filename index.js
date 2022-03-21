const express = require("express");
const path = require("path");
const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

app.get("/", (req, res) => {
	res.send("Hello world");
});
