import { useState } from 'react'
import type React from 'react'
import { Box, Heading, Text, Card, Flex, Button, Code } from '@radix-ui/themes'

/**
 * "CSS로 다각형 그리는 방법" 블로그 글 컨텐츠
 * Triangle CSS 데모와 clip-path 가이드를 통합
 */
export function PolygonBlogContent() {
  const [currentStep, setCurrentStep] = useState(1)

  const triangleSteps = [
    {
      title: '1단계: 일반적인 정사각형',
      description: '100px x 100px 정사각형, 파란색 배경',
      code: `{
  width: '100px',
  height: '100px',
  backgroundColor: '#3b82f6',
}`,
      style: {
        width: '100px',
        height: '100px',
        backgroundColor: '#3b82f6',
      },
    },
    {
      title: '2단계: Border 추가',
      description:
        '각 방향에 50px 두꺼운 border 추가 (모서리가 대각선으로 나뉨)',
      code: `{
  width: '100px',
  height: '100px',
  backgroundColor: '#3b82f6',
  borderTop: '50px solid #ef4444',
  borderRight: '50px solid #10b981',
  borderBottom: '50px solid #f59e0b',
  borderLeft: '50px solid #8b5cf6',
}`,
      style: {
        width: '100px',
        height: '100px',
        backgroundColor: '#3b82f6',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid #10b981',
        borderBottom: '50px solid #f59e0b',
        borderLeft: '50px solid #8b5cf6',
      },
    },
    {
      title: '3단계: Width를 0으로',
      description: '너비를 0으로 만들면 좌우 border가 삼각형처럼 보임',
      code: `{
  width: '0',        // 👈 0으로!
  height: '100px',
  borderTop: '50px solid #ef4444',
  borderRight: '50px solid #10b981',
  borderBottom: '50px solid #f59e0b',
  borderLeft: '50px solid #8b5cf6',
}`,
      style: {
        width: '0',
        height: '100px',
        backgroundColor: '#3b82f6',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid #10b981',
        borderBottom: '50px solid #f59e0b',
        borderLeft: '50px solid #8b5cf6',
      },
    },
    {
      title: '4단계: Height도 0으로',
      description: '높이도 0으로 만들면 border들만 남아서 4개의 삼각형이 보임',
      code: `{
  width: '0',        // 👈 0
  height: '0',       // 👈 0으로!
  borderTop: '50px solid #ef4444',
  borderRight: '50px solid #10b981',
  borderBottom: '50px solid #f59e0b',
  borderLeft: '50px solid #8b5cf6',
}`,
      style: {
        width: '0',
        height: '0',
        backgroundColor: '#3b82f6',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid #10b981',
        borderBottom: '50px solid #f59e0b',
        borderLeft: '50px solid #8b5cf6',
      },
    },
    {
      title: '5단계: 원하는 방향만 남기기',
      description: '다른 border를 투명하게 하면 원하는 삼각형만 보임',
      code: `{
  width: '0',
  height: '0',
  borderTop: '50px solid #ef4444',       // 👈 표시
  borderRight: '50px solid transparent', // 👈 투명
  borderBottom: '50px solid transparent',// 👈 투명
  borderLeft: '50px solid transparent',  // 👈 투명
}`,
      style: {
        width: '0',
        height: '0',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid transparent',
        borderBottom: '50px solid transparent',
        borderLeft: '50px solid transparent',
      },
    },
    {
      title: '6단계: 최종 형태',
      description: '크기를 조절하여 원하는 삼각형 완성!',
      code: `{
  width: '0',
  height: '0',
  borderLeft: '75px solid transparent',
  borderRight: '75px solid transparent',
  borderBottom: '90px solid #8b5cf6',
}`,
      style: {
        width: '0',
        height: '0',
        borderLeft: '75px solid transparent',
        borderRight: '75px solid transparent',
        borderBottom: '90px solid #8b5cf6',
      },
    },
  ]

  const currentStepData = triangleSteps[currentStep - 1]

  return (
    <div className="prose dark:prose-invert max-w-none">
      {/* 서론 */}
      <Text
        size="4"
        className="block leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
      >
        웹 개발을 하다 보면 다양한 도형이 필요한 순간들이 있습니다. 이미지를
        사용할 수도 있지만, CSS만으로 도형을 그릴 수 있다면 훨씬 더 유연하고
        가볍게 디자인할 수 있습니다. 이 글에서는 CSS로 다각형을 그리는 두 가지
        주요 방법을 알아보겠습니다.
      </Text>

      <Box className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

      {/* Part 1: Border Trick */}
      <Heading size="6" className="mt-8 mb-4">
        Part 1: CSS Border Trick으로 삼각형 그리기
      </Heading>

      <Text
        size="3"
        className="block leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
      >
        삼각형은 CSS의 border 속성을 영리하게 활용하여 만들 수 있습니다. 핵심
        아이디어는 <strong>width와 height를 0으로 만들고 border만 표시</strong>
        하는 것입니다.
      </Text>

      {/* 인터랙티브 데모 */}
      <Card className="my-6">
        <Heading size="4" mb="3">
          🎯 단계별 학습
        </Heading>
        <Flex gap="2" wrap="wrap" mb="4">
          {triangleSteps.map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              variant={currentStep === index + 1 ? 'solid' : 'soft'}
              color={currentStep === index + 1 ? 'indigo' : 'gray'}
              size="2"
            >
              {index + 1}단계
            </Button>
          ))}
        </Flex>

        <Card className="bg-blue-50 dark:bg-blue-950/20 mb-4">
          <Heading size="3" mb="2">
            {currentStepData.title}
          </Heading>
          <Text size="2" color="gray">
            {currentStepData.description}
          </Text>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 시각적 결과 */}
          <Box>
            <Text size="2" weight="bold" className="mb-2 block">
              🎨 시각적 결과
            </Text>
            <div className="flex min-h-[250px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-8">
              <div style={currentStepData.style} />
            </div>
          </Box>

          {/* 코드 */}
          <Box>
            <Text size="2" weight="bold" className="mb-2 block">
              💻 CSS 코드
            </Text>
            <pre className="min-h-[250px] overflow-auto rounded-lg bg-gray-900 p-4 text-sm leading-relaxed text-gray-100">
              {currentStepData.code}
            </pre>
          </Box>
        </div>

        <Flex justify="between" mt="4">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            size="2"
            variant="soft"
          >
            ← 이전
          </Button>
          <Text size="1" color="gray" className="self-center">
            {currentStep} / {triangleSteps.length}
          </Text>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(triangleSteps.length, currentStep + 1))
            }
            disabled={currentStep === triangleSteps.length}
            size="2"
            variant="soft"
          >
            다음 →
          </Button>
        </Flex>
      </Card>

      {/* 핵심 원리 */}
      <Card className="my-6 bg-amber-50 dark:bg-amber-950/20">
        <Heading size="4" mb="3">
          💡 핵심 원리
        </Heading>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            1. Border가 만나는 방식
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            여러 border가 만날 때, 모서리는 <strong>대각선으로 나뉩니다</strong>
            . 이것이 삼각형을 만드는 핵심입니다!
          </Text>
        </Box>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            2. Width와 Height를 0으로
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            내용 영역을 없애면 <strong>border들만 보이게</strong> 됩니다.
          </Text>
        </Box>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            3. 투명도 활용
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            원하는 방향의 border만 색상을 주고, 나머지는{' '}
            <Code>transparent</Code>로 만들면 원하는 삼각형만 보입니다!
          </Text>
        </Box>
        <Box>
          <Text size="2" weight="bold" className="mb-1 block">
            4. 크기 조절
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            <strong>너비</strong>: borderLeft + borderRight의 합
            <br />
            <strong>높이</strong>: borderBottom (또는 borderTop)의 크기
          </Text>
        </Box>
      </Card>

      {/* 4방향 삼각형 */}
      <Card className="my-6">
        <Heading size="4" mb="3">
          🧭 4방향 삼각형 예시
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            {
              name: '위 ▲',
              style: {
                borderLeft: '40px solid transparent',
                borderRight: '40px solid transparent',
                borderBottom: '60px solid #ef4444',
              },
              code: 'borderBottom',
            },
            {
              name: '오른쪽 ▶',
              style: {
                borderTop: '40px solid transparent',
                borderBottom: '40px solid transparent',
                borderLeft: '60px solid #10b981',
              },
              code: 'borderLeft',
            },
            {
              name: '아래 ▼',
              style: {
                borderLeft: '40px solid transparent',
                borderRight: '40px solid transparent',
                borderTop: '60px solid #3b82f6',
              },
              code: 'borderTop',
            },
            {
              name: '왼쪽 ◀',
              style: {
                borderTop: '40px solid transparent',
                borderBottom: '40px solid transparent',
                borderRight: '60px solid #f59e0b',
              },
              code: 'borderRight',
            },
          ].map((item, index) => (
            <Box key={index}>
              <Text size="2" weight="bold" className="mb-3 block">
                {item.name}
              </Text>
              <div className="flex justify-center mb-2">
                <div style={{ width: 0, height: 0, ...item.style }} />
              </div>
              <Code size="1">{item.code}</Code>
            </Box>
          ))}
        </div>
      </Card>

      <Box className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

      {/* Part 2: clip-path */}
      <Heading size="6" className="mt-8 mb-4">
        Part 2: clip-path: polygon()으로 복잡한 다각형 그리기
      </Heading>

      <Text
        size="3"
        className="block leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
      >
        더 복잡한 다각형(별, 육각형, 화살표 등)을 그리려면{' '}
        <Code>clip-path</Code> 속성을 사용하는 것이 좋습니다.{' '}
        <Code>clip-path</Code>는 요소의{' '}
        <strong>"보이는 영역"을 잘라내는</strong> 속성으로,{' '}
        <Code>polygon()</Code> 함수로 다각형의 각 꼭지점 좌표를 지정할 수
        있습니다.
      </Text>

      {/* clip-path 개념 */}
      <Flex gap="4" mb="6" direction={{ initial: 'column', md: 'row' }}>
        <Card className="flex-1">
          <Heading size="3" mb="2">
            🎭 clip-path란?
          </Heading>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            요소의 특정 영역만 보이게 "마스킹"하는 CSS 속성입니다.
            <br />
            <br />
            정의한 영역 <strong>내부</strong>는 보이고, <strong>외부</strong>는
            투명해집니다.
          </Text>
        </Card>

        <Card className="flex-1">
          <Heading size="3" mb="2">
            📍 polygon() 좌표계
          </Heading>
          <Text size="2" className="font-mono text-gray-700 dark:text-gray-300">
            0% 0% = 왼쪽 위
            <br />
            100% 0% = 오른쪽 위
            <br />
            0% 100% = 왼쪽 아래
            <br />
            100% 100% = 오른쪽 아래
            <br />
            50% 50% = 정중앙
          </Text>
        </Card>
      </Flex>

      {/* 예시: 별과 육각형 */}
      <Card className="my-6">
        <Heading size="4" mb="4">
          ⭐ 예시: 별과 육각형
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 별 */}
          <Box>
            <Heading size="3" mb="3">
              5각 별
            </Heading>
            <div className="flex justify-center mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <div
                className="w-24 h-24 bg-amber-500"
                style={{
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
              />
            </div>
            <pre className="overflow-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-100">
              {`clip-path: polygon(
  50% 0%,   /* 꼭대기 */
  61% 35%,  /* 안쪽 */
  98% 35%,  /* 바깥쪽 */
  68% 57%,  /* 안쪽 */
  79% 91%,  /* 바깥쪽 */
  50% 70%,  /* 안쪽 */
  21% 91%,  /* 바깥쪽 */
  32% 57%,  /* 안쪽 */
  2% 35%,   /* 바깥쪽 */
  39% 35%   /* 안쪽 */
);`}
            </pre>
            <Text size="2" className="mt-2 text-gray-600 dark:text-gray-400">
              외부 5개 점과 내부 5개 점을 번갈아 연결하여 별을 만듭니다.
            </Text>
          </Box>

          {/* 육각형 */}
          <Box>
            <Heading size="3" mb="3">
              육각형
            </Heading>
            <div className="flex justify-center mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <div
                className="w-24 h-28 bg-cyan-500"
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
            </div>
            <pre className="overflow-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-100">
              {`clip-path: polygon(
  50% 0%,    /* 위 */
  100% 25%,  /* 오른쪽 위 */
  100% 75%,  /* 오른쪽 아래 */
  50% 100%,  /* 아래 */
  0% 75%,    /* 왼쪽 아래 */
  0% 25%     /* 왼쪽 위 */
);`}
            </pre>
            <Text size="2" className="mt-2 text-gray-600 dark:text-gray-400">
              6개의 점을 등간격으로 배치하여 정육각형을 만듭니다.
            </Text>
          </Box>
        </div>
      </Card>

      {/* 실전 팁 */}
      <Card className="my-6 bg-green-50 dark:bg-green-950/20">
        <Heading size="4" mb="3">
          💡 실전 팁
        </Heading>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            1. 점의 순서가 중요합니다
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            polygon의 점들은 순서대로 선으로 연결됩니다. 시계방향 또는
            반시계방향으로 연결해야 올바른 도형이 만들어집니다.
          </Text>
        </Box>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            2. 애니메이션 가능
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            clip-path는 transition으로 애니메이션이 가능합니다. 단, 점의 개수가
            같아야 합니다.
          </Text>
        </Box>
        <Box>
          <Text size="2" weight="bold" className="mb-1 block">
            3. 온라인 도구 활용
          </Text>
          <Text size="2" className="text-gray-700 dark:text-gray-300">
            <a
              href="https://bennettfeely.com/clippy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clippy
            </a>
            와 같은 온라인 도구로 시각적으로 clip-path를 만들 수 있습니다.
          </Text>
        </Box>
      </Card>

      {/* 결론 */}
      <Box className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

      <Heading size="5" className="mt-8 mb-4">
        결론
      </Heading>

      <Text
        size="3"
        className="block leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
      >
        CSS로 다각형을 그리는 두 가지 방법을 알아보았습니다:
      </Text>

      <Box className="mb-6 pl-4 border-l-4 border-blue-500">
        <Text size="2" className="block mb-2 text-gray-700 dark:text-gray-300">
          <strong>1. Border Trick</strong> - 삼각형을 그릴 때 유용합니다.
          간단하고 브라우저 호환성이 높습니다.
        </Text>
        <Text size="2" className="block text-gray-700 dark:text-gray-300">
          <strong>2. clip-path: polygon()</strong> - 별, 육각형, 화살표 등
          복잡한 다각형을 그릴 수 있습니다. 더 유연하고 강력합니다.
        </Text>
      </Box>

      <Text
        size="3"
        className="block leading-relaxed text-gray-700 dark:text-gray-300"
      >
        각 방법의 장단점을 이해하고, 상황에 맞게 선택하여 사용하면 이미지 없이도
        다양한 도형을 CSS만으로 구현할 수 있습니다. 실제 프로젝트에서
        활용해보세요!
      </Text>
    </div>
  )
}
