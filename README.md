# The Copilot Stack

> Your comprehensive resource for Microsoft Copilot extensibility

[![Deploy to GitHub Pages](https://github.com/sebastienlevert/the-copilot-stack/actions/workflows/deploy.yml/badge.svg)](https://github.com/sebastienlevert/the-copilot-stack/actions/workflows/deploy.yml)

## 🚀 Overview

The Copilot Stack is a content platform dedicated to Microsoft Copilot extensibility, featuring technical blog posts, video tutorials, and podcast episodes. Built with Astro, this site combines performance with developer experience, offering a terminal-themed design that reflects the technical nature of the content.

**Live Site:** [https://sebastienlevert.github.io/the-copilot-stack/](https://sebastienlevert.github.io/the-copilot-stack/)

## ✨ Features

- **Terminal-Themed Design** - Classic green-on-black terminal aesthetic
- **Blog** - Technical articles about Copilot extensibility
- **Episodes** - Video and podcast content with rich media embeds
- **Search** - Client-side search powered by Pagefind
- **RSS Feeds** - Subscribe to updates via RSS
- **Tag Filtering** - Browse content by topic
- **Reading Time** - Estimated reading time for articles
- **Analytics** - Microsoft Clarity integration
- **100% Static** - No backend required, hosted on GitHub Pages

## 🛠️ Tech Stack

- **[Astro 5](https://astro.build)** - Static site generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[MDX](https://mdxjs.com/)** - Markdown with component support
- **[Pagefind](https://pagefind.app/)** - Static search
- **[JetBrains Mono](https://www.jetbrains.com/lp/mono/)** - Monospace font
- **[GitHub Pages](https://pages.github.com/)** - Static hosting
- **[GitHub Actions](https://github.com/features/actions)** - Automated deployment

## 📁 Project Structure

```
the-copilot-stack/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── blog/                   # Blog components
│   │   ├── episodes/               # Episode components
│   │   ├── embeds/                 # Rich media embeds
│   │   ├── content/                # Content features
│   │   ├── layout/                 # Layout components
│   │   └── search/                 # Search components
│   ├── content/
│   │   ├── blog/                   # Blog posts (MDX)
│   │   ├── episodes/               # Episode pages (MDX)
│   │   └── config.ts               # Content collections schema
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Base layout
│   │   ├── BlogLayout.astro        # Blog post layout
│   │   └── EpisodeLayout.astro     # Episode layout
│   ├── pages/
│   │   ├── blog/                   # Blog pages
│   │   ├── episodes/               # Episode pages
│   │   ├── about.astro             # About page
│   │   ├── index.astro             # Home page
│   │   └── rss.xml.ts              # RSS feed
│   ├── styles/
│   │   └── global.css              # Global styles
│   └── utils/                      # Utility functions
├── astro.config.mjs                # Astro configuration
├── tailwind.config.mjs             # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sebastienlevert/the-copilot-stack.git
cd the-copilot-stack
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build site to `./dist/` (includes Pagefind indexing) |
| `npm run preview` | Preview build locally |
| `npm run astro` | Run Astro CLI commands |

## ✍️ Creating Content

### Writing a Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: 2024-12-28
author: 'Your Name'
tags: ['copilot', 'extensibility']
draft: false
---

## Introduction

Your content here...
```

### Creating an Episode

Create a new `.mdx` file in `src/content/episodes/`:

```mdx
---
title: 'Episode Title'
description: 'Episode description'
pubDate: 2024-12-28
episodeNumber: 1
youtubeId: 'VIDEO_ID'
spotifyUrl: 'https://open.spotify.com/episode/...'
appleMusicUrl: 'https://embed.music.apple.com/...'
tags: ['copilot', 'tutorial']
draft: false
---

## Episode Overview

Show notes and content here...
```

### Using Rich Media Embeds

Import and use embed components in your MDX:

```mdx
import YouTube from '../../components/embeds/YouTube.astro';
import Spotify from '../../components/embeds/Spotify.astro';

<YouTube videoId="YOUR_VIDEO_ID" title="Video Title" />
<Spotify url="https://open.spotify.com/episode/..." />
```

## 🎨 Customization

### Terminal Theme Colors

Edit `tailwind.config.mjs` to customize the terminal color palette:

```javascript
colors: {
  terminal: {
    black: '#0a0a0a',      // Background
    gray: '#1a1a1a',       // Cards
    green: '#00FF00',      // Primary text
    greenDim: '#00AA00',   // Secondary text
    white: '#C5C5C5',      // Body text
    selection: '#003300',  // Selection
  }
}
```

### Microsoft Clarity Analytics

Set the `PUBLIC_CLARITY_ID` environment variable or GitHub secret to enable Microsoft Clarity analytics:

```bash
PUBLIC_CLARITY_ID=your_clarity_project_id
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Create a repository on GitHub: `sebastienlevert/the-copilot-stack`
2. Push your code to the `main` branch
3. Go to repository **Settings > Pages**
4. Set **Source** to "GitHub Actions"
5. The site will automatically deploy on push to `main`

### Other Platforms

The site can be deployed to any static hosting platform:

- **Vercel**: Import from GitHub
- **Netlify**: Connect repository and deploy
- **Cloudflare Pages**: Connect and deploy

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Content Contributions

- Suggest topics for blog posts or episodes
- Fix typos or improve existing content
- Share your own Copilot extensibility experiences

### Code Contributions

- Report bugs or issues
- Suggest new features or improvements
- Submit pull requests for fixes or enhancements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Search powered by [Pagefind](https://pagefind.app)
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Hosted on [GitHub Pages](https://pages.github.com)

## 📧 Contact

- **Author**: Sébastien Levert
- **GitHub**: [@sebastienlevert](https://github.com/sebastienlevert)
- **Twitter/X**: [@sebastienlevert](https://twitter.com/sebastienlevert)
- **YouTube**: [@sebastienlevert](https://youtube.com/@sebastienlevert)

---

**Happy coding!** 🚀
