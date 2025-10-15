import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'

// Pages
import HomePage from './views/home/page'
import BlogListPage from './views/blogs/page'
import BlogDetailPage from './views/blogs/[id]/page'
import FeaturesPage from './views/features/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'blogs',
        children: [
          {
            index: true,
            element: <BlogListPage />,
          },
          {
            path: ':id',
            element: <BlogDetailPage />,
          },
        ],
      },
      {
        path: 'features',
        element: <FeaturesPage />,
      },
    ],
  },
])
