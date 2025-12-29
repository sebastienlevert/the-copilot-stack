# PR Preview Deployments

This repository automatically creates preview deployments for pull requests.

## How It Works

When you create or update a pull request:

1. **Automatic Build**: GitHub Actions builds your changes with a PR-specific base URL
2. **Preview Deployment**: The built site is deployed to `https://sebastienlevert.github.io/the-copilot-stack/pr/[PR_NUMBER]/`
3. **PR Comment**: A bot comment is added to your PR with the preview URL
4. **Auto-Update**: Each time you push new commits, the preview is automatically updated
5. **Cleanup**: When the PR is closed or merged, the preview is automatically deleted

## Preview URL Format

Preview URLs follow this pattern:
```
https://sebastienlevert.github.io/the-copilot-stack/pr/[PR_NUMBER]/
```

For example, PR #123 would be available at:
```
https://sebastienlevert.github.io/the-copilot-stack/pr/123/
```

## Features

- ✅ Automatic deployment on PR creation and updates
- ✅ Unique URL for each PR
- ✅ Does not affect the main site
- ✅ Auto-cleanup when PR is closed
- ✅ Bot comment with preview link
- ✅ Updated comment on each push

## Workflows

This feature is powered by two GitHub Actions workflows:

1. **`pr-preview.yml`** - Builds and deploys PR previews
2. **`pr-preview-cleanup.yml`** - Removes previews when PRs are closed

## Permissions

The workflows require the following permissions:
- `contents: write` - To push to the gh-pages branch
- `pull-requests: write` - To comment on PRs

## Troubleshooting

If a preview deployment fails:

1. Check the Actions tab for error details
2. Ensure the PR branch builds successfully locally
3. Verify that GitHub Pages is enabled for the repository
4. Check that the gh-pages branch exists

## Local Testing

To test the PR preview build locally:

```bash
BASE_URL=/the-copilot-stack/pr/123 npm run build
```

This will build the site with a PR-specific base URL.
