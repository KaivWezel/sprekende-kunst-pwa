"use strict";

const renderResults = async (results) => {
	const resultsList = document.querySelector(".resultsList");
	resultsList.innerHTML = "";
	for (const result of results) {
		const card = await createCard(result);
		append(resultsList, card);
	}
};

const searchArt = async (path, query) => {
	if (path === "/results" && query !== "") {
		const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&q=${query}&s=relevance&ps=20`;
		const response = await fetch(url);
		const data = await response.json();
		console.log(data.artObjects);

		if (data.artObjects.length > 0) {
			renderResults(data.artObjects);
		}
	}
};

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
