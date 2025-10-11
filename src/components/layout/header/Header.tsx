import { Link } from 'react-router-dom'
import { Flex, Heading, IconButton } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

interface HeaderProps {
  title?: string
  onThemeToggle?: () => void
  isDarkMode?: boolean
}

export function Header({
  title = 'UI Playground',
  onThemeToggle,
  isDarkMode = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/20 backdrop-blur-md">
      <Flex
        justify="between"
        align="center"
        className="container mx-auto px-4 py-4"
      >
        <Link to="/" className="no-underline">
          <Heading size="6" className="font-bold cursor-pointer">
            {title}
          </Heading>
        </Link>

        <Flex gap="3" align="center">
          {onThemeToggle && (
            <IconButton
              variant="ghost"
              onClick={onThemeToggle}
              aria-label="테마 전환"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </IconButton>
          )}
        </Flex>
      </Flex>
    </header>
  )
}
