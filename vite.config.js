import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/LLCCProject/',  // ✅ add trailing slash!
  plugins: [react()],
})
