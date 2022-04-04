// intall service wokrer
self.addEventListener("install", (event) => {
	event.waitUntil(
		addToCache([
			"/styles/index.css",
			"/js/app.js",
			"/img/icons",
			"index.html",
			"artists.html",
		])
	);
	console.log("serviceworker installed");
});

self.addEventListener("activate", () => {
	console.log("activated");
});

self.addEventListener("fetch", (evt) => {
	console.log("fetch", evt);
});

const addToCache = async (resources) => {
	const cache = await caches.open("sprekende-kunst");
	await cache.addAll(resources);
};
