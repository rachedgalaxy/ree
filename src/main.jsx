/**
 * Anti-Clickjacking Frame-Buster
 * Ensures the app only runs in the top-level window.
 */
if (window.self !== window.top) {
  window.top.location = window.self.location;
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

import { HelmetProvider } from 'react-helmet-async'

// Register Service Worker for PWA
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
