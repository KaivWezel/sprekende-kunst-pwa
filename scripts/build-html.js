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

function generateHomepage() {
	const html = renderTemplate("./views/index.ejs");
	writeFile("./dist", "index.html", html);
}

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
