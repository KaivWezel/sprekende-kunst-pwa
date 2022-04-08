export const renderResults = async (results) => {
	const resultsList = document.querySelector(".resultsList");
	resultsList.innerHTML = "";
	for (const result of results) {
		console.log(1);
		const card = await createCard(result);
		append(resultsList, card);
	}
};

export const searchArt = async (path, query) => {
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
