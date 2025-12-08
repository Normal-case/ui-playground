import type { Blog } from '@/types/blog'

/**
 * 블로그 글 목록
 * 정적 콘텐츠로 관리되며 각 글의 메타데이터를 포함합니다.
 */
export const BLOGS: Blog[] = [
  {
    id: 'react-fast-refresh',
    title: 'React Fast Refresh ',
    content: '', // 컴포넌트로 렌더링되므로 비워둠
    excerpt:
      'React Fast Refresh의 동작 원리를 깊이 파헤치고, 언제 state가 보존되고 언제 초기화되는지 알아봅니다. Fiber 트리, Signature 추적, 그리고 왜 하나의 파일에 하나의 컴포넌트만 있어야 하는지를 다룹니다.',
    createdAt: '2024-12-03',
    updatedAt: '2024-12-03',
    tags: ['React', 'Fast Refresh', 'HMR', 'Frontend', 'Developer Experience'],
  },
  {
    id: 'rotated-shape-resize',
    title: '회전된 도형 리사이즈하기',
    content: '', // 컴포넌트로 렌더링되므로 비워둠
    excerpt:
      '회전된 도형을 자연스럽게 리사이즈하는 방법을 알아봅니다. 전역 좌표계와 로컬 좌표계의 개념, 회전 변환 행렬, 그리고 실제 구현 방법을 다룹니다.',
    createdAt: '2024-11-11',
    updatedAt: '2024-11-11',
    tags: ['JavaScript', 'Math', 'Interactive', 'Linear Algebra', 'Frontend'],
  },
  {
    id: 'rotation-angle-calculation',
    title: '도형 회전 각도 계산의 원리',
    content: '', // 컴포넌트로 렌더링되므로 비워둠
    excerpt:
      'atan2 함수를 활용하여 마우스 드래그로 도형을 회전시키는 원리를 알아봅니다. 라디안-도 변환, 각도 정규화 등 회전 구현의 핵심 개념을 다룹니다.',
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
