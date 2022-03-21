import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "dag kai",
	});
});

router.get("/search", (req, res) => {
	res.render("search");
});

router.get("/results", (req, res) => {
	res.render("results");
});

router.get("/detail/:id", (req, res) => {
	res.render("detail");
});
export default router;
