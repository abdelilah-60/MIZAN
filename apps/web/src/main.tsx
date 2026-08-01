import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import L from 'leaflet'

if (typeof window !== 'undefined') {
  (window as any).L = L
}

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import './index.css'
import './i18n/config'

// Intercept global fetch for /api requests in production to route to Railway API
if (!import.meta.env.DEV || import.meta.env.VITE_API_URL) {
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if (typeof input === "string" && input.startsWith("/api/")) {
      const apiBase = import.meta.env.VITE_API_URL || "https://mizanapi-production-c355.up.railway.app";
      const cleanBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
      input = `${cleanBase}${input}`;
    }
    return originalFetch(input, init);
  };
}

import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
