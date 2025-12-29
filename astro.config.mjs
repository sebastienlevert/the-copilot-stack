// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { remarkAdmonitions } from './src/utils/remarkAdmonitions.mjs';
import { customTransformers } from './src/utils/codeTransformers.mjs';
import { rehypeMermaid } from './src/utils/rehypeMermaid.mjs';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://sebastienlevert.github.io/the-copilot-stack',
  base: process.env.BASE_PATH || '/the-copilot-stack',
  integrations: [
    mdx({
      extendMarkdownConfig: true,
    }),
    tailwind(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkAdmonitions],
    rehypePlugins: [rehypeMermaid],
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
        'mermaid',
      ],
      transformers: customTransformers(),
    },
  },
  output: 'static',
});
