import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import starlight from '@astrojs/starlight'
import { resolveModuleListener } from '../../runtime-listener.mjs'
import { sidebar } from './src/sidebar'

const isRuntimeCommand = process.argv.some((argument) => ['dev', 'preview'].includes(argument))
const testManifestUrl = process.env.CI
  ? new URL('./tests/fixtures/lazurio.module.json', import.meta.url)
  : undefined
const listener = resolveModuleListener(process.env, {
  allowMissing: !isRuntimeCommand,
  manifestUrl: testManifestUrl,
})

export default defineConfig({
  site: 'https://documentation.lazurio.ai',
  publicDir: fileURLToPath(new URL('../../data/v2/public', import.meta.url)),
  ...(listener
    ? {
        server: {
          host: listener.host,
          port: listener.port,
        },
      }
    : {}),
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
    }),
  ],
  adapter: cloudflare({
    platformProxy: { enabled: false },
  }),
})
