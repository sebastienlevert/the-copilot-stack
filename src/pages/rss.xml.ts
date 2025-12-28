import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const episodes = await getCollection('episodes', ({ data }) => !data.draft);

  // Combine and sort all content by date
  const allContent = [
    ...blog.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    ...episodes.map(episode => ({
      title: `Episode ${episode.data.episodeNumber}: ${episode.data.title}`,
      pubDate: episode.data.pubDate,
      description: episode.data.description,
      link: `/episodes/${episode.slug}/`,
      categories: episode.data.tags,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'The Copilot Stack',
    description: 'Your comprehensive resource for Microsoft Copilot extensibility',
    site: context.site || 'https://sebastienlevert.github.io/the-copilot-stack',
    items: allContent,
    customData: `<language>en-us</language>`,
  });
}
