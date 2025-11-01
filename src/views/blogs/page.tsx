import { Container, Flex, Heading, Text, Box } from '@radix-ui/themes'
import { BlogCard } from './_components/BlogCard'
import { getAllBlogs } from './_data/blogs'

export default function BlogListPage() {
  const blogs = getAllBlogs()

  return (
    <Container size="4" className="py-16">
      <Flex direction="column" gap="6">
        {/* Header */}
        <Box>
          <Heading size="8" mb="2">
            블로그
          </Heading>
          <Text size="4" color="gray">
            개발 관련 글들을 공유합니다
          </Text>
        </Box>

        {/* Blog Grid */}
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Box>

        {/* Empty State */}
        {blogs.length === 0 && (
          <Flex
            justify="center"
            align="center"
            direction="column"
            gap="2"
            className="min-h-[400px]"
          >
            <Text size="4" color="gray">
              아직 작성된 글이 없습니다
            </Text>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}
