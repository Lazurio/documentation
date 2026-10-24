# Source verification for publication — 24 October 2026

The six expired provider sources were fetched and read again on 24 October
2026. The review windows below were advanced only after checking their content
against the documentation. The original monthly review cadence is retained:
next review by 24 November 2026.

## Provider findings

- **OpenAI Browser:** confirms the separate built-in profile, New tab,
  Cmd/Ctrl+T, Cmd/Ctrl+Shift+B and @Browser. Browser is unavailable in Codex
  CLI and the IDE extension. The Guide's separately dated 9 October observation
  about thread deletion remains an observation, not a newly tested UI claim.
- **Composio authentication:** confirms hosted connection links, user sign-in,
  stored/refreshed credentials and connected accounts associated with userID.
  This does not independently prove how Lazurio maps two machines to that ID;
  the public runtime question remains open.
- **MCP local servers:** the official URL redirects to the 2026-07-28 version.
  The page is an example for Claude Desktop, not a universal installation or
  permission guarantee for every AI client. The Guide retains that distinction.
- **Google linked apps:** confirms reviewing and removing provider access.
  Agent interaction permission and the underlying linked app are separate;
  closing a chat alone is not revocation.
- **Wispr Context Awareness:** the current page explicitly states that it
  uses text and does not take screenshots. Correct both languages. Retain
  data-processing approval, the iPhone limitation, separate training/storage
  settings and the fact that disabling context does not stop every data flow.
- **CodexBar permissions:** Full Disk Access remains optional and specific
  to Safari cookies/local storage. Browser cookies, Keychain and OAuth are
  provider-dependent. The source is pinned to an immutable README revision.

Fetched-source digests identify the responses used for this review. Dynamic
HTML may change independently of the facts being cited; no HTML snapshots or
provider data are imported into this repository.

| Source ID | URL read | SHA-256 of fetched source |
| --- | --- | --- |
| `openai-browser` | [Primary source](https://learn.chatgpt.com/docs/browser) | `25d689b441cdeb157dd96bcda9fab4fc01477c5a092c7ebbef4135814c08506d` |
| `composio-authentication` | [Primary source](https://docs.composio.dev/docs/authentication) | `5e4d77b88b27bfae35062daecff0eb5445a5311defd0f4e2f0cb798542c72362` |
| `mcp-local-servers` | [Primary source](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers) | `e3c18e78cc84d4137f8134c68be17762399ad6813e5c642afb63d673772ec78c` |
| `google-third-party-connections` | [Primary source](https://support.google.com/accounts/answer/13533235) | `5335b0dd7972d67c29be1cbda2c42490df837f5edde3fffb17f1897b6b402977` |
| `wispr-context-privacy` | [Primary source](https://docs.wisprflow.ai/articles/4678293671-Context-Awareness) | `7143816f24fbfb710697e0fbdbc26d917ed968a03937d7f87c826804f46ea5f4` |
| `codexbar-permissions` | [Primary source](https://github.com/steipete/CodexBar/blob/d34fbb47afe73f81dd591bae28a60f72c39a9fe4/README.md#macos-permissions-why-theyre-needed) | `57b2a6ee96df91ee751744b752e430e93189dd3b46ab0baef9b6478026498eed` |

## Lazurio source corrections

Public Lazurio revision `6416d27786296583baf08b75526cff225e2673f7` was read for:

- [the integration standard](https://github.com/HumanAndMachines/Lazurio/blob/6416d27786296583baf08b75526cff225e2673f7/manual/external-app-integrations.md): official MCP → official CLI → permitted Composio → reviewed open source → supervised browser for new connections; app tool → Executor → Composio for existing connections. Composio is the sole permitted shared-broker exception under its conditions; other shared brokers, scraping/session servers and new cloud connectors remain excluded. Credentials and call content pass through Composio, and access is not automatically isolated per machine.
- [the decision register](https://github.com/HumanAndMachines/Lazurio/blob/6416d27786296583baf08b75526cff225e2673f7/manual/decision-register.md): the current Environment vocabulary, Apps, Personal Workspace and Buddy in decisions 0170, 0175, 0179, 0185 and 0207 with their addenda. Product design is distinguished from availability in a particular installation and from legacy personal deployments.

These changes address the content problems in #31, #37 and #38. Those issues
are left open for their owners; this change does not independently close or
reprioritize them. Historical product and architecture sections keep their
original pinned revision and are labelled as such. Current integration policy
uses its own newer pin. The safety-contract tests are updated for both languages,
including explicit conditional Composio permission and credential custody.

Changed provider and glossary pages carry the date of this actual factual
review. The earlier editorial-only pass remains recorded separately in
[editorial-review-2026-10-24.md](editorial-review-2026-10-24.md).

## Release conditions

The operator authorized publication in the existing task thread. Production
still requires green checks and the repository's independent exact-head
approval. The GA4 owner must verify that history-based automatic pageviews are
disabled for `G-PBSK35RX41`; code-level `send_page_view: false` is not a
substitute. No approval or analytics readback is claimed by this record.
