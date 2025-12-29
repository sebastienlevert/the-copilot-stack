# Agent Context Guide

This document provides essential context for AI assistants working on The Copilot Stack project.

## Project Overview

**The Copilot Stack** is a static content platform dedicated to Microsoft Copilot extensibility, featuring technical blog posts, video tutorials, and podcast episodes. The site uses a terminal-themed design (green-on-black aesthetic) to reflect the technical nature of the content.

**Live Site:** https://sebastienlevert.github.io/the-copilot-stack/

## Tech Stack

### Core Framework & Languages
- **Astro 5** - Static site generator with content collections
- **TypeScript** - Type-safe development
- **Node.js 20+** - Runtime environment

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **JetBrains Mono** - Monospace font for terminal theme
- **Custom Terminal Theme** - Green (#00FF00) on black (#0a0a0a) color palette

### Content & Markdown
- **MDX** - Markdown with component support
- **Astro Content Collections** - Type-safe content management
- **Shiki** - Syntax highlighting with github-dark theme
- **Remark Plugins** - Custom admonitions and transformers
- **Global Components** - Admonition component available in all MDX files without imports

### Search & Discovery
- **Pagefind** - Client-side static search (built after Astro build)
- **RSS Feeds** - Content syndication

### Build & Deploy
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static hosting
- **Microsoft Clarity** - Optional analytics (via PUBLIC_CLARITY_ID)

## Project Structure

```
src/
├── components/
│   ├── blog/           # Blog-specific components
│   ├── episodes/       # Episode-specific components
│   ├── embeds/         # Rich media embeds (YouTube, Spotify, etc.)
│   ├── content/        # Content features (code blocks, admonitions)
│   ├── layout/         # Layout components (header, footer, nav)
│   └── search/         # Search components
├── content/
│   ├── blog/           # Blog posts (.mdx files)
│   ├── episodes/       # Episode pages (.mdx files)
│   └── config.ts       # Content collections schema
├── layouts/
│   ├── BaseLayout.astro      # Base layout with metadata
│   ├── BlogLayout.astro      # Blog post layout
│   └── EpisodeLayout.astro   # Episode layout
├── pages/
│   ├── blog/           # Blog index and dynamic routes
│   ├── episodes/       # Episode index and dynamic routes
│   ├── index.astro     # Homepage
│   └── rss.xml.ts      # RSS feed generation
├── styles/
│   └── global.css      # Global styles and terminal theme
└── utils/              # Utility functions and plugins
```

## Content Collections

### Blog Posts
Located in `src/content/blog/`, frontmatter schema:
```yaml
title: string
description: string
pubDate: Date
author: string
tags: string[]
draft: boolean
```

### Episodes
Located in `src/content/episodes/`, frontmatter schema:
```yaml
title: string
description: string
pubDate: Date
episodeNumber: number
youtubeId?: string
spotifyUrl?: string
appleMusicUrl?: string
tags: string[]
draft: boolean
```

## Available MCP Servers

### Playwright MCP Server

**CRITICAL: Always use the Playwright MCP server to verify visual implementations.**

The Playwright MCP server should be used to:
- **Verify visual correctness** - Ensure components render as expected
- **Test responsive design** - Check layouts at different viewport sizes
- **Validate terminal theme** - Confirm green-on-black color scheme
- **Test navigation** - Verify links and routing work correctly
- **Check accessibility** - Ensure proper semantic HTML and ARIA labels
- **Screenshot comparisons** - Capture before/after visuals during changes

**When to use Playwright MCP:**
1. After adding or modifying visual components
2. When changing layout or styling
3. Before marking visual tasks as complete
4. When user requests visual verification
5. During responsive design work
6. When implementing new pages or routes

**Example workflow:**
```
1. Make code changes
2. Run dev server (npm run dev)
3. Use Playwright MCP to navigate to localhost:4321
4. Take screenshots and verify appearance
5. Test interactions (clicks, navigation, search)
6. Confirm everything looks correct before completing task
```

## Development Guidelines

### Terminal Theme Colors
Defined in `tailwind.config.mjs`:
```javascript
terminal: {
  black: '#0a0a0a',      // Background
  gray: '#1a1a1a',       // Cards/containers
  green: '#00FF00',      // Primary text/accents
  greenDim: '#00AA00',   // Secondary text
  white: '#C5C5C5',      // Body text
  selection: '#003300',  // Text selection
}
```

### Key Commands
```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build site + generate Pagefind index
npm run preview  # Preview production build
```

### Content Creation
- Blog posts go in `src/content/blog/` as `.mdx` files (organize in `YYYY/MM/` folders)
- Episodes go in `src/content/episodes/` as `.mdx` files
- Use frontmatter schema from content collections
- **No imports needed** - Core components (Admonition) are globally available
- Use GitHub-style callouts: `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, etc.
- Import embed components only for rich media (YouTube, Spotify)
- **Code block features**:
  - Add `showLineNumbers` to code fence for line numbers: ` ```typescript showLineNumbers`
  - Use `// [!code highlight]` or `# [!code highlight]` to highlight specific lines
  - Use `// [!code ++]` for added lines (diff view)
  - Use `// [!code --]` for removed lines (diff view)
  - Example:
    ````
    ```typescript showLineNumbers
    function hello() {
      console.log("Hello"); // [!code highlight]
    }
    ```
    ````

### Code Style
- TypeScript for type safety
- Astro components for UI (.astro files)
- Tailwind utility classes for styling
- Terminal theme classes (terminal-* prefix)
- Semantic HTML for accessibility

### Build Process
1. Astro builds static site to `dist/`
2. Pagefind indexes content for search
3. GitHub Actions deploys to GitHub Pages

## Important Considerations

### Performance
- 100% static site, no backend
- All content pre-rendered at build time
- Client-side search with Pagefind
- Optimized images with Sharp

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Terminal theme with sufficient contrast

### Content Management
- Content stored as MDX files in git
- Type-safe with Astro content collections
- Draft posts excluded from production builds
- RSS feeds auto-generated from content

### Deployment
- Deployed to GitHub Pages at /the-copilot-stack base path
- Automatic deployment on push to main branch
- Build includes Pagefind indexing step

## Git Workflow

### Before Committing
**CRITICAL: Always run a full build before committing any changes.**

```bash
npm run build
```

This ensures:
- MDX files compile correctly
- Frontmatter is valid YAML
- All imports are correct
- TypeScript types are valid
- No build-time errors exist

**Never commit without verifying the build succeeds.**

## Common Tasks

### Adding a Blog Post
1. Create `.mdx` file in `src/content/blog/` (organize in `YYYY/MM/` folders)
2. Add required frontmatter fields (use double quotes for values with colons)
3. Write content using MDX - **no imports needed!** Components are globally available
4. Use GitHub-style callouts: `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!INFO]`
5. **Run `npm run build` to verify**
6. Verify with Playwright MCP before committing

### Adding an Episode
1. Create `.mdx` file in `src/content/episodes/`
2. Add episode frontmatter (including media URLs)
3. Import embed components as needed
4. Test video/audio embeds with Playwright MCP

### Modifying Styles
1. Edit Tailwind classes or `src/styles/global.css`
2. Maintain terminal theme consistency
3. **MUST verify visual changes with Playwright MCP**
4. Test responsive breakpoints

### Updating Components
1. Modify component in `src/components/`
2. Ensure TypeScript types are correct
3. **MUST verify component rendering with Playwright MCP**
4. Check component usage across pages

## Testing Workflow

### Visual Verification Checklist
Use Playwright MCP to verify:
- [ ] Terminal theme colors are correct
- [ ] Layout is responsive at mobile/tablet/desktop sizes
- [ ] Navigation works (header, footer, links)
- [ ] Search functionality works
- [ ] Blog posts render correctly
- [ ] Episodes display with working embeds
- [ ] Code syntax highlighting appears correct
- [ ] Tags and filters function properly
- [ ] Typography is readable with terminal theme

## Additional Resources

- Astro Documentation: https://docs.astro.build
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Pagefind Docs: https://pagefind.app
- Project Repository: https://github.com/sebastienlevert/the-copilot-stack
