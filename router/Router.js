import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "dag kai",
	});
});

router.get("/search", async (req, res) => {
	console.log(req.query);
	const data = await fetch(
		`https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&q=${req.query.q}&s=relevance&ps=20`
	);
	const results = await data.json();
	console.log(results.artObjects);
	res.render("results", {
		results: results.artObjects,
	});
});

router.get("/results", (req, res) => {
	res.render("results");
});

router.get("/detail/:id", (req, res) => {
	res.render("detail");
});

export default router;
