// 공통 타입 정의

export type ThemeAppearance = 'light' | 'dark'

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LayoutProps extends BaseComponentProps {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
}

// Blog 타입 re-export
export type { Blog, CreateBlogDto } from './blog'
