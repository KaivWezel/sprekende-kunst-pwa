const express = require("express");
const hbs = require("handlebars");
const path = require("path");
const app = express();
const port = 3030;

app.set("view engine", "hbs");
app.use(express.static("public"));

app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

app.get("/", (req, res) => {
	res.render("index", {
		title: "Dag Kai",
	});
});
