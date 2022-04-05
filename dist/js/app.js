console.log("appje");

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js")
		.then((reg) => {
			console.log("serviceworker registered", reg);
			console.log("scope:", reg.scope);
		})
		.catch((err) => {
			console.log(err);
		});
}

const navSearch = document.querySelector("nav form");
console.log(navSearch);
navSearch.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("searched");
});
