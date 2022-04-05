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
