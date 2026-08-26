import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      stableId: z.string().regex(/^lazurio-doc-[a-z0-9-]+$/),
      locale: z.enum(['en', 'cs']),
      summary: z.string().min(20),
      updatedAt: z.string().date(),
      reviewedAt: z.string().date(),
      reviewOwner: z.string().min(2),
      sourceRefs: z.array(z.string()).min(1),
      audience: z.array(z.enum(['it-admin', 'decision-maker', 'builder', 'agent'])).min(1),
    }),
  }),
})

export const collections = { docs }
