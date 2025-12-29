// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { remarkAdmonitions } from './src/utils/remarkAdmonitions.mjs';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
} from '@shikijs/transformers';

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
    remarkPlugins: [remarkAdmonitions],
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
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        {
          name: 'line-numbers',
          line(node) {
            node.properties.className = node.properties.className || [];
            if (!node.properties.className.includes('line')) {
              node.properties.className.push('line');
            }
          },
        },
      ],
    },
  },
  output: 'static',
});
