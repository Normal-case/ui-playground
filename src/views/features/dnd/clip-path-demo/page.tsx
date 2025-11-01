import { useState } from 'react'
import { Box, Heading, Text, Flex, Card, Code, Tabs } from '@radix-ui/themes'

export default function ClipPathDemoPage() {
  const [activeTab, setActiveTab] = useState('triangle')

  // 각 도형의 polygon 좌표와 설명
  const shapes = {
    triangle: {
      name: '삼각형',
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      points: [
        { x: '50%', y: '0%', label: '꼭대기 (상단 중앙)' },
        { x: '0%', y: '100%', label: '왼쪽 아래' },
        { x: '100%', y: '100%', label: '오른쪽 아래' },
      ],
      description: '3개의 점을 연결하여 삼각형을 만듭니다.',
    },
    star: {
      name: '5각 별',
      clipPath:
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      points: [
        { x: '50%', y: '0%', label: '1. 꼭대기' },
        { x: '61%', y: '35%', label: '2. 안쪽 (우상)' },
        { x: '98%', y: '35%', label: '3. 바깥쪽 (우상)' },
        { x: '68%', y: '57%', label: '4. 안쪽 (우)' },
        { x: '79%', y: '91%', label: '5. 바깥쪽 (우하)' },
        { x: '50%', y: '70%', label: '6. 안쪽 (하)' },
        { x: '21%', y: '91%', label: '7. 바깥쪽 (좌하)' },
        { x: '32%', y: '57%', label: '8. 안쪽 (좌)' },
        { x: '2%', y: '35%', label: '9. 바깥쪽 (좌상)' },
        { x: '39%', y: '35%', label: '10. 안쪽 (좌상)' },
      ],
      description: '외부 5개 점과 내부 5개 점을 번갈아 연결하여 별을 만듭니다.',
    },
    hexagon: {
      name: '육각형',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      points: [
        { x: '25%', y: '0%', label: '1. 왼쪽 위' },
        { x: '75%', y: '0%', label: '2. 오른쪽 위' },
        { x: '100%', y: '50%', label: '3. 오른쪽 중간' },
        { x: '75%', y: '100%', label: '4. 오른쪽 아래' },
        { x: '25%', y: '100%', label: '5. 왼쪽 아래' },
        { x: '0%', y: '50%', label: '6. 왼쪽 중간' },
      ],
      description: '6개의 점을 등간격으로 배치하여 정육각형을 만듭니다.',
    },
    diamond: {
      name: '다이아몬드',
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      points: [
        { x: '50%', y: '0%', label: '위' },
        { x: '100%', y: '50%', label: '오른쪽' },
        { x: '50%', y: '100%', label: '아래' },
        { x: '0%', y: '50%', label: '왼쪽' },
      ],
      description: '4개의 점을 상하좌우 중앙에 배치하여 다이아몬드를 만듭니다.',
    },
    arrow: {
      name: '화살표',
      clipPath:
        'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)',
      points: [
        { x: '40%', y: '0%', label: '1. 왼쪽 위 꼭대기' },
        { x: '40%', y: '20%', label: '2. 왼쪽 위 안쪽' },
        { x: '100%', y: '20%', label: '3. 오른쪽 위' },
        { x: '100%', y: '80%', label: '4. 오른쪽 아래' },
        { x: '40%', y: '80%', label: '5. 왼쪽 아래 안쪽' },
        { x: '40%', y: '100%', label: '6. 왼쪽 아래 꼭대기' },
        { x: '0%', y: '50%', label: '7. 왼쪽 화살촉' },
      ],
      description: '7개의 점을 연결하여 왼쪽을 가리키는 화살표를 만듭니다.',
    },
  }

  type ShapeKey = keyof typeof shapes

  const currentShape = shapes[activeTab as ShapeKey]

  return (
    <div>
      <Box mb="6">
        <Heading size="7" mb="2">
          📐 clip-path: polygon() 완벽 가이드
        </Heading>
        <Text size="3" color="gray">
          clip-path는 요소의 "보이는 영역"을 잘라냅니다. polygon()으로 꼭지점
          좌표를 지정하면 다각형을 만들 수 있어요!
        </Text>
      </Box>

      {/* 개념 설명 카드 */}
      <Flex gap="4" mb="6" direction={{ initial: 'column', md: 'row' }}>
        <Card className="flex-1">
          <Heading size="4" mb="2">
            🎭 clip-path란?
          </Heading>
          <Text size="2" color="gray">
            요소의 특정 영역만 보이게 "마스킹"하는 CSS 속성입니다.
            <br />
            <br />
            정의한 영역 <strong>내부</strong>는 보이고, <strong>외부</strong>는
            투명해집니다.
          </Text>
        </Card>

        <Card className="flex-1">
          <Heading size="4" mb="2">
            📍 polygon() 좌표계
          </Heading>
          <Text size="2" color="gray" className="font-mono">
            0% 0% = 왼쪽 위<br />
            100% 0% = 오른쪽 위<br />
            0% 100% = 왼쪽 아래
            <br />
            100% 100% = 오른쪽 아래
            <br />
            50% 50% = 정중앙
          </Text>
        </Card>

        <Card className="flex-1">
          <Heading size="4" mb="2">
            ✏️ 문법
          </Heading>
          <Code size="2" variant="ghost">
            clip-path: polygon(
            <br />
            &nbsp;&nbsp;x1 y1, x2 y2, ...
            <br />
            );
          </Code>
          <Text size="2" color="gray" className="mt-2">
            좌표를 순서대로 연결하여 다각형을 만듭니다.
          </Text>
        </Card>
      </Flex>

      {/* 탭으로 도형 선택 */}
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Trigger value="triangle">삼각형</Tabs.Trigger>
          <Tabs.Trigger value="star">별</Tabs.Trigger>
          <Tabs.Trigger value="hexagon">육각형</Tabs.Trigger>
          <Tabs.Trigger value="diamond">다이아몬드</Tabs.Trigger>
          <Tabs.Trigger value="arrow">화살표</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {/* 시각적 데모 */}
      <Box mt="6">
        <Card>
          <Heading size="5" mb="4">
            {currentShape.name} - 시각적 데모
          </Heading>

          <Flex gap="6" direction={{ initial: 'column', lg: 'row' }}>
            {/* 왼쪽: 원본 사각형과 clip-path 적용 결과 비교 */}
            <Box className="flex-1">
              <Heading size="3" mb="3">
                1️⃣ 원본 vs 적용 후
              </Heading>

              <Flex gap="4" wrap="wrap">
                {/* 원본 사각형 */}
                <Box>
                  <Text size="2" weight="bold" mb="2" className="block">
                    원본 (배경색이 칠해진 div)
                  </Text>
                  <div className="relative h-[150px] w-[150px] bg-blue-500 m-8">
                    {/* 좌표 레이블 */}
                    <Text
                      size="1"
                      className="absolute -left-5 -top-5 text-gray-500"
                    >
                      0% 0%
                    </Text>
                    <Text
                      size="1"
                      className="absolute -right-5 -top-5 text-gray-500"
                    >
                      100% 0%
                    </Text>
                    <Text
                      size="1"
                      className="absolute -bottom-5 -left-5 text-gray-500"
                    >
                      0% 100%
                    </Text>
                    <Text
                      size="1"
                      className="absolute -bottom-5 -right-5 text-gray-500"
                    >
                      100% 100%
                    </Text>
                  </div>
                </Box>

                {/* clip-path 적용 */}
                <Box>
                  <Text size="2" weight="bold" mb="2" className="block">
                    clip-path 적용 후
                  </Text>
                  <div
                    className="h-[150px] w-[150px] bg-blue-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] m-8"
                    style={
                      {
                        clipPath: currentShape.clipPath,
                      } as React.CSSProperties
                    }
                  />
                </Box>
              </Flex>

              <Box
                mt="4"
                p="3"
                className="rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <Text size="2" color="gray">
                  💡 {currentShape.description}
                </Text>
              </Box>
            </Box>

            {/* 오른쪽: 좌표 점 표시 */}
            <Box className="flex-1">
              <Heading size="3" mb="3">
                2️⃣ 꼭지점 좌표
              </Heading>

              <Box className="relative mx-auto h-[300px] w-[300px] rounded-lg bg-gray-100 dark:bg-gray-800">
                {/* 도형 렌더링 */}
                <div
                  className="absolute inset-5 bg-blue-500 opacity-30"
                  style={
                    {
                      clipPath: currentShape.clipPath,
                    } as React.CSSProperties
                  }
                />

                {/* 좌표 점 표시 */}
                {currentShape.points.map((point, index) => {
                  const x = parseFloat(point.x)
                  const y = parseFloat(point.y)
                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        left: `calc(20px + ${x}% * 0.906)`, // 0.906 = (300-40)/300
                        top: `calc(20px + ${y}% * 0.906)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* 점 */}
                      <div className="h-[10px] w-[10px] rounded-full border-2 border-white bg-red-500 shadow-md" />
                      {/* 레이블 */}
                      <Text
                        size="1"
                        weight="bold"
                        className="absolute left-1/2 top-[15px] -translate-x-1/2 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] shadow-sm"
                      >
                        {point.label}
                      </Text>
                    </div>
                  )
                })}
              </Box>

              <Box
                mt="4"
                p="3"
                className="rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <Text size="2" weight="bold" mb="2" className="block">
                  좌표 목록:
                </Text>
                {currentShape.points.map((point, index) => (
                  <Text key={index} size="1" className="mb-1 block font-mono">
                    점{index + 1}: ({point.x}, {point.y}) - {point.label}
                  </Text>
                ))}
              </Box>
            </Box>
          </Flex>

          {/* CSS 코드 */}
          <Box mt="6">
            <Heading size="3" mb="3">
              3️⃣ CSS 코드
            </Heading>
            <Box className="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <Code size="2" className="whitespace-pre-wrap">
                {`.${activeTab} {\n  width: 150px;\n  height: 150px;\n  background-color: #3b82f6;\n  clip-path: ${currentShape.clipPath};\n}`}
              </Code>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* 추가 팁 */}
      <Box mt="6">
        <Card>
          <Heading size="4" mb="3">
            💡 실전 팁
          </Heading>
          <Flex direction="column" gap="3">
            <Box>
              <Text size="2" weight="bold" className="block mb-1">
                1. 점의 순서가 중요합니다
              </Text>
              <Text size="2" color="gray">
                polygon의 점들은 순서대로 선으로 연결됩니다. 시계방향 또는
                반시계방향으로 연결해야 올바른 도형이 만들어집니다.
              </Text>
            </Box>
            <Box>
              <Text size="2" weight="bold" className="block mb-1">
                2. 애니메이션 가능
              </Text>
              <Text size="2" color="gray">
                clip-path는 transition으로 애니메이션이 가능합니다. 단, 점의
                개수가 같아야 합니다.
              </Text>
            </Box>
            <Box>
              <Text size="2" weight="bold" className="block mb-1">
                3. 온라인 도구 활용
              </Text>
              <Text size="2" color="gray">
                <a
                  href="https://bennettfeely.com/clippy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--accent-9)]"
                >
                  Clippy
                </a>
                와 같은 온라인 도구로 시각적으로 clip-path를 만들 수 있습니다.
              </Text>
            </Box>
            <Box>
              <Text size="2" weight="bold" className="block mb-1">
                4. 다른 clip-path 함수들
              </Text>
              <Text size="2" color="gray">
                polygon() 외에도 circle(), ellipse(), inset() 등 다양한 함수가
                있습니다.
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </div>
  )
}
