import { useState, useEffect } from 'react'
import type { Blog } from '@/types/blog'

// Mock 데이터 (나중에 실제 API로 교체)
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'React 19의 새로운 기능들',
    content: 'React 19에서 추가된 새로운 기능들을 살펴봅니다...',
    excerpt: 'React 19의 주요 업데이트와 변경사항을 알아봅니다.',
    author: {
      name: '김개발',
      avatar: undefined,
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1일 전
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['React', 'Frontend'],
    coverImage: undefined,
  },
  {
    id: '2',
    title: 'TypeScript 고급 패턴',
    content: 'TypeScript의 고급 타입 패턴들을 다룹니다...',
    excerpt: '실무에서 유용한 TypeScript 타입 패턴들을 소개합니다.',
    author: {
      name: '박타입',
    },
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2일 전
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    tags: ['TypeScript', 'Development'],
  },
  {
    id: '3',
    title: 'Vite로 프로젝트 최적화하기',
    content: 'Vite를 사용한 빌드 최적화 방법을 알아봅니다...',
    excerpt: 'Vite의 강력한 기능들로 개발 경험을 향상시키세요.',
    author: {
      name: '이빌드',
    },
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3일 전
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    tags: ['Vite', 'Build', 'Performance'],
  },
]

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API 호출
    // const fetchBlogs = async () => {
    //   const response = await fetch('/api/blogs')
    //   const data = await response.json()
    //   setBlogs(data)
    // }

    // Mock 데이터 시뮬레이션
    const timer = setTimeout(() => {
      setBlogs(mockBlogs)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return { blogs, isLoading }
}

export function useBlog(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock 데이터에서 찾기
    const timer = setTimeout(() => {
      const foundBlog = mockBlogs.find(b => b.id === id)
      setBlog(foundBlog || null)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [id])

  return { blog, isLoading }
}
