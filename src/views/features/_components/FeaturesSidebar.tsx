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
    items: [
      { title: 'Markdown Editor', href: '/features/editor/markdown' },
      { title: 'HTML Editor', href: '/features/editor/html' },
    ],
  },
  {
    title: 'Form',
    items: [
      { title: 'Basic Form', href: '/features/form/basic' },
      { title: 'Safe Pad', href: '/features/form/safePad' },
    ],
  },
]

export function FeaturesSidebar() {
  return <Sidebar sections={featuresSidebarData} />
}
