import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites are served from /<repository>/.
export default defineConfig({
  base: '/speakmate/',
  plugins: [react()],
})
