// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',

	integrations: [
		{
			name: 'routing',
			hooks: {
				'astro:config:setup': (options) => {
					options.injectRoute({
						pattern: '/hello',
						entrypoint: './src/routes/template.astro'
					})

					options.injectRoute({
						pattern: '/blog/[...slug]',
						entrypoint: './src/routes/template.astro'
					})
				}
			}
		}
	],

	output: 'server',

	adapter: node({
		mode: 'standalone',
	}),
});
