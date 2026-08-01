import "@testing-library/jest-dom";

// Mock ResizeObserver for Recharts / Headless DOM
(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock Leaflet
(globalThis as any).L = {
  map: () => ({
    setView: () => {},
    remove: () => {},
    on: () => {},
  }),
  tileLayer: () => ({
    addTo: () => {},
  }),
  polygon: () => ({
    addTo: () => {},
  }),
} as any;
