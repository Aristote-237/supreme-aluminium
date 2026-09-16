import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base: built assets work from any hosting path
  // (domain root, sub-path like GitHub Pages /repo, etc.).
  base: './',
  plugins: [react(), tailwindcss()],
})
