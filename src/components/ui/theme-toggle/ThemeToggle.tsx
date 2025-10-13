import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

interface ThemeToggleProps {
  isDarkMode?: boolean
  onToggle?: () => void
  className?: string
}

export function ThemeToggle({
  isDarkMode = false,
  onToggle,
  className,
}: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 items-center rounded-full bg-muted transition-colors duration-300 hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${className || ''}`}
      aria-label="테마 전환"
    >
      {/* 슬라이딩 토글 */}
      <span
        className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-background shadow-lg transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {/* 아이콘 페이드 애니메이션 */}
        <span className="inline-flex items-center justify-center animate-in fade-in zoom-in duration-300">
          {isDarkMode ? (
            <MoonIcon className="h-3 w-3 text-primary" />
          ) : (
            <SunIcon className="h-3 w-3 text-primary" />
          )}
        </span>
      </span>

      {/* 배경 아이콘 (반대편 힌트) */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-300">
        <SunIcon
          className={`h-3 w-3 text-muted-foreground/50 transition-opacity ${
            isDarkMode ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-300">
        <MoonIcon
          className={`h-3 w-3 text-muted-foreground/50 transition-opacity ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </span>
    </button>
  )
}
