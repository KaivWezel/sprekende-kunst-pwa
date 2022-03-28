import express from "express";
import ejs from "ejs";
import * as path from "path";
import { fileURLToPath } from "url";
import Router from "./router/Router.js";

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded());
app.use("/", Router);

app.listen(port, () => {
	console.log(`listening to port ${port}`);
});
