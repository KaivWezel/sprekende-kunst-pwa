import * as gulp from "gulp";
const { src, dest } = require("gulp");

(function build() {
	gulp
		.src([
			"./src/images/**/*.*",
			"./src/service-worker.js",
			"./src/manifest.json",
		])
		.pipe(gulp.dest("./dist/"));
})();
