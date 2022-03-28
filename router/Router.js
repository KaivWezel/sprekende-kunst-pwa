import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/artists", (req, res) => {
	res.render("artists");
});

router.get("/artists/:artist", async (req, res) => {
	const artist = req.params.artist.replaceAll("-", " ");
	console.log(artist);
	const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&involvedMaker=${artist}&s=relevance&ps=20`;
	const response = await fetch(url);
	const results = await response.json();
	console.log(results.artObjects.webImage);

	res.render("artist", {
		artist,
		results: results.artObjects,
	});
});

router.get("/results", async (req, res) => {
	console.log(req.query);
	if (Object.keys(req.query).length === 0) {
		console.log("no query");
		res.render("results", {
			page: undefined,
		});
	} else {
		try {
			const query = req.query.q ? req.query.q : "";
			const maker = req.query.involvedMaker
				? "&" + req.query.involvedMaker
				: "";
			const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&q=${query}${maker}&s=relevance&ps=20`;
			const data = await fetch(url);
			const results = await data.json();
			res.render("results", {
				page: {
					results: results.artObjects,
					query: req.query.q,
					count: results.artObjects.length,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}
});

router.get("/detail/:id", (req, res) => {
	res.render("detail");
});

export default router;
