import type { Blog } from '@/types/blog'

/**
 * 블로그 글 목록
 * 정적 콘텐츠로 관리되며 각 글의 메타데이터를 포함합니다.
 */
export const BLOGS: Blog[] = [
  {
    id: 'polygon-shapes',
    title: 'CSS로 다각형 그리는 방법',
    content: '', // 컴포넌트로 렌더링되므로 비워둠
    excerpt:
      'CSS Border Trick과 clip-path를 활용하여 삼각형, 별, 육각형 등 다양한 다각형을 그리는 방법을 알아봅니다.',
    author: {
      name: '여찬복',
    },
    createdAt: '2024-11-01',
    updatedAt: '2024-11-01',
    tags: ['CSS', 'Frontend', 'Design'],
  },
  {
    id: 'react-19',
    title: 'React 19의 새로운 기능들',
    content:
      'React 19에서는 많은 새로운 기능들이 추가되었습니다. Server Components, Actions, use API 등 주요 변경사항들을 살펴봅니다.',
    excerpt: 'React 19의 주요 업데이트와 변경사항을 알아봅니다.',
    author: {
      name: '김개발',
    },
    createdAt: '2024-10-31',
    updatedAt: '2024-10-31',
    tags: ['React', 'Frontend'],
  },
  {
    id: 'typescript-patterns',
    title: 'TypeScript 고급 패턴',
    content:
      'TypeScript의 고급 타입 패턴들을 다룹니다. Conditional Types, Mapped Types, Template Literal Types 등을 실무 예제와 함께 알아봅니다.',
    excerpt: '실무에서 유용한 TypeScript 타입 패턴들을 소개합니다.',
    author: {
      name: '박타입',
    },
    createdAt: '2024-10-30',
    updatedAt: '2024-10-30',
    tags: ['TypeScript', 'Development'],
  },
  {
    id: 'vite-optimization',
    title: 'Vite로 프로젝트 최적화하기',
    content:
      'Vite를 사용한 빌드 최적화 방법을 알아봅니다. Code Splitting, Lazy Loading, 플러그인 활용 등 실전 최적화 기법들을 소개합니다.',
    excerpt: 'Vite의 강력한 기능들로 개발 경험을 향상시키세요.',
    author: {
      name: '이빌드',
    },
    createdAt: '2024-10-29',
    updatedAt: '2024-10-29',
    tags: ['Vite', 'Build', 'Performance'],
  },
]

/**
 * ID로 블로그 글 찾기
 */
export function getBlogById(id: string): Blog | undefined {
  return BLOGS.find(blog => blog.id === id)
}

/**
 * 모든 블로그 글 가져오기
 */
export function getAllBlogs(): Blog[] {
  return BLOGS
}
