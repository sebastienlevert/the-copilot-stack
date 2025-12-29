// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sebastienlevert.github.io',
  base: '/the-copilot-stack',
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      langs: [
        'typescript',
        'javascript',
        'tsx',
        'jsx',
        'json',
        'csharp',
        'xml',
        'yaml',
        'bash',
        'shell',
        'powershell',
        'typespec',
      ],
    },
  },
  output: 'static',
});
