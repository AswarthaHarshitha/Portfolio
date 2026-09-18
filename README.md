# Sugreevu Aswartha Harshitha — Portfolio

My personal portfolio. I built it because I wanted something that actually shows how I think about building software instead of another templated one-pager — so the hero is a real physics simulation instead of a static image, and every project on the page is pulled from an actual GitHub repo with a description written from that repo's real code, not a one-line guess.

**Live:** [harshitha-portfolio-inky.vercel.app](https://harshitha-portfolio-inky.vercel.app) · mirrored on [GitHub Pages](https://aswarthaharshitha.github.io/Portfolio/)

## What's on it

- **Hero** — a pile of tech chips (React, Python, SAP Fiori, TensorFlow, and the rest of my stack) dropped into a `react-three-fiber` + Rapier physics scene. They collide, settle, and react to your cursor like real objects — it's not a CSS animation pretending to be one.
- **Intro splash** — a short sequence that scrambles into my name, types out my email character by character, and narrates a short summary of who I am out loud using the browser's built-in speech synthesis. It waits for your first tap or click before it speaks, since most browsers block autoplaying audio otherwise.
- **About / Skills / Journey** — the real timeline: SRM University AP, both internships, the certifications, and the stack I've actually shipped with rather than just read about.
- **Projects** — every card here is a real repo. Descriptions were written from each project's own README and source, not invented, and each one links straight to the code (and a live demo where one exists).
- **Publications & Certifications** — my IEEE/SN papers and my SAP, AWS, Oracle, and NPTEL certifications, each linking to a real verification page or the certificate itself.
- **Contact** — a working message form plus direct email, phone, GitHub, and LinkedIn.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- `three.js` / `@react-three/fiber` / `@react-three/drei` / `@react-three/rapier` for the hero scene
- Framer Motion for everything else

## Running it locally

```bash
npm install
npm run dev       # start the dev server
npm run build     # tsc -b && vite build
npm run preview   # preview the production build
```

## Where the content lives

Everything text-based is data, not hardcoded into components, so updating the site means editing a file, not hunting through JSX:

| File | Content |
|---|---|
| `src/data/profile.ts` | name, title, bio, contact links |
| `src/data/projects.ts` | every project card |
| `src/data/experience.ts`, `education.ts` | the timeline |
| `src/data/certifications.ts`, `publications.ts` | credentials |
| `src/data/skills.ts` | the tech stack grid |

## Deployment

Production runs on Vercel, mirrored to GitHub Pages via the `gh-pages` branch. `GH_PAGES=true` gates the `/Portfolio/` base path in `vite.config.ts` so it only applies to the Pages build, not Vercel or local dev.
