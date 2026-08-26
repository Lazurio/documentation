export const sidebar = [
  { label: 'Overview', translations: { cs: 'Přehled' }, slug: 'index' },
  {
    label: 'Evaluate Lazurio',
    translations: { cs: 'Před nasazením' },
    items: [
      { label: 'For IT administrators', translations: { cs: 'Přehled pro správce IT' }, slug: 'it-administrators' },
      { label: 'Lazurio vs Microsoft Copilot', translations: { cs: 'Lazurio a Microsoft Copilot' }, slug: 'lazurio-vs-microsoft-copilot' },
      { label: 'Use cases', translations: { cs: 'Kdy dává Lazurio smysl' }, slug: 'use-cases' },
    ],
  },
  {
    label: 'Understand the system',
    translations: { cs: 'Jak Lazurio funguje' },
    items: [
      { label: 'How Lazurio works', translations: { cs: 'Princip fungování' }, slug: 'how-lazurio-works' },
      { label: 'Data access and security', translations: { cs: 'Přístup k datům a zabezpečení' }, slug: 'data-access-security' },
      { label: 'Deployment and operations', translations: { cs: 'Nasazení a provoz' }, slug: 'deployment-operations' },
    ],
  },
  {
    label: 'Reference',
    translations: { cs: 'Další informace' },
    items: [
      { label: 'For agents', translations: { cs: 'Pro AI agenty' }, slug: 'agents' },
      { label: 'FAQ', translations: { cs: 'Časté otázky' }, slug: 'faq' },
      { label: 'Security and control evidence', translations: { cs: 'Bezpečnost a podklady k ověření' }, slug: 'public-evidence' },
      { label: 'Public references', translations: { cs: 'Použité zdroje' }, slug: 'reference' },
    ],
  },
]
