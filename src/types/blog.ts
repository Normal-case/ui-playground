export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    name: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
  tags: string[]
  coverImage?: string
}

export interface CreateBlogDto {
  title: string
  content: string
  tags: string[]
}
