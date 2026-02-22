import { Box, Container, Flex, Heading, Text, Button } from '@radix-ui/themes'
import { RocketIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <Container size="4" className="py-16">
      <Flex direction="column" gap="6" align="center" className="text-center">
        {/* Hero Section */}
        <Box>
          <Flex justify="center" mb="4">
            <RocketIcon width="64" height="64" className="text-primary" />
          </Flex>
          <Heading size="9" mb="4">
            UI Playground
          </Heading>
          <Text size="5" className="max-w-2xl text-muted-foreground">
            평상시 구현해보고 싶었던 것들을 자유롭게 만들어보고,
            <br />
            공부했던 내용들을 기록하며 정리하는 공간입니다!
          </Text>
        </Box>

        {/* CTA Buttons */}
        <Flex gap="3" mt="4">
          <Link to="/blogs">
            <Button size="3" variant="solid">
              블로그 보기
            </Button>
          </Link>
          <a href="https://github.com/Normal-case/ui-playground" target="_blank" rel="noopener noreferrer">
            <Button size="3" variant="outline">
              GitHub
            </Button>
          </a>
        </Flex>
      </Flex>
    </Container>
  )
}
