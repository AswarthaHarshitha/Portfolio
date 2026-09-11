import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves project sites at /<repo-name>/, not the domain root —
  // production assets need this prefix or they 404 once deployed there. Dev
  // stays at root so `npm run dev` keeps working at plain localhost.
  base: command === 'build' ? '/Portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
