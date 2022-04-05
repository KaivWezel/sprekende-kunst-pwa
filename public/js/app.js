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
	console.log(window.location);
	const path = window.location.pathname;
	const query = window.location.search.replace("?", "");
	if (path === "/results" && query !== "") {
		console.log("het is results");
		const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&q=${query}&s=relevance&ps=20`;
		const response = await fetch(url);
		const data = await response.json();
		console.log(data.artObjects);

		if (data.artObjects.length > 0) {
			renderResults(data.artObjects);
		}
	}
};

const renderResults = async (results) => {
	const resultsList = document.querySelector(".resultsList");
	resultsList.innerHTML = "";
	for (const result of results) {
		console.log(1);
		const card = await createCard(result);
		append(resultsList, card);
	}
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
	card.appendChild(image);
	card.appendChild(title);
	card.appendChild(subtitle);
	card.appendChild(description);

	// Append card to list
	return card;
};

const append = (parent, component) => {
	parent.appendChild(component);
};
