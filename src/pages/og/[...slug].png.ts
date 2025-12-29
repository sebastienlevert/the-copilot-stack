import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  const episodes = await getCollection('episodes', ({ data }) => !data.draft);

  return [
    ...blogPosts.map((post) => ({
      params: { slug: `blog/${post.slug}` },
      props: {
        title: post.data.title,
        pubDate: post.data.pubDate,
        type: 'blog',
      },
    })),
    ...episodes.map((episode) => ({
      params: { slug: `episodes/${episode.slug}` },
      props: {
        title: episode.data.title,
        pubDate: episode.data.pubDate,
        type: 'episode',
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const { title, pubDate, type } = props as {
    title: string;
    pubDate: Date;
    type: 'blog' | 'episode';
  };

  // Format date
  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Load JetBrains Mono font for satori
  const fontPath = join(
    process.cwd(),
    'node_modules',
    '@fontsource',
    'jetbrains-mono',
    'files',
    'jetbrains-mono-latin-400-normal.woff'
  );
  const fontData = readFileSync(fontPath);

  // Create SVG with satori
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          padding: '80px 120px',
          fontFamily: 'JetBrains Mono',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      color: '#00FF00',
                      marginRight: '20px',
                    },
                    children: '>',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '36px',
                      color: '#00FF00',
                      fontWeight: 'bold',
                    },
                    children: 'The Copilot Stack',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '64px',
                color: '#00FF00',
                fontWeight: 'bold',
                marginBottom: '40px',
                lineHeight: 1.2,
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                fontSize: '28px',
                color: '#00AA00',
              },
              children: formattedDate,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
