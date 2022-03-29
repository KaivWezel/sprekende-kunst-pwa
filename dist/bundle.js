'use strict';

var express = require('express');
var path = require('path');
var url = require('url');
var fetch = require('node-fetch');
require('dotenv/config');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var path__namespace = /*#__PURE__*/_interopNamespace(path);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

const router = express__default["default"].Router();

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
	console.log(url);
	const response = await fetch__default["default"](url);
	console.log(response);
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
			const data = await fetch__default["default"](url);
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

const app = express__default["default"]();
const port = 3000;
const __dirname$1 = path__namespace.dirname(url.fileURLToPath((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('bundle.js', document.baseURI).href))));

app.set("view engine", "ejs");
app.set("views", path__namespace.join(__dirname$1, "./views"));

app.use(express__default["default"].static(__dirname$1 + "/public"));
app.use(express__default["default"].urlencoded());
app.use("/", router);

app.listen(port, () => {
	console.log(`listening to port ${port}`);
});
