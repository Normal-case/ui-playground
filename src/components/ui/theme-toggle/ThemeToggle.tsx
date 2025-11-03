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
      className={`relative inline-flex h-8 w-16 items-center rounded-full border-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
          : 'bg-sky-100 border-sky-200 hover:bg-sky-200'
      } ${className || ''}`}
      aria-label="테마 전환"
    >
      {/* 슬라이딩 토글 */}
      <span
        className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {/* 아이콘 페이드 애니메이션 */}
        <span className="inline-flex items-center justify-center animate-in fade-in zoom-in duration-300">
          {isDarkMode ? (
            <MoonIcon className="h-4 w-4 text-slate-800" />
          ) : (
            <SunIcon className="h-4 w-4 text-sky-500" />
          )}
        </span>
      </span>

      {/* 배경 아이콘 (반대편 힌트) */}
      <span className="absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-300">
        <SunIcon
          className={`h-3.5 w-3.5 transition-opacity ${
            isDarkMode ? 'opacity-60 text-sky-300' : 'opacity-0'
          }`}
        />
      </span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300">
        <MoonIcon
          className={`h-3.5 w-3.5 transition-opacity ${
            isDarkMode ? 'opacity-0' : 'opacity-50 text-sky-400'
          }`}
        />
      </span>
    </button>
  )
}
