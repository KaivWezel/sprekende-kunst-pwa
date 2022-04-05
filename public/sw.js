const assets = [
	"/index.html",
	"/",
	"/offline",
	"/artists",
	"/artists/Jheronimus-Bosch",
	"/artists/Johannes-Vermeer",
	"/artists/Piet-Mondriaan",
	"/artists/Rembrandt-van-Rijn",
	"/artists/Vincent-van-Gogh",
	"/js/app.js",
	"/styles/index.css",
	"/img/jheronimusbosch.jpg",
	"/img/johannesvermeer.jpg",
	"/img/pietmondriaan.jpg",
	"/img/rembrandtvanrijn.jpg",
	"/img/vincentvangogh.jpg",
	"https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,300&display=swap",
];

const staticCache = "sprekende-kunst-static-v1";
const dynamicCache = "sprekende-kunst-dynamic-v1";

// intall service wokrer
// Pre-cache app core files
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(staticCache).then((cache) => {
			cache.addAll(assets);
		})
	);
	console.log("serviceworker installed");
});

// Coded with NetNinja https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg
// On activate, delete old caches and replace them with new ones
self.addEventListener("activate", (e) => {
	console.log("activated sw");
	e.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCache && key !== dynamicCache)
					.map((key) => caches.delete(key))
			);
		})
	);
});

// Coded with NetNinja https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg
// Respond with cache if available, if unavailable go to network
self.addEventListener("fetch", (event) => {
	event.respondWith(
		// Zoekt naar of het request in een cache gevonden kan worden
		caches
			.match(event.request)
			.then((cacheRes) => {
				return (
					cacheRes ||
					fetch(event.request).then((fetchRes) => {
						return caches.open(dynamicCache).then((cache) => {
							cache.put(event.request.url, fetchRes.clone());
							return fetchRes;
						});
					})
				);
			})
			.catch(() => caches.match("/offline"))
	);
});
