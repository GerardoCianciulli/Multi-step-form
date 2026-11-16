import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from https://GerardoCianciulli.github.io/Multi-step-form/
  base: '/Multi-step-form/',
  plugins: [react()],
})
