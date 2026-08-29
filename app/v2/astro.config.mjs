import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import starlight from '@astrojs/starlight'
import { sidebar } from './src/sidebar'

function accessibleTables() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'table') {
        node.properties ??= {}
        node.properties.tabIndex = 0
        node.properties.ariaLabel = 'Scrollable documentation table'
      }
      if (Array.isArray(node.children)) node.children.forEach(visit)
    }

    visit(tree)
  }
}

function accessibleCodeBlocks() {
  return {
    name: 'Accessible code blocks',
    hooks: {
      postprocessRenderedBlock({ renderData }) {
        const visit = (node) => {
          if (node.type === 'element' && node.tagName === 'pre') {
            node.properties ??= {}
            node.properties.tabIndex = 0
            node.properties.ariaLabel = 'Scrollable code example'
          }
          if (Array.isArray(node.children)) node.children.forEach(visit)
        }

        visit(renderData.blockAst)
      },
    },
  }
}

export default defineConfig({
  site: 'https://documentation.lazurio.ai',
  // Keep the locale prefix explicit so future curated locales can share root selection.
  redirects: {
    '/': {
      status: 302,
      destination: '/en/',
    },
  },
  publicDir: fileURLToPath(new URL('../../data/v2/public', import.meta.url)),
  markdown: {
    rehypePlugins: [accessibleTables],
  },
  vite: {
    server: { strictPort: true },
    preview: { strictPort: true },
  },
  integrations: [
    starlight({
      title: 'Lazurio documentation',
      description: 'How Lazurio works, what it is good for, and where its trust boundaries are.',
      favicon: '/favicon.svg',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Lazurio/documentation',
        },
      ],
      sidebar,
      customCss: ['./src/styles/docs.css'],
      expressiveCode: {
        plugins: [accessibleCodeBlocks()],
      },
    }),
  ],
  adapter: cloudflare({
    platformProxy: { enabled: false },
  }),
})
