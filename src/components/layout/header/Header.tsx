import { Link, useLocation } from 'react-router-dom'
import { Flex, Heading } from '@radix-ui/themes'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/shared/lib/cn'

interface HeaderProps {
  title?: string
  onThemeToggle?: () => void
  isDarkMode?: boolean
}

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/features', label: 'Features' },
]

export function Header({
  title = 'UI Playground',
  onThemeToggle,
  isDarkMode = false,
}: HeaderProps) {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <Flex
        justify="between"
        align="center"
        className="container mx-auto px-4 py-4"
      >
        <Link to="/" className="no-underline">
          <Heading
            size="6"
            className="font-bold cursor-pointer hover:opacity-80 transition-opacity"
          >
            {title}
          </Heading>
        </Link>

        <Flex gap="3" align="center">
          {/* 메뉴목록 */}
          <nav className="flex gap-1">
            {menuItems.map(item => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                    'hover:bg-accent/10 hover:text-accent-foreground',
                    'before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2',
                    'before:w-0 before:h-0.5 before:bg-accent before:transition-all before:duration-200',
                    'hover:before:w-3/4',
                    isActive && [
                      'text-accent-foreground bg-accent/10',
                      'before:w-3/4 before:bg-accent',
                    ]
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {/* 테마 토글 */}
          <Flex
            gap="3"
            align="center"
            className="ml-2 pl-2 border-l border-border"
          >
            {onThemeToggle && (
              <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </header>
  )
}
