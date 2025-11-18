// 앱 전역 상수

export const APP_NAME = 'UI Playground'

export const THEME = {
  STORAGE_KEY: 'theme-preference',
  DEFAULT: 'dark' as const,
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SETTINGS: '/settings',
  FEATURES: '/features',
  BLOGS: '/blogs',
} as const

// 마크다운 관련 상수
export { MARKDOWN_PATTERNS, MARKDOWN_HTML_TEMPLATES } from './markdown'
