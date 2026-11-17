# Source verification — 17 November 2026

Fourteen sources were due for review by 29 November 2026. Each one was opened
again on 17 November 2026 and compared with the claims of every page in both
locales that cites it. A review window moves only where the source still
supports those claims, or where the page was corrected first. Thirteen
windows move; `lazurio-license` keeps its window ending 27 November 2026 because
its correction needs a product decision. The
repository's monthly cadence is retained: a renewed source is next due one
calendar month after this review, on 17 December 2026.

## Provider sources

Each page was fetched over HTTPS and read again in a separate browser session.

- **OpenAI Browser:** still confirms the separate built-in profile, New tab
  with a URL, Cmd/Ctrl+T, Cmd/Ctrl+Shift+B for the tabs beside the chat,
  `@Browser`, and that Browser is unavailable in Codex CLI and the Codex IDE
  extension. The page now also names ChatGPT on the web; the Guide's claims
  are about the desktop app and remain correct. The separately dated
  9 October observation about deleting a thread is not covered by this source
  and was not tested again.
- **Composio authentication:** still confirms hosted Connect Links, sign-in
  by the user, credentials stored encrypted and refreshed by Composio, and
  connected accounts stored under a userID. The page's statement that two
  Environments with the same Composio account share connections stays dated
  to its own 7 October check.
- **MCP local servers:** the unversioned address still redirects to the
  2026-07-28 version. It remains an example for Claude Desktop: servers run
  with the user's account permissions, expose tools used with approval and
  need a client restart. The Guide keeps the distinction between that example
  and other clients.
- **Google linked apps:** still confirms reviewing and removing a linked
  app's access, and that removing an agent's permission does not delete the
  account's link with the app. Closing a chat is still not revocation.
- **Wispr Context Awareness:** changed. The article (marked as updated
  three days before this review) now lists app info, textbox contents
  around the cursor, on-screen text, the user identifier in the app and the
  apps in the current session, and says the feature is on by default. It no
  longer names conversation history. The privacy note of
  `guide/recommended-apps` is corrected in both languages. The statements
  about screenshots, iPhone, turning the feature off in sensitive
  environments, what is still sent and the separate training and storage
  settings still hold.
- **CodexBar permissions:** the source is pinned to an immutable README
  revision and its digest is unchanged since 24 October. Full Disk Access is
  still optional and only for Safari cookies and local storage; Keychain,
  browser cookies and OAuth still depend on the provider.

