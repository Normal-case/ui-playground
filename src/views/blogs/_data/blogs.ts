import type { Blog } from '@/types/blog'

/**
 * 블로그 글 목록
 * 정적 콘텐츠로 관리되며 각 글의 메타데이터를 포함합니다.
 */
export const BLOGS: Blog[] = [
  {
    id: 'rotation-angle-calculation',
    title: '도형 회전 각도 계산의 원리',
    content: '', // 컴포넌트로 렌더링되므로 비워둠
    excerpt:
      'atan2 함수를 활용하여 마우스 드래그로 도형을 회전시키는 원리를 알아봅니다. 라디안-도 변환, 각도 정규화 등 회전 구현의 핵심 개념을 다룹니다.',
    author: {
      name: '여찬복',
    },
    createdAt: '2024-11-08',
    updatedAt: '2024-11-08',
    tags: ['JavaScript', 'Math', 'Interactive', 'Frontend'],
  },
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
