# Atakan-24.github.io

Public · Application · 2026-11-02

A bilingual portfolio with project stories, interactive explanations and contact channels. Its introduction focuses on custom software and potential technical partnerships.

## Purpose

Explain engineering work through examples and enable a practical project conversation.

![Structure](../diagrams/atakan-24-github-io.en.svg)

## Features

- German and English editions, light and dark modes.
- Scroll-driven CRM illustration, scoring and pagination examples.
- Local quick answers plus a separate external free-text chat.
- Includes updated CRM and voice case studies and a new sharing image.
- Includes six project previews with media and linked DE/EN documentation for the 16 public repositories.

## Structure

- Static HTML pages contain content, page-specific CSS and JavaScript.
- scrollcraft.css and scrollcraft.js provide shared styling and scroll interactions.
- External Supabase functions serve free-text answers and visitor events; their backend was not reviewed here.

## Status and limits

- External chat answers and their knowledge base were not live-tested.
- Project stories are not a current uptime report for every described system.

## Getting started

Run from the repository directory for a local static preview. The current draft disables local analytics.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

## Key files

- `index.html`: English page and local interactions.
- `de/index.html`: German edition.
- `scrollcraft.js`: Scroll and motion system.
- `scrollcraft.css`: Shared visual rules.
- `og.jpg`: Sharing preview image.
- `project-media.css / project-media.js`: project-media layout and controlled playback.
- `projects/`: documentation and diagrams for public repositories only.

## Sources

Reviewed the public baseline and the published refresh. Desktop/mobile layouts, DE/EN links, project media and safe chat-link rendering were tested.

- [Portfolio source](https://github.com/Atakan-24/Atakan-24.github.io)
- [Live portfolio](https://atakan-24.github.io/)

## Images and demos

- [Capture of the refreshed portfolio home page, 2 Nov 2026.](../assets/portfolio-draft.png)
- [Currently published page; it may differ from the draft.](https://atakan-24.github.io/)
