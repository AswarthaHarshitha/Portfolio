# Aswartha Harshitha — Portfolio

A cinematic, physics-driven portfolio built with React, TypeScript, Tailwind CSS, and a react-three-fiber + Rapier physics hero scene.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **three.js / @react-three/fiber / @react-three/drei / @react-three/rapier** — the interactive hero scene (draggable, physics-based tech chips)
- **Framer Motion**, **lucide-react**

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Content that still needs your input

Everything project-related is pulled from real GitHub repos (`src/data/projects.ts`). Personal details are placeholders — edit `src/data/profile.ts`:

- `title` — confirm your preferred headline title
- `bio` — replace with your own words
- `links.email` — add a real email (the Contact section hides the Email button until this is set)
- `links.resumeUrl` — add a resume PDF if you want a download button later

## Project data

`src/data/projects.ts` holds every project shown on the site — title, description, tech stack, links, and role tags (used by the filter chips on the Projects section). Descriptions were written from each repo's actual README/source, not guessed — update this file directly as your repos change.
