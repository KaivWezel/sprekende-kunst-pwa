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

router.get("/artists/:artist", (req, res) => {
	const artist = req.params.artist.replaceAll("-", " ");
	res.render("artist", {
		artist,
	});
});

router.get("/results", async (req, res) => {
	console.log(req.query);
	const query = req.query.q ? req.query.q : "";
	const maker = req.query.involvedMaker ? req.query.involvedMaker : "";
	const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&q=${query}&${maker}&s=relevance&ps=20`;
	console.log(url);
	const data = await fetch(url);
	// console.log(data);
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
