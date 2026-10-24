import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { sidebar as sidebarData } from '../../../data/v2/sidebar.mjs'

// Starlight opens the current page's group automatically and remembers the
// reader's desktop choices. Start other groups closed to keep the index short.
export const sidebar = sidebarData.map((entry) =>
  'items' in entry ? { ...entry, collapsed: true } : entry,
) satisfies StarlightUserConfig['sidebar']
