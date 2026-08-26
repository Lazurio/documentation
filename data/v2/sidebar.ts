export const sidebar = [
  { label: 'Overview', translations: { cs: 'Přehled' }, slug: 'index' },
  {
    label: 'Evaluate Lazurio',
    translations: { cs: 'Poznejte Lazurio' },
    items: [
      { label: 'For IT administrators', translations: { cs: 'Pro IT administrátory' }, slug: 'it-administrators' },
      { label: 'Lazurio vs Microsoft Copilot', translations: { cs: 'Lazurio a Microsoft Copilot' }, slug: 'lazurio-vs-microsoft-copilot' },
      { label: 'Use cases', translations: { cs: 'Příklady použití' }, slug: 'use-cases' },
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
    translations: { cs: 'Podklady a reference' },
    items: [
      { label: 'For agents', translations: { cs: 'Pro agenty' }, slug: 'agents' },
      { label: 'FAQ', translations: { cs: 'Časté otázky' }, slug: 'faq' },
      { label: 'Security and control evidence', translations: { cs: 'Bezpečnost a podklady k ověření' }, slug: 'public-evidence' },
      { label: 'Public references', translations: { cs: 'Veřejné zdroje' }, slug: 'reference' },
    ],
  },
]
