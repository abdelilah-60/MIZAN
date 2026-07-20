import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
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

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
