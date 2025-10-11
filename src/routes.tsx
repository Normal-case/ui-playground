import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'

// Pages
import HomePage from './views/home'
import BlogListPage from './views/blogs'
import BlogDetailPage from './views/blogs/[id]'

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
    ],
  },
])
