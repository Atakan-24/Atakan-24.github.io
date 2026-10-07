# Personal developer portfolio

Static English and German pages for Atakan's software work. Team Gold's company website is a separate project.

- `index.html`: English content.
- `de/index.html`: independently written German content, with the same project and verification facts.
- `styles.css`: shared responsive layout.
- `cv/`: CV downloads matching the profile repository.
- `privacy.html`: hosting and contact information.
- `tests/check_site.py`: structural, local-link and content checks.

There is no build step, JavaScript, third-party font, tracking or chatbot request. Local preview:

```sh
python3 -m http.server 8000
```

Run validation with `python3 tests/check_site.py`. Browser review is also needed for layout, keyboard navigation and mobile rendering. GitHub Pages manages serving and transport headers; the page includes a restrictive meta CSP, which cannot replace all HTTP security headers.

The old experimental presentation remains available in Git history. `/v1/` points visitors to the current portfolio.
