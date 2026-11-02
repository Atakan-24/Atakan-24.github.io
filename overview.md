# Portfolio source overview

- `index.html`: English portfolio copy and existing interactive examples.
- `de/index.html`: German edition with the same project links.
- `scrollcraft.css` / `scrollcraft.js`: shared visual tokens and scroll behavior.
- `project-media.css` / `project-media.js`: project previews and visitor-controlled video playback.
- `projects/`: reviewed bilingual documentation for the 16 public repositories, with diagrams, local screenshots and links to public project media.
- `og.jpg`: image shown when a portfolio link is shared.
- `v1/`: clearly identified historical edition.

The site is static and served from the repository root. Preview with `python3 -m http.server 8765 --bind 127.0.0.1`.
