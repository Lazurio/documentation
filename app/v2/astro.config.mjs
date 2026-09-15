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
      title: 'Lazurio Docs',
      expressiveCode: {
        // Prompts are prose: keep them readable without horizontal scrolling.
        defaultProps: { overridesByLang: { text: { wrap: true } } },
      },
      description: 'How Lazurio works, what it is good for, and where its trust boundaries are.',
      logo: {
        src: '../../data/v2/public/favicon.svg',
        alt: 'Lazurio',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      // Starlight merges these defaults without duplicating its Twitter card tag.
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://documentation.lazurio.ai/social-preview-v1.png' } },
        { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1024' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '1024' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Lazurio' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://documentation.lazurio.ai/social-preview-v1.png' } },
        { tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'Lazurio' } },
      ],
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
        Footer: './src/components/Footer.astro',
        Hero: './src/components/DocumentationHero.astro',
        LanguageSelect: './src/components/IconLanguageSelect.astro',
        ThemeSelect: './src/components/IconThemeSelect.astro',
      },
      sidebar,
      customCss: ['./src/styles/docs.css'],
    }),
  ],
})
