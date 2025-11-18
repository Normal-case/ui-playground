import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ThemeProvider } from '@/shared/hooks/use-theme'
import { LayerProvider } from '@/shared/contexts/LayerContext'
import { THEME } from '@/constants'

import '@radix-ui/themes/styles.css'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey={THEME.STORAGE_KEY}>
      <LayerProvider>
        <RouterProvider router={router} />
      </LayerProvider>
    </ThemeProvider>
  </StrictMode>
)
