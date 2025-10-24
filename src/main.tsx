import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter.tsx'
import './styles/tailwind.css'

// Register service worker in production
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  import('./sw.ts').then(({ registerSW }) => {
    registerSW();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
