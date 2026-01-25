import type React from 'react'
import { PolygonBlogContent } from './PolygonBlogContent'
import { RotationBlogContent } from './RotationBlogContent'
import { RotatedResizeBlogContent } from './RotatedResizeBlogContent'
import { FastRefreshBlogContent } from './FastRefreshBlogContent'
import { GraphQLBlogContent } from './GraphQLBlogContent'

/**
 * 블로그 ID와 컴포넌트 매핑
 * 새로운 블로그 글을 추가할 때 여기에 등록합니다.
 */
export const BLOG_CONTENT_MAP: Record<string, React.ComponentType> = {
  'graphql-intro': GraphQLBlogContent,
  'react-fast-refresh': FastRefreshBlogContent,
  'polygon-shapes': PolygonBlogContent,
  'rotation-angle-calculation': RotationBlogContent,
  'rotated-shape-resize': RotatedResizeBlogContent,
}

/**
 * ID에 해당하는 블로그 컴포넌트 가져오기
 */
export function getBlogContent(id: string): React.ComponentType | null {
  return BLOG_CONTENT_MAP[id] || null
}
