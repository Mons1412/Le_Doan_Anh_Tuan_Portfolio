# Le Doan Anh Tuan — Single Page Portfolio

A bilingual (English / Tiếng Việt), responsive static portfolio inspired by the design language of Brittany Chiang v4: https://v4.brittanychiang.com/ . This is an independently written implementation, **not a copy of her source code**.

## Run locally

1. Extract the ZIP archive.
2. Double-click `index.html` to preview. The site does not need Node.js, npm, or a backend.
3. For best local testing, open a terminal in this folder and run `python -m http.server 8080`; visit http://localhost:8080 .
4. Deploy the complete folder to Netlify (drag & drop), GitHub Pages, or any static host. On Netlify the contents of this folder must be published as the site root.

## Customize

- `config.js`: Enter your **actual** public GitHub / GitLab / Facebook / LinkedIn URLs and any project repository URLs. Unconfigured icons intentionally show a message rather than linking to a stranger's account.
- `index.html`: Change the intro, education, experience, technologies and project content. Every bilingual text element has `data-en` and `data-vi`; update **both** attributes together.
- `styles.css`: Colors, responsive layout, typography, animations. Brand colors are declared under `:root`.
- `resume/`: Two downloadable résumé PDFs (EN & VI). Their content was prepared as a draft from existing user project information. **Review and edit the résumé before sending it to employers.** To regenerate after edits, modify and run `tools/build_resumes.py` (Python + ReportLab).
- `assets/`: Original illustrative SVG mockups and logo, **not actual product screenshots**. Replace with real screenshots if desired.

## Features

- Fixed responsive header and mobile slide-out navigation with keyboard trap, Escape close, outside click
- Language switch and remembered choice via localStorage
- Smooth anchors, active nav, gentle reveal animations (respects prefers-reduced-motion)
- Accessible keyboard-operable experience tabs
- Download matching EN or VI résumé PDF
- GitHub / GitLab / Facebook / LinkedIn icon rails and mobile footer icons
- Copy email and mailto contact CTA
- No build tools or JavaScript libraries required; fonts are loaded from Google Fonts with system fallbacks

## Attribution

Design inspiration: [Brittany Chiang — Portfolio v4](https://v4.brittanychiang.com/). Her public v4 repository requests visible credit if her work inspires derivatives; this site includes attribution in the footer.
