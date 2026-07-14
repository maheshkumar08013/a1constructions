import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/a1construction/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' ? 'https://a1.sunsysweb.co.in' : 'http://localhost:3000',
        changeOrigin: true
      },
      '/uploads': {
        target: process.env.NODE_ENV === 'production' ? 'https://a1.sunsysweb.co.in' : 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          tanstack: ['@tanstack/react-query'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
