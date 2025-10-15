import { Link } from 'react-router-dom'
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
  return (
    <aside className={cn('space-y-8', className)}>
      {sections.map((section, index) => (
        <div key={index}>
          <h3 className="text-sm font-medium text-foreground mb-4">
            {section.title}
          </h3>
          <nav className="space-y-2">
            {section.items.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  )
}
