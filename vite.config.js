import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/LLCCADVERT/', // 👈 MUST MATCH YOUR REPO NAME EXACTLY
  plugins: [react()],
})
