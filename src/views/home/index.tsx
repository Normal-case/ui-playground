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
            <RocketIcon width="64" height="64" className="text-violet-500" />
          </Flex>
          <Heading size="9" mb="4">
            UI Playground
          </Heading>
          <Text size="5" color="gray" className="max-w-2xl">
            React + TypeScript + Vite로 만든 모던 웹 애플리케이션입니다.
            <br />
            깔끔한 구조와 확장 가능한 아키텍처를 경험해보세요.
          </Text>
        </Box>

        {/* CTA Buttons */}
        <Flex gap="3" mt="4">
          <Link to="/blogs">
            <Button size="3" variant="solid">
              블로그 보기
            </Button>
          </Link>
          <Button size="3" variant="outline">
            GitHub
          </Button>
        </Flex>

        {/* Features */}
        <Box className="mt-12 w-full">
          <Heading size="6" mb="6">
            주요 기능
          </Heading>
          <Flex gap="4" wrap="wrap" justify="center">
            {features.map(feature => (
              <Box
                key={feature.title}
                className="flex-1 min-w-[250px] p-6 border border-slate-200 dark:border-slate-800 rounded-lg"
              >
                <Heading size="4" mb="2">
                  {feature.title}
                </Heading>
                <Text color="gray">{feature.description}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

const features = [
  {
    title: '⚡ 빠른 개발',
    description: 'Vite + React Fast Refresh로 즉각적인 피드백',
  },
  {
    title: '🎨 모던 UI',
    description: 'Radix UI + Tailwind CSS로 아름다운 디자인',
  },
  {
    title: '📦 확장 가능',
    description: '체계적인 구조로 쉬운 기능 추가',
  },
]
