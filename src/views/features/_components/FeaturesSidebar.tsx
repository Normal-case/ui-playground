import { Sidebar, type SidebarSection } from '@/components/ui/sidebar'

const featuresSidebarData: SidebarSection[] = [
  {
    title: 'DragAndDrop',
    items: [
      { title: 'Basic DND', href: '/features/dnd/basic' },
      { title: 'Resize DND', href: '/features/dnd/resize' },
      { title: 'Rotate DND', href: '/features/dnd/rotate' },
    ],
  },
  {
    title: 'Editor',
    items: [{ title: 'Basic Editor', href: '/features/editor/basic' }],
  },
  {
    title: 'Recent Features',
    items: [
      {
        title: 'Advanced Theme Toggle',
        href: '/features/advanced-theme-toggle',
      },
      {
        title: 'Responsive Sidebar',
        href: '/features/responsive-sidebar',
      },
      {
        title: 'Card Hover Effects',
        href: '/features/card-hover-effects',
      },
    ],
  },
]

export function FeaturesSidebar() {
  return <Sidebar sections={featuresSidebarData} />
}
