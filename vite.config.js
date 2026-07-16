import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ai-driven-hiring-platform/',   // 👈 ADD THIS LINE
  plugins: [react()],
})