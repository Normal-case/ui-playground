import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export interface SidebarItem {
  title: string
  href: string
}

export interface SidebarProps {
  sections: SidebarSection[]
  className?: string
}

export function Sidebar({ sections, className }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className={cn('space-y-8', className)}>
      {sections.map((section, index) => (
        <div key={index}>
          <h3 className="text-sm font-medium text-foreground mb-4">
            {section.title}
          </h3>
          <nav className="space-y-2">
            {section.items.map(item => {
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'block text-sm transition-colors px-3 py-2 rounded-md',
                    isActive
                      ? 'text-sidebar-active font-semibold'
                      : 'text-sidebar-inactive hover:text-foreground'
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </aside>
  )
}
