import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { normalizePath } from './lib/nav';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pages are prerendered to static HTML at build time (scripts/prerender.js).
// Hydrate when the static markup belongs to this URL; otherwise (dev server,
// or an unknown URL served the home page as a fallback) render from scratch.
if (container.hasChildNodes() && container.dataset.path === normalizePath(window.location.pathname)) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
