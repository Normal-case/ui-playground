import { Card, Flex, Heading, Text, Badge } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import type { Blog } from '@/types/blog'
import { formatRelativeTime } from '@/shared/utils'

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link to={`/blogs/${blog.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <Flex direction="column" gap="3">
          {/* Cover Image */}
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* Content */}
          <Flex direction="column" gap="2">
            <Heading size="5">{blog.title}</Heading>
            <Text color="gray" size="2">
              {blog.excerpt}
            </Text>
          </Flex>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <Flex gap="2" wrap="wrap">
              {blog.tags.map(tag => (
                <Badge key={tag} variant="soft" color="violet">
                  {tag}
                </Badge>
              ))}
            </Flex>
          )}

          {/* Meta */}
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              {blog.author.name}
            </Text>
            <Text size="2" color="gray">
              {formatRelativeTime(blog.createdAt)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  )
}
