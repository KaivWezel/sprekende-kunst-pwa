import { renderResults, searchArt } from "./search.js";
console.log("appje");

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js")
		.then((reg) => {
			console.log("serviceworker registered");
		})
		.catch((err) => {
			console.log(err);
		});
}

const navSearch = document.querySelector("nav form");
const navSearchInput = document.querySelector("nav form input");
const apiKey = "wo727wS7";

navSearch.addEventListener("submit", async (e) => {
	e.preventDefault();
	const query = navSearchInput.value;
	// Redirect to results page
	document.location.href = `/results?${query}`;
});

window.onload = async (e) => {
	const path = window.location.pathname;
	const query = window.location.search.replace("?", "");
	searchArt(path, query);
};

const createCard = async (art) => {
	// Get details for card
	const id = art.id.split("").slice(3).join("");
	const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=${apiKey}`;
	const response = await fetch(url);
	const data = await response.json();
	const details = data.artObject;

	// Create card element
	const card = document.createElement("article");
	card.classList.add("artCard");
	const image = document.createElement("img");
	const textBox = document.createElement("div");
	textBox.classList.add("textBox");
	const title = document.createElement("h3");
	const subtitle = document.createElement("h4");
	const description = document.createElement("p");

	// Assign content to elements
	image.src = art.webImage ? art.webImage.url.slice(0, -3) + "=s1000" : "";

	title.innerText = details.title ? details.title : "Geen titel beschikbaar";

	subtitle.innerText = details.longTitle ? details.longTitle : "";

	description.innerText = details.label.description
		? details.label.description
		: "Geen beschrijving beschikbaar";

	// Append elements to card
	textBox.appendChild(title);
	textBox.appendChild(subtitle);
	textBox.appendChild(description);
	card.appendChild(image);
	card.appendChild(textBox);

	// Append card to list
	return card;
};

const append = (parent, component) => {
	parent.appendChild(component);
};
