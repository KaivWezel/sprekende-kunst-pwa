import "dotenv/config";

import ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
const fsPromises = fs.promises;
import { fileURLToPath } from "url";
import { dirname } from "path";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const artists = [
	"Rembrandt van Rijn",
	"Johannes Vermeer",
	"Jheronimus Bosch",
	"Piet Mondriaan",
	"Vincent van Gogh",
];

function generateHomepage() {
	const html = renderTemplate("./views/index.ejs");
	writeFile("./dist", "index.html", html);
}

function generateOfflinePage() {
	const html = renderTemplate("./views/offline.ejs");
	writeFile("./dist", "offline.html", html);
}

function generateArtistsPage() {
	const html = renderTemplate("./views/artists.ejs");
	writeFile("./dist", "artists.html", html);
}

async function generateArtistDetailPages() {
	for (const artist of artists) {
		const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.APIKEY}&involvedMaker=${artist}&s=relevance&ps=20`;
		const response = await fetch(url);
		console.log(response);
		const results = await response.json();
		const html = await renderTemplate("./views/artist.ejs", {
			artist,
			results: results.artObjects,
		});
		const fileName = artist.replaceAll(" ", "-");
		writeFile("./dist/artists", `${fileName}.html`, html);
	}
}

function generateResultsPage() {}

function renderTemplate(templatePath, data) {
	const template = fs.readFileSync(templatePath, "utf-8").toString();
	return ejs.render(template, data, {
		views: [path.join(__dirname, "../", "views")],
	});
}

function writeFile(fileDirectory, fileName, content) {
	return fsPromises.mkdir(fileDirectory, { recursive: true }).then(() => {
		return fsPromises.writeFile(path.join(fileDirectory, fileName), content);
	});
}

generateHomepage();
generateOfflinePage();
generateArtistsPage();
generateArtistDetailPages();
