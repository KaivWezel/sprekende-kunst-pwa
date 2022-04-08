// rollup config

import copy from "rollup-plugin-copy";

export default {
	input: ["public/js/app.js", "index.js"],
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
	],
};
