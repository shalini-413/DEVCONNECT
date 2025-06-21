import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  // ✅ Important for SPA routing
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/',
});
