import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-porter';
import copy from 'rollup-plugin-cpy';

import { terser } from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	external: ['leaflet'],
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/winnie_2.0.js',
		globals: {
		  leaflet: 'L'
		}
	},
	plugins: [
		svelte({
			// opt in to v3 behaviour today
			skipIntroByDefault: true,
			nestedTransitions: true,

			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/winnie_2.0.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		css({dest: 'public/style.css', minified: true}),
		copy({files: ['node_modules/leaflet-iconlayers/dist/*.png'], dest: 'public'}),
		production && buble({ include: ['src/**', 'node_modules/**'] }),
		//production && terser()
	]
};
