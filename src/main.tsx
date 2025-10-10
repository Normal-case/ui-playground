import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@radix-ui/themes/styles.css'
import './index.css'
import App from './App'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element with id "root" not found')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
