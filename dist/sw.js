const staticCache = "sprekende-kunst-v3";
const dynamicCache = "sprekende-kunst-dynamic";

const addToCache = async (resources) => {
	const cache = await caches.open(staticCache);
	await cache.addAll(resources);
};

const assets = [
	"/",
	"/index.html",
	"/artists.html",
	"/artists/Jheronimus-Bosch.html",
	"/artists/Johannes-Vermeer.html",
	"/artists/Piet-Mondriaan.html",
	"/artists/Rembrandt-van-Rijn.html",
	"/artists/Vincent-van-Gogh.html",
	"/js/app.js",
	"/styles/index.css",
	"/img/jheronimusbosch.jpg",
	"/img/johannesvermeer.jpg",
	"/img/pietmondriaan.jpg",
	"/img/rembrandtvanrijn.jpg",
	"/img/vincentvangogh.jpg",
	"https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,300&display=swap",
];

// intall service wokrer
self.addEventListener("install", (e) => {
	e.waitUntil(addToCache(assets));
	console.log("serviceworker installed");
});

// Coded with NetNinja https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg
self.addEventListener("activate", (e) => {
	console.log("activated sw");
	e.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCache)
					.map((key) => caches.delete(key))
			);
		})
	);
});

// Coded with NetNinja https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg
self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(e.request).then((res) => {
					return caches.open(dynamicCache).then((cache) => {
						cache.put(e.request.url, res.clone());
						return res;
					});
				})
			);
		})
	);
});
