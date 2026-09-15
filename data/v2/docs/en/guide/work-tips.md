---
title: Tips for working
description: Practical ways to make working with an AI Colleague easier.
stableId: lazurio-doc-guide-work-tips
locale: en
summary: How an AI Colleague uses the built-in browser of its own tool (Browser Use) for web work while you keep control over access and important actions.
updatedAt: "2026-09-15"
reviewedAt: "2026-09-15"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-collaboration-model
  - lazurio-external-apps
  - openai-browser
audience:
  - decision-maker
  - builder
  - agent
---

## When an AI Colleague needs to work on the web

**Browser Use** means working directly in a website's interface: an agent opens
pages, clicks and fills fields. This is different from simply searching for
links and is not a Lazurio feature. Availability depends on the AI tool.

## Get started in ChatGPT

In the ChatGPT desktop app, chat and the built-in browser can appear side by side.
Open it from the toolbar or with **Cmd + Shift + B** on Mac
(**Ctrl + Shift + B** on Windows). Use **`@Browser`** in your request
and select the suggested browser mention. Do not expect the same interface
in Codex CLI or the IDE extension.

1. **Give a URL and a goal.** What should the agent find or prepare?
2. **Set boundaries.** What may it read, and what must it not change or submit?
3. **Watch the open page.** Check the website and requests for access.
4. **Sign in yourself.** The built-in browser has its own profile; your regular sign-in is not automatically shared.
5. **Verify the result.** Ask to see the source or prepared form.

## Prompt: find information on a website

Copy this into your chat and replace the bracketed placeholders.

```text
@Browser Use the built-in browser to open [website URL].
Find [what I need to know] on the page.
Work directly with the open page, not just search results.
Do not submit anything, make purchases or change settings.
Finish with a summary and links to the pages you used.
If Browser Use is unavailable, say so. Do not pretend to operate the page.
```

## Prompt: prepare a form without submitting it

```text
@Browser Open [website URL] and help me prepare [form name].
First inspect the fields and tell me which information you need.
If sign-in is required, pause and let me sign in myself.
Fill only the information I provide for this task.
Before submission, stop and show me the completed form for review.
Do not submit without my explicit approval for that submission.
Do not ask for passwords or verification codes in chat.
```

## Steer the agent

Be specific, for example: **“Use the currently open tab. Show me the Contact
section and do not click anything yet.”** If the interface offers page comments,
mark the relevant area directly. If a tool is unavailable, ask about supported
options; a prompt alone does not install a missing tool.

:::note[Keep in mind]
Access to a website is not approval for every action. Page content can contain
misleading instructions and should not override your request. Approve sensitive,
destructive and publishing steps separately. Never put passwords or secrets
in an ordinary chat.
:::

Source for controls and availability: [OpenAI — Browser](https://learn.chatgpt.com/docs/browser).
The interface may change with the app version and workplace settings.
