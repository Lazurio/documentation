export const sidebar = [
  { label: 'Overview', translations: { cs: 'Přehled' }, slug: 'index' },
  {
    label: 'Guide',
    translations: { cs: 'Guide' },
    items: [
      { label: 'Guide overview', translations: { cs: 'Přehled Guidu' }, slug: 'guide' },
      { label: 'Start here: understand agents', translations: { cs: 'Začněte tady: jak chápat agenty' }, slug: 'guide/start-here' },
      {
        label: 'Onboarding course',
        translations: { cs: 'Úvodní kurz' },
        // A nested group is not collapsed by src/sidebar.ts, which closes only
        // top-level groups. Starlight still opens it on the course's own pages.
        collapsed: true,
        items: [
          { label: 'Course overview', translations: { cs: 'Přehled kurzu' }, slug: 'guide/course' },
          { label: '1. Sign in', translations: { cs: '1. Přihlášení' }, slug: 'guide/course/first-sign-in' },
          { label: '2. Getting started', translations: { cs: '2. Začínáme' }, slug: 'guide/course/getting-started' },
          { label: '3. Chat, Apps and Automate', translations: { cs: '3. Chat, Apps a Automate' }, slug: 'guide/course/find-your-way' },
          { label: '4. Who works with you', translations: { cs: '4. Kdo s vámi pracuje' }, slug: 'guide/course/who-works-with-you' },
          { label: '5. Where things belong', translations: { cs: '5. Kam co patří' }, slug: 'guide/course/where-things-belong' },
          { label: '6. Connected apps', translations: { cs: '6. Připojené aplikace' }, slug: 'guide/course/connected-apps' },
          { label: '7. Your first task', translations: { cs: '7. První úkol' }, slug: 'guide/course/first-task' },
          { label: '8. Review and Publication', translations: { cs: '8. Kontrola a Publikace' }, slug: 'guide/course/review' },
          { label: '9. When something does not work', translations: { cs: '9. Když něco nefunguje' }, slug: 'guide/course/when-stuck' },
        ],
      },
      { label: 'First steps with an agent', translations: { cs: 'První kroky s agentem' }, slug: 'guide/first-steps' },
      { label: 'Glossary', translations: { cs: 'Slovníček pojmů' }, slug: 'guide/glossary' },
      { label: 'Tips for working', translations: { cs: 'Tipy pro práci' }, slug: 'guide/work-tips' },
      { label: 'Connect your tools', translations: { cs: 'Propojení nástrojů' }, slug: 'guide/tool-connections' },
      { label: 'Where your AI comes from', translations: { cs: 'Zdroj AI' }, slug: 'guide/ai-source' },
      { label: 'Phone and computer', translations: { cs: 'Telefon a počítač' }, slug: 'guide/phone-and-computer' },
      { label: 'Device approval', translations: { cs: 'Schválení zařízení' }, slug: 'guide/device-approval' },
      { label: 'How to ask the Admin', translations: { cs: 'Jak požádat Admina' }, slug: 'guide/ask-the-admin' },
      { label: 'Reach an Environment through Tailscale', translations: { cs: 'Připojení přes Tailscale' }, slug: 'guide/tailscale' },
      { label: 'Add a new device to the tailnet', translations: { cs: 'Přidání nového zařízení' }, slug: 'guide/tailscale-add-device' },
      { label: 'Recommended applications', translations: { cs: 'Doporučené aplikace' }, slug: 'guide/recommended-apps' },
    ],
  },
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
    label: 'IT and administration',
    translations: { cs: 'Pro IT a Admina' },
    items: [
      { label: 'GitHub baseline for a new Organization', translations: { cs: 'GitHub pro novou Organizaci' }, slug: 'github-baseline' },
      { label: 'Microsoft 365 for IT and the Admin', translations: { cs: 'Microsoft 365 pro IT a Admina' }, slug: 'microsoft-365' },
      { label: 'Verified provider notes', translations: { cs: 'Ověřené poznatky o poskytovatelích' }, slug: 'provider-notes' },
      { label: 'Servers and the Conglomerate Host', translations: { cs: 'Servery a Conglomerate Host' }, slug: 'servers-conglomerate-host' },
    ],
  },
  {
    label: 'Understand the system',
    translations: { cs: 'Jak Lazurio funguje' },
    items: [
      { label: 'How Lazurio works', translations: { cs: 'Princip fungování' }, slug: 'how-lazurio-works' },
      { label: 'Data access and security', translations: { cs: 'Přístup k datům a bezpečnost' }, slug: 'data-access-security' },
      { label: 'Deployment and operations', translations: { cs: 'Nasazení a provoz' }, slug: 'deployment-operations' },
      { label: 'Connecting an Environment to apps', translations: { cs: 'Napojení Prostředí na aplikace' }, slug: 'environment-app-connections' },
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
