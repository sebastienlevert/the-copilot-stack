import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  const episodes = await getCollection('episodes', ({ data }) => !data.draft);

  // Get all unique tags
  const allTags = new Set<string>();
  blogPosts.forEach((post) => post.data.tags.forEach((tag) => allTags.add(tag)));
  episodes.forEach((episode) => episode.data.tags.forEach((tag) => allTags.add(tag)));

  // Sort by date to get latest
  const latestBlogPosts = [...blogPosts]
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 5);

  const latestEpisodes = [...episodes]
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 3);

  const baseUrl = site?.toString().replace(/\/$/, '') || 'https://sebastienlevert.github.io/the-copilot-stack';
  const today = new Date().toISOString().split('T')[0];

  const content = `# The Copilot Stack

> A comprehensive resource for Microsoft Copilot extensibility, covering plugins, declarative agents, authentication patterns, and best practices for building AI-powered experiences.

## About This Site

The Copilot Stack is a content platform dedicated to helping developers build extensions and integrations for Microsoft 365 Copilot. The site features technical blog posts, video episodes, podcast content, and comprehensive guides.

**Author**: Sébastien Levert - Principal Product Manager at Microsoft, working on the Microsoft 365 Copilot Extensibility team.

**Site URL**: ${baseUrl}

## Site Statistics

- **Blog Posts**: ${blogPosts.length}
- **Episodes**: ${episodes.length}
- **Total Pages**: ${blogPosts.length + episodes.length + allTags.size + 5} (including tag pages and static pages)
- **Topics Covered**: ${allTags.size} unique tags
- **Last Updated**: ${today}

## Site Structure

### Main Sections

- **Home** (\`/\`): Featured content, latest blog posts, and recent episodes
- **Blog** (\`/blog\`): In-depth technical articles on Copilot extensibility
- **Episodes** (\`/episodes\`): Video and podcast episodes with show notes
- **About** (\`/about\`): Information about the site and its purpose

### Content Organization

- **Tags** (\`/tags/[tag]\`): Content filtered by topic
- **Authors** (\`/authors/[author]\`): Content by specific authors
- **RSS Feed** (\`/rss.xml\`): Syndicated content feed

## Latest Content

### Recent Blog Posts
${latestBlogPosts.map(post => `- [${post.data.title}](${baseUrl}/blog/${post.slug}) - ${post.data.pubDate.toISOString().split('T')[0]}`).join('\n')}

### Recent Episodes
${latestEpisodes.map(episode => `- [Episode ${episode.data.episodeNumber}: ${episode.data.title}](${baseUrl}/episodes/${episode.slug}) - ${episode.data.pubDate.toISOString().split('T')[0]}`).join('\n')}

## Key Topics Covered

${Array.from(allTags).sort().map(tag => `- ${tag}`).join('\n')}

## Content Format

All content is written in Markdown/MDX with:
- Comprehensive code examples (TypeScript, C#, JSON, XML, TypeSpec)
- Mermaid diagrams for architecture visualization
- Admonitions for important notes, warnings, and tips
- Line-numbered code blocks with syntax highlighting
- Links to official Microsoft documentation and resources

## For LLM Assistants

When referencing this site:
- All content is educational and technical in nature
- Code examples are meant to be used as learning references
- Authentication patterns should be implemented with proper security considerations
- The site focuses on Microsoft 365 Copilot extensibility specifically
- Content is regularly updated with latest best practices and features

## Search

The site includes full-text search powered by Pagefind, covering all blog posts, episodes, and static pages.

## Sitemap

Complete sitemap available at: ${baseUrl}/sitemap-index.xml

## Contact & Social

- GitHub: https://github.com/sebastienlevert
- Twitter: https://twitter.com/sebastienlevert
- LinkedIn: https://www.linkedin.com/in/sebastienlevert/
- Website: https://www.sebastienlevert.com/

## License & Usage

Content is provided for educational purposes. Please attribute when using code examples or referencing architectural patterns from this site.

---

Last updated: ${today}
Version: 1.0 (Generated dynamically)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
