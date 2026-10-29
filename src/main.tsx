import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build is pre-rendered (scripts/prerender.js); the dev server's root arrives empty.
if (rootElement.hasChildNodes()) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);
