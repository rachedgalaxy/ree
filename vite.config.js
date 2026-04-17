import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/wc-api': {
        target: 'https://redeem-dz.com/wp-json/wc/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wc-api/, ''),
      },
    },
  },
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Redeem Store | متجر ريديم',
        short_name: 'Redeem',
        description: 'Premium Gaming & Digital Cards Store',
        start_url: '/',
        display: 'standalone',
        background_color: '#f5f5f7',
        theme_color: '#e11e3b',
        icons: [
          {
            src: 'https://redeem-dz.com/wp-content/uploads/2026/03/redeem-emeil-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://redeem-dz.com/wp-content/uploads/2026/03/redeem-emeil-logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'https://redeem-dz.com/wp-content/uploads/2026/03/redeem-emeil-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
