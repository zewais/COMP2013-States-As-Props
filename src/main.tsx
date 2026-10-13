import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Mount React in the root element supplied by index.html. The ! tells TypeScript
// this element exists; it does not perform a runtime check.
// StrictMode enables development checks, including extra renders and initializer
// calls to help expose impure logic. Production does not repeat these checks.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
