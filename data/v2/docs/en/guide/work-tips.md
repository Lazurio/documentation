---
title: "Tips for working"
description: "Assign work in the browser and review the result."
stableId: lazurio-doc-guide-work-tips
locale: en
summary: "Assign work in the browser and review the result."
updatedAt: "2026-11-24"
reviewedAt: "2026-10-24"
reviewOwner: Anna Blazickova
secondReviewOwner: Pablo AI
trustCritical: true
sourceRefs:
  - lazurio-collaboration-model
  - lazurio-external-apps
  - openai-browser
  - lazurio-t3code-settle
audience:
  - decision-maker
  - builder
  - agent
---

## When an agent needs to work on the web

With **Browser Use**, an agent can open a website, read a page, click and
fill forms. Ask for it when the task needs work on the site, not just a list
of links. Your AI tool provides this feature, not Lazurio.

<figure>
  <a href="/guide-assets/chatgpt-browser-illustration-cs.png" aria-label="Open the illustrative mockup at full size">
    <img src="/guide-assets/chatgpt-browser-illustration-cs.png" alt="Illustrative mockup with Czech example text: ChatGPT and an @Browser prompt on the left, a Browser panel with a fictional contact page on the right." width="1605" height="980" loading="lazy" />
  </a>
  <figcaption>AI-generated mockup, not a screenshot: the task is on the left, the website
on the right. The site and details are fictional; the real interface may
differ. The Czech prompt asks for contact details without sending anything.
Click to enlarge.</figcaption>
</figure>

## Get started in ChatGPT

In the ChatGPT desktop app, chat and the built-in browser can appear side by side.
Open it with **New tab** and a URL, or with **Cmd + T** on Mac
(**Ctrl + T** on Windows). **Cmd + Shift + B** (**Ctrl + Shift + B** on
Windows) shows or hides the tabs beside the chat. Use **`@Browser`** in your request
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

## Delete an agent thread

In the ChatGPT desktop app, permanent deletion of a thread is offered only in
**Codex** mode:

1. At the top left, switch the selector from **ChatGPT** to **Codex**.
2. Right-click the thread in the sidebar.
3. Choose **Permanently delete**.

In ChatGPT mode the thread menu only offers **Archive**. An archived thread
stays stored; it is not deleted. Observed on 9 October 2026 in the ChatGPT app
for Windows; the interface may differ in other app versions.

## Tidy up finished chats with Settle

When the work in a chat is done, move it out of your list in Chat with
**Settle**. The chat is not deleted: it waits in **Settled** at the bottom
of the list, and the list keeps only the work still in progress.

1. **Hover over the finished chat** in the list on the left. **✓ Settle**
   appears on the right of the row.
2. **Click ✓ Settle.** The chat leaves the list and a notice at the bottom
   of the list offers to undo it.
3. **Find it at the bottom.** Click **Settled** to open the folder with your
   settled chats.

To bring a chat back, hover over it in **Settled** and click the arrow
(**Un-settle thread**). Right after settling, **Ctrl+Z** (**Cmd+Z** on Mac)
undoes it too, as long as you are not typing in a text field.

To settle several chats at once, select them with **Ctrl**-click
(**Cmd**-click on Mac), right-click one of them and choose **Settle**. The
menu shows how many chats you selected, for example **Settle (3)**.

<figure class="lz-diagram">
  <video controls playsinline preload="none" poster="/videos/settle-en.webp" aria-describedby="settle-video-words">
    <source src="/videos/settle-en.mp4" type="video/mp4" />
  </video>
  <figcaption id="settle-video-words">A 22-second video guide: the steps above in Chat, with quiet
music. The chats in it are made up. Also on
<a href="{{YOUTUBE_URL}}">YouTube</a>.</figcaption>
</figure>

The labels stay in English, as Chat shows them. Shown in Chat of a Lazurio
Environment (T3 Code 0.1.10-lazurio.4) on 23 November 2026; the interface may
change with the app version. Source: [T3 Code thread list](https://github.com/Lazurio/t3code/blob/b05167a204a0f5823077d155be819d773e29c616/apps/web/src/components/sidebar/SidebarThreadRow.tsx).
