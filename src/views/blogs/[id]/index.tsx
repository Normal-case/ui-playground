import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  Box,
  Separator,
} from '@radix-ui/themes'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useBlog } from '../hooks/use-blogs'
import { formatDate } from '@/shared/utils'

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { blog, isLoading } = useBlog(id!)

  if (isLoading) {
    return (
      <Container size="3" className="py-16">
        <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
          <Text size="4" color="gray">
            로딩 중...
          </Text>
        </Flex>
      </Container>
    )
  }

  if (!blog) {
    return (
      <Container size="3" className="py-16">
        <Flex
          direction="column"
          gap="4"
          justify="center"
          align="center"
          style={{ minHeight: '400px' }}
        >
          <Text size="4" color="gray">
            블로그 글을 찾을 수 없습니다
          </Text>
          <Button onClick={() => navigate('/blogs')}>목록으로 돌아가기</Button>
        </Flex>
      </Container>
    )
  }

  return (
    <Container size="3" className="py-16">
      <Flex direction="column" gap="6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/blogs')}
          className="self-start"
        >
          <ArrowLeftIcon />
          목록으로
        </Button>

        {/* Cover Image */}
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}

        {/* Header */}
        <Box>
          <Heading size="9" mb="4">
            {blog.title}
          </Heading>

          {/* Meta */}
          <Flex gap="4" align="center" mb="4">
            <Text size="2" color="gray">
              작성자: {blog.author.name}
            </Text>
            <Text size="2" color="gray">
              •
            </Text>
            <Text size="2" color="gray">
              {formatDate(blog.createdAt)}
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
        </Box>

        <Separator size="4" />

        {/* Content */}
        <Box className="prose dark:prose-invert max-w-none">
          <Text size="4" style={{ lineHeight: '1.8' }}>
            {blog.content}
          </Text>
        </Box>

        <Separator size="4" />

        {/* Footer */}
        <Flex justify="between" align="center">
          <Text size="2" color="gray">
            마지막 수정: {formatDate(blog.updatedAt)}
          </Text>
          <Button onClick={() => navigate('/blogs')}>목록으로</Button>
        </Flex>
      </Flex>
    </Container>
  )
}
