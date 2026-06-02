import { defineConfig, type UserConfig } from 'tsdown';
import Replace from 'unplugin-replace/rolldown';
import * as package2 from './package.json' with { type: 'json' };

const baseOptions: UserConfig = {
	clean: true,
	entry: ['src/**/*.ts'],
	dts: process.env.NODE_ENV !== 'production',
	unbundle: true,
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2021',
	tsconfig: 'src/tsconfig.json',
	plugins: [
		Replace({
			values: [
				{
					find: /\[VI\]{{inject}}\[\/VI\]/,
					replacement: package2.default.version
				}
			]
		})
	],
	treeshake: true
};

export default [
	defineConfig({
		...baseOptions,
		outDir: 'dist/cjs',
		format: 'cjs',
		banner: {
			js: '"use strict";'
		}
	}),
	defineConfig({
		...baseOptions,
		outDir: 'dist/esm',
		format: 'esm'
	})
];
