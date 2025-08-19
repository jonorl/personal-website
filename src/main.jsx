import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import AppAlt from './App-alt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <AppAlt /> */}
  </StrictMode>,
)
