// rollup config
import htmlMinifier from "rollup-plugin-html-minifier";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";

export default {
	input: ["public/js/app.js", "index.js", "public/styles/index.css"],
	output: {
		dir: "dist/bundles",
		format: "cjs",
	},
	plugins: [
		copy({
			targets: [
				{
					src: ["public/styles", "public/img", "public/js", "public/sw.js"],
					dest: "dist",
				},
			],
		}),
		css({
			ouput: "bundle.css",
		}),
	],
};
