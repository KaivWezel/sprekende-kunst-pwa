import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "dag kai",
	});
});

router.get("/artists", (req, res) => {
	res.render("artists");
});

router.get("/results", async (req, res) => {
	console.log(req.query);
	const data = await fetch(
		`https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&q=${req.query}&s=relevance&ps=20`
	);
	const results = await data.json();
	res.render("results", {
		results: results.artObjects,
		query: req.query.q,
		count: results.artObjects.length,
	});
});

router.get("/detail/:id", (req, res) => {
	res.render("detail");
});

export default router;