| Source ID | URL read | SHA-256 of fetched source | Result |
| --- | --- | --- | --- |
| `openai-browser` | [Primary source](https://learn.chatgpt.com/docs/browser) | `c4ae3c968a27f25e21b433a4e4a2e08cb5763c1b5b7aca7406f580444299faa6` | confirmed |
| `composio-authentication` | [Primary source](https://docs.composio.dev/docs/authentication) | `ca10fbd391685248b9a5ee3bb3fc7b0108c9eca67bc096fdece9939faa4e377a` | confirmed |
| `mcp-local-servers` | [Primary source](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers) | `f2f3bbc991f8426a29681c8456c031e0539f8849863eacfe867ef6e1536537bd` | confirmed |
| `google-third-party-connections` | [Primary source](https://support.google.com/accounts/answer/13533235) | `8fa59ef388248b55db59080152734450eb098477b6e34155f0efa48a20bad454` | confirmed |
| `wispr-context-privacy` | [Primary source](https://docs.wisprflow.ai/articles/4678293671-Context-Awareness) | `d2aea0c659486425252b70a843256c949c708cd6f49d0f307c692941f0679530` | text corrected |
| `codexbar-permissions` | [Primary source](https://github.com/steipete/CodexBar/blob/d34fbb47afe73f81dd591bae28a60f72c39a9fe4/README.md#macos-permissions-why-theyre-needed) | `57b2a6ee96df91ee751744b752e430e93189dd3b46ab0baef9b6478026498eed` | confirmed |

Dynamic HTML may change independently of the facts cited; the digests only
identify the responses used. No HTML snapshots or provider data are imported
into this repository.

## Lazurio sources

Each pinned file was read at its pin and compared with the same file on the
current default branch: `HumanAndMachines/Lazurio` at
`31028d51893b2f7caa4a723dbe0081b4f17fbada` and `Lazurio/LazurioPlatform` at
`9ec84a9baecf735434ec54fe77a93e1550678db1`. Every page that cites a source
was read in both locales. A claim that a page labels as the state of the
pinned revision only needs the pin; a claim presented as current needs the
current source.

The six sources pinned to `3c5bda5` keep that pin. The earlier record keeps
historical product and architecture sections on their original revision,
and the pages link it throughout. Where a page presented a pinned statement as
today's state and the current source no longer supports it, the page now
either labels it as the state of that revision or cites the newer source
already in the evidence map.

- **`lazurio-readme` and `lazurio-architecture`:** the pin still supports
  every statement the pages tie to it. The current README and architecture
  still support the present-tense statements: a local working system and
  not an AI model, active development, no packaged installation yet, one
  machine as one trust domain, Organization folders that are not isolation,
  optional hosted services. Two statements read as current but are no longer
  true: decision 0164 replaced the generated non-Git root with the Lazurio
  Folder, and the Guide is now this public documentation. The English
  deployment table now names revision `3c5bda5` as its scope, as the Czech
  one already did, and drops "today"; both locales of how-lazurio-works say
  the packaged CLI and generated root were the target at that revision.
  The English how-lazurio-works page now links the revision it refers to, as
  the Czech page does.
- **`lazurio-collaboration-model`:** Draft and Publication, branches and pull
  requests without asking, exact-head approval, process where no mechanism
  exists, GitHub as the authority for repository access and the task agent
  without rights of its own all still hold on main. Two statements no longer
  hold. The pin says the harness sandbox bounds task agents; main follows
  decision 0172: agents in an Environment work with full access and no
  sandbox, and narrower rights need a separate Environment. The FAQ and the
  evidence page now say so and cite 0172 from the decision register already
  in the map. The pin says each connection belongs to one machine and no
  cloud broker is used; main permits Composio, whose connections belong to
  the Composio account. The use-cases page now describes one route per app
  and cites the current integration standard.
- **`lazurio-external-apps`:** per-machine OAuth grants, write access that is
  not consent to publish, approval modes that do not bound the shell, and
  supervised browser work still hold. The pin forbids shared brokers; the
  current standard (already pinned in the map as
  `lazurio-external-apps-current`) allows Composio as the one exception,
  routes work through a tool, Executor or Composio and switches ChatGPT apps
  off in an Environment. The IT briefing, the Copilot comparison and step 4 of
  the deployment page now follow the current standard.
- **`lazurio-secret-custody`:** secrets outside Git, custody by owner or
  Organization, no secrets in chat, and no claim of endpoint encryption,
  rotation or backup still hold on main, which adds a machine-wide custody
  location. The FAQ and the Czech data-access page said tracked files hold
  "schemas"; neither the pin nor main says so. They now list what the
  standard allows in Git: standard paths, pointers, variable names,
  instructions without secrets and metadata-only checks.
- **`lazurio-license`: not renewed.** `LICENSE.md` is byte-identical on the
  pin and on main, but the released Lazurio Platform uses Elastic License 2.0
  without an automatic Apache transition (`LICENSE` and `docs/licensing.md`
  in LazurioPlatform). The home page and the FAQ still call FSL-1.1-Apache-2.0
  Lazurio's current license, and the English IT table presents it as the
  current position. Which license the pages present as current is a product
  and legal decision. Issue #42 and the open pull request #48 already propose
  it, so this review changes no license text and leaves the window at
  27 November 2026. `ISSUES.open.json` records the consequence.
- **`lazurio-product-vocabulary`:** decisions 0170, 0175, 0179, 0185 and 0207
  remain in force; 0170 and 0207 gained addenda, including a Services
  Environment that is decided but not shown. Since decision 0226 the
  register in `HumanAndMachines/Lazurio` is only a GEN3 record and defers to
  the public register in LazurioPlatform, so the source now points there, at
  `f9af2b7c8e6962d12986e369e6d09cf1d0fed2d1`, whose register equals main.
  The glossary's statements hold there. Two glossary lines did not follow
  them: "Open" named Launchpad, which decision 0170 keeps internal, and
  Personalspace was called a term of older sources although it is still the
  technical name. Both are corrected in both locales.
- **`lazurio-user-roles-current`:** the F30 section is identical at the pin
  and on main, has no new addendum and keeps its heading and anchor. The pages'
  statements about the user, the user's final say, the Colleague and the
  retired Principal still hold; Buddy's rights and mandates stay cited to
  decision 0089. The pin stays.

| Source ID | Read at | Compared with | Result |
| --- | --- | --- | --- |
| `lazurio-readme` | `3c5bda5` README.md (blob `070ec3b1a6ef`) | main README.md (blob `b47f80e37a05`) | text corrected |
| `lazurio-architecture` | `3c5bda5` ARCHITECTURE.md (blob `bf12cf304be1`) | main ARCHITECTURE.md (blob `ec5908c5ee7e`) | text corrected |
| `lazurio-collaboration-model` | `3c5bda5` AGENTS.md (blob `5bb8448d27c9`) | main AGENTS.md (blob `e7597aead3c8`) | text corrected |
| `lazurio-external-apps` | `3c5bda5` external-app-integrations.md (blob `69fd8794fa53`) | main (blob `37bfd6ebeffc`) | text corrected |
| `lazurio-secret-custody` | `3c5bda5` local-secret-custody.md (blob `d4aac6693d96`) | main (blob `34975ca9015a`) | text corrected |
| `lazurio-license` | `3c5bda5` LICENSE.md (blob `27224345f001`) | main (identical) and LazurioPlatform `LICENSE` | not renewed |
| `lazurio-product-vocabulary` | `6416d27` decision-register.md | HumanAndMachines main and LazurioPlatform `f9af2b7` register | confirmed, re-pinned, glossary corrected |
| `lazurio-user-roles-current` | `4681f49` decisions.md, F30 | LazurioPlatform main, F30 identical | confirmed |

Not checked in this review: text inside SVG diagrams, and claims that the
same pages draw from sources that were not due.

## Dates

Each corrected page moves only its `updatedAt`. No page's `reviewedAt` moves:
this review covered the fourteen due sources, not every fact of the pages
that cite them. No security audit, provider verification beyond the listed
sources or publication approval is claimed.
