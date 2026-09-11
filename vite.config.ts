import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(() => ({
  // GitHub Pages serves this repo at /Portfolio/, not the domain root, so
  // that deploy needs GH_PAGES=true set for the build to prefix assets
  // correctly. Every other target (Vercel, local dev) serves from its own
  // root, so the default stays '/' — do NOT hardcode '/Portfolio/' as the
  // default or it silently breaks every other deploy target's asset paths.
  base: process.env.GH_PAGES === 'true' ? '/Portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
