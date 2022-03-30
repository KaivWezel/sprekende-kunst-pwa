// rollup config

import copy from "rollup-plugin-copy";

export default {
	input: "index.js",
	output: {
		file: "dist/bundle.js",
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
