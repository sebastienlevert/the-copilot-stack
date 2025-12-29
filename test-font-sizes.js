import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Define viewports
  const viewports = {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 375, height: 667 }
  };

  console.log('Starting font size verification...\n');

  // Test homepage
  for (const [name, viewport] of Object.entries(viewports)) {
    const page = await context.newPage();
    await page.setViewportSize(viewport);

    console.log(`\n=== ${name.toUpperCase()} VIEWPORT (${viewport.width}x${viewport.height}) ===`);

    // Navigate to homepage
    console.log('\n1. Testing Homepage...');
    await page.goto('http://localhost:4321/the-copilot-stack/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // Let everything settle

    // Take homepage screenshot
    await page.screenshot({
      path: `homepage-${name}.png`,
      fullPage: true
    });
    console.log(`   ✓ Screenshot saved: homepage-${name}.png`);

    // Get font sizes from homepage elements
    const homepageMetrics = await page.evaluate(() => {
      const measurements = {};

      // Header
      const headerTitle = document.querySelector('header h1, header .site-title, header a');
      if (headerTitle) {
        const styles = window.getComputedStyle(headerTitle);
        measurements.headerTitle = {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          color: styles.color,
          backgroundColor: styles.backgroundColor
        };
      }

      // Navigation
      const navLink = document.querySelector('nav a');
      if (navLink) {
        const styles = window.getComputedStyle(navLink);
        measurements.navLink = {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight
        };
      }

      // Page title/heading
      const mainHeading = document.querySelector('h1');
      if (mainHeading) {
        const styles = window.getComputedStyle(mainHeading);
        measurements.mainHeading = {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight
        };
      }

      // Body text
      const bodyText = document.querySelector('p');
      if (bodyText) {
        const styles = window.getComputedStyle(bodyText);
        measurements.bodyText = {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight
        };
      }

      // Blog card title
      const blogCardTitle = document.querySelector('.blog-card h2, .blog-card h3, article h2, article h3');
      if (blogCardTitle) {
        const styles = window.getComputedStyle(blogCardTitle);
        measurements.blogCardTitle = {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight
        };
      }

      // Blog card text
      const blogCardText = document.querySelector('.blog-card p, article p');
      if (blogCardText) {
        const styles = window.getComputedStyle(blogCardText);
        measurements.blogCardText = {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight
        };
      }

      // Check terminal theme colors
      const terminal = document.querySelector('.terminal, pre, code');
      if (terminal) {
        const styles = window.getComputedStyle(terminal);
        measurements.terminal = {
          color: styles.color,
          backgroundColor: styles.backgroundColor
        };
      }

      return measurements;
    });

    console.log('\n   Font Size Measurements:');
    for (const [element, metrics] of Object.entries(homepageMetrics)) {
      console.log(`   - ${element}:`);
      for (const [property, value] of Object.entries(metrics)) {
        console.log(`     ${property}: ${value}`);
      }
    }

    // Find and navigate to a blog post
    const blogPostLink = await page.locator('article a, .blog-card a, a[href*="/blog/"]').first();
    if (await blogPostLink.count() > 0) {
      const href = await blogPostLink.getAttribute('href');
      console.log(`\n2. Testing Blog Post: ${href}...`);

      await blogPostLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Take blog post screenshot
      await page.screenshot({
        path: `blog-post-${name}.png`,
        fullPage: true
      });
      console.log(`   ✓ Screenshot saved: blog-post-${name}.png`);

      // Get font sizes from blog post
      const blogPostMetrics = await page.evaluate(() => {
        const measurements = {};

        // Article title
        const articleTitle = document.querySelector('article h1, main h1, .prose h1');
        if (articleTitle) {
          const styles = window.getComputedStyle(articleTitle);
          measurements.articleTitle = {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight
          };
        }

        // Article heading (h2)
        const articleH2 = document.querySelector('article h2, main h2, .prose h2');
        if (articleH2) {
          const styles = window.getComputedStyle(articleH2);
          measurements.articleH2 = {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight
          };
        }

        // Article paragraph
        const articlePara = document.querySelector('article p, main p, .prose p');
        if (articlePara) {
          const styles = window.getComputedStyle(articlePara);
          measurements.articleParagraph = {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight
          };
        }

        // Code blocks
        const codeBlock = document.querySelector('pre code, pre');
        if (codeBlock) {
          const styles = window.getComputedStyle(codeBlock);
          measurements.codeBlock = {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight,
            color: styles.color,
            backgroundColor: styles.backgroundColor
          };
        }

        // Inline code
        const inlineCode = document.querySelector('p code, :not(pre) > code');
        if (inlineCode) {
          const styles = window.getComputedStyle(inlineCode);
          measurements.inlineCode = {
            fontSize: styles.fontSize,
            color: styles.color,
            backgroundColor: styles.backgroundColor
          };
        }

        return measurements;
      });

      console.log('\n   Blog Post Font Size Measurements:');
      for (const [element, metrics] of Object.entries(blogPostMetrics)) {
        console.log(`   - ${element}:`);
        for (const [property, value] of Object.entries(metrics)) {
          console.log(`     ${property}: ${value}`);
        }
      }
    }

    await page.close();
  }

  console.log('\n\n=== VERIFICATION COMPLETE ===');
  console.log('\nScreenshots saved:');
  console.log('- homepage-desktop.png');
  console.log('- homepage-mobile.png');
  console.log('- blog-post-desktop.png');
  console.log('- blog-post-mobile.png');
  console.log('\nPlease review the screenshots and measurements above.\n');

  await browser.close();
})();
