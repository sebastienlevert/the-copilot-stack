# PR Preview Deployments

This repository automatically creates preview deployments for pull requests using a single unified workflow that rebuilds the entire site.

## How It Works

The deployment workflow follows this approach (based on [Joe Duncko's blog post](https://joeduncko.com/blog/implementing-github-pages-pr-previews/)):

1. **Always starts from main**: Checks out the main branch first
2. **Queries open PRs**: Uses GitHub API to get all currently open pull requests
3. **Builds production**: Compiles main branch to `site/` directory
4. **Builds all PR previews**: For each open PR, checks out the branch, installs dependencies, and builds to `site/preview/pr-{number}/`
5. **Single deployment**: Uploads and deploys the entire `site/` directory once
6. **Auto-cleanup**: Only open PRs are built, so closed PRs automatically disappear

## Key Features

### Automatic Cleanup
When a PR is closed, it's no longer in the "open PRs" list, so it won't be included in the next deployment. No manual cleanup needed!

### Production Stability
The production site is always built from the main branch first, ensuring it's never affected by PR preview builds.

### Independent Builds
Each PR gets its own `npm ci` run, ensuring dependencies match what's in that PR branch.

### Predictable URLs
Preview URLs follow a consistent pattern:
```
https://sebastienlevert.github.io/the-copilot-stack/preview/pr-[NUMBER]/
```

## Workflow Triggers

The workflow runs on:
- **Push to main**: Rebuilds production and all open PR previews
- **PR events**: opened, synchronize, reopened, closed
- **Manual trigger**: `workflow_dispatch`

## Environment Variables

The workflow uses these environment variables to control build paths:

### Production Build
```bash
SITE_URL="https://sebastienlevert.github.io/the-copilot-stack"
BASE_PATH="/the-copilot-stack"
```

### PR Preview Builds
```bash
SITE_URL="https://sebastienlevert.github.io/the-copilot-stack/preview/pr-123"
BASE_PATH="/the-copilot-stack/preview/pr-123"
```

## URL Helper Utility

The codebase uses a URL helper (`src/utils/url.ts`) to handle base paths correctly:

```typescript
import { url } from '@/utils/url';

// Instead of: href="/blog"
// Use: href={url('/blog')}
```

This ensures links work in both production and PR preview environments.

## Bot Comments

When a PR preview is deployed, the bot adds/updates a comment:

```markdown
## 🚀 Preview Deployment

Your preview build is ready!

**Preview URL:** https://sebastienlevert.github.io/the-copilot-stack/preview/pr-123/

This preview will be updated automatically when you push new commits to this PR.

---
*Built with commit abc1234*
```

## Permissions Required

The workflow needs:
- `contents: read` - To checkout code
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For GitHub Pages deployment
- `pull-requests: write` - To comment on PRs

## Local Testing

Test PR preview builds locally:

```bash
SITE_URL="https://sebastienlevert.github.io/the-copilot-stack/preview/pr-123" \
BASE_PATH="/the-copilot-stack/preview/pr-123" \
npm run build
```

Then serve with:

```bash
npx http-server dist -p 8080
```

And access at: `http://localhost:8080/the-copilot-stack/preview/pr-123/`

## Trade-offs

### Advantages
✅ Automatic cleanup (no orphaned previews)
✅ Single deployment (simpler workflow)
✅ Production always stable (built from main)
✅ No branch management needed
✅ Works with free GitHub features

### Disadvantages
⚠️ Longer build times with many open PRs
⚠️ Entire site rebuilds on each deployment
⚠️ All PRs rebuilt even if only one changed

## Troubleshooting

### Preview not updating
- Check the Actions tab for build errors
- Ensure the PR branch builds successfully locally
- Verify GitHub Pages is enabled

### Preview shows old version
- GitHub Pages may cache for a few minutes
- Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Check if the latest commit appears in the bot comment

### Build failing for specific PR
- PR branch may have build errors
- Dependencies might be incompatible
- Check the workflow logs for that specific PR build step

## Architecture Diagram

```
┌─────────────────────────────────────┐
│  GitHub Actions Workflow Triggers   │
│  (push to main / PR events)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  1. Checkout main branch            │
│  2. Query all open PRs via GitHub   │
│     API                              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Build production site              │
│  └─> site/                          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  For each open PR:                  │
│  1. Checkout PR branch              │
│  2. npm ci (fresh deps)             │
│  3. Build with PR base path         │
│  4. Move to site/preview/pr-N/      │
│  5. Return to main                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Upload entire site/ directory      │
│  └─> GitHub Pages Artifact          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Deploy to GitHub Pages             │
│  └─> https://....github.io/...      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Comment on PR with preview URL     │
│  (if triggered by PR event)         │
└─────────────────────────────────────┘
```

## Credits

This implementation is based on [Joe Duncko's excellent blog post](https://joeduncko.com/blog/implementing-github-pages-pr-previews/) about GitHub Pages PR previews.
