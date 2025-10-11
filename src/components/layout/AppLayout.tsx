import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { Header } from './header'
import type { ThemeAppearance } from '@/types'

export function AppLayout() {
  const [appearance, setAppearance] = useState<ThemeAppearance>('dark')

  const toggleTheme = () => {
    setAppearance(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Theme
      appearance={appearance}
      accentColor="violet"
      grayColor="slate"
      radius="large"
      scaling="105%"
    >
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Header
          title="UI Playground"
          onThemeToggle={toggleTheme}
          isDarkMode={appearance === 'dark'}
        />

        <main>
          <Outlet />
        </main>
      </div>
    </Theme>
  )
}
