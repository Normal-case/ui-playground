import { Link } from 'react-router-dom'
import { Flex, Heading } from '@radix-ui/themes'

import { ThemeToggle } from '@/components/ui/theme-toggle'

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
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
            <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
          )}
        </Flex>
      </Flex>
    </header>
  )
}
