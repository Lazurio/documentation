import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import starlight from '@astrojs/starlight'
import { sidebar } from './src/sidebar'

function accessibleTables() {
  return (tree, file) => {
    const isCzech = String(file.path ?? '').split(/[\\/]/).includes('cs')
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'table') {
        node.properties ??= {}
        node.properties.tabIndex = 0
        node.properties.ariaLabel = isCzech
          ? 'Posuvná tabulka dokumentace'
          : 'Scrollable documentation table'
      }
      if (Array.isArray(node.children)) node.children.forEach(visit)
    }

    visit(tree)
  }
}

export default defineConfig({
  site: 'https://documentation.lazurio.ai',
  publicDir: fileURLToPath(new URL('../../data/v2/public', import.meta.url)),
  // Astro 7 defaults to JSX-style whitespace compression. Retain the previous
  // HTML-aware behavior so existing inline documentation copy keeps its spacing.
  compressHTML: true,
  markdown: {
    // Preserve the existing accessibility transform while Astro 7 moves the
    // default Markdown pipeline to Sätteri.
    processor: unified({
      rehypePlugins: [accessibleTables],
    }),
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
        cs: { label: 'Čeština', lang: 'cs' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Lazurio/documentation',
        },
      ],
      components: {
        Head: './src/components/Head.astro',
      },
      sidebar,
      customCss: ['./src/styles/docs.css'],
    }),
  ],
})
