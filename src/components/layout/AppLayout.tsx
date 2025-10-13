import { Outlet } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { Header } from './header'
import { useTheme } from '@/shared/hooks/use-theme'

export function AppLayout() {
  const { theme, setTheme } = useTheme()
  const appearance =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme

  const toggleTheme = () => {
    const next = appearance === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return (
    <Theme
      appearance={appearance}
      accentColor="violet"
      grayColor="slate"
      radius="large"
      scaling="105%"
    >
      <div className="min-h-screen bg-background">
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
