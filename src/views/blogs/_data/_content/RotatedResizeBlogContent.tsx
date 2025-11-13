import { useState, useRef } from 'react'
import { Box, Heading, Text, Card, Flex, Callout } from '@radix-ui/themes'

/**
 * "회전된 도형 리사이즈하기: 좌표계 변환의 원리" 블로그 글 컨텐츠
 */
export function RotatedResizeBlogContent() {
  // 좌표계 변환 시각화 상태
  const [rotation, setRotation] = useState(45)
  const [globalDelta, setGlobalDelta] = useState({ x: 100, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // 좌표 변환 함수 (시각화용)
  const globalToLocal = (dx: number, dy: number, angle: number) => {
    const rad = (angle * Math.PI) / 180
    const cos = Math.cos(-rad)
    const sin = Math.sin(-rad)
    return {
      x: dx * cos - dy * sin,
      y: dx * sin + dy * cos,
    }
  }

  const localDelta = globalToLocal(globalDelta.x, globalDelta.y, rotation)

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()

    // 화면 좌표를 viewBox 좌표로 변환
    const screenX = e.clientX - rect.left
    const screenY = e.clientY - rect.top
    const viewBoxX = (screenX / rect.width) * 800
    const viewBoxY = (screenY / rect.height) * 500

    // 중심점(400, 250) 기준으로 상대 좌표 계산
    const x = viewBoxX - 400
    const y = viewBoxY - 250

    setGlobalDelta({
      x: Math.max(-180, Math.min(180, x)),
      y: Math.max(-180, Math.min(180, y)),
    })
  }

  return (
    <Box className="space-y-8">
      {/* 서론 */}
      <Box>
        <Heading size="6" mb="4">
          회전된 도형 리사이즈하기: 좌표계 변환의 원리
        </Heading>
        <Text size="3" color="gray">
          도형을 회전시킨 후 리사이즈를 하면 이상한 방향으로 늘어나는 경험을
          해보셨나요? 이 문제는 좌표계 변환을 통해 해결할 수 있습니다. 이
          글에서는 회전 변환 행렬과 좌표계 변환의 원리를 알아보고, 실제로 어떻게
          구현하는지 살펴봅니다.
        </Text>
      </Box>

      {/* 1. 문제 상황 */}
      <Card>
        <Heading size="5" mb="3">
          1. 문제 상황: 회전된 도형의 리사이즈
        </Heading>
        <Text size="2" mb="4">
          도형을 45도 회전시킨 후 오른쪽 아래 모서리를 드래그해서 리사이즈를
          시도한다고 가정해봅시다. 마우스는 오른쪽 아래로 이동하지만, 회전
          각도를 고려하지 않으면 도형은 예상과 다른 방향으로 변형됩니다.
        </Text>

        <Box mb="4">
          <Text size="2" weight="bold" mb="2">
            왜 이런 문제가 발생할까요?
          </Text>
          <Box className="space-y-2">
            <Text size="2">
              • <strong>마우스 델타</strong>: 화면 기준(전역 좌표계)의 이동량
            </Text>
            <Text size="2">
              • <strong>도형의 크기</strong>: 도형 기준(로컬 좌표계)의 속성
            </Text>
            <Text size="2">
              • 도형이 회전되어 있으면{' '}
              <strong>두 좌표계가 일치하지 않음</strong>
            </Text>
          </Box>
        </Box>

        <Callout.Root color="orange" mb="4">
          <Callout.Text>
            <strong>핵심 개념:</strong> 회전된 도형을 올바르게 리사이즈하려면
            마우스 이동량(전역 좌표계)을 도형의 관점(로컬 좌표계)으로 변환해야
            합니다.
          </Callout.Text>
        </Callout.Root>
      </Card>

      {/* 2. 좌표계 이해하기 */}
      <Card>
        <Heading size="5" mb="3">
          2. 전역 좌표계 vs 로컬 좌표계
        </Heading>

        <Box mb="4">
          <Heading size="3" mb="2">
            전역 좌표계 (Global Coordinates)
          </Heading>
          <Text size="2" mb="2">
            화면(캔버스)을 기준으로 하는 고정된 좌표계입니다. 마우스 이벤트는
            항상 이 좌표계 기준으로 발생합니다.
          </Text>
          <Card className="bg-gray-50 dark:bg-gray-900 p-4">
            <pre className="text-sm">
              {`// 마우스 이동량 (전역 좌표계)
const deltaX = mouseX - startX  // 화면 기준 X 이동
const deltaY = mouseY - startY  // 화면 기준 Y 이동`}
            </pre>
          </Card>
        </Box>

        <Box mb="4">
          <Heading size="3" mb="2">
            로컬 좌표계 (Local Coordinates)
          </Heading>
          <Text size="2" mb="2">
            도형 자체를 기준으로 하는 좌표계입니다. 도형이 회전되면 이 좌표계도
            함께 회전합니다. 도형의 width와 height는 로컬 좌표계 기준입니다.
          </Text>
          <Card className="bg-gray-50 dark:bg-gray-900 p-4">
            <pre className="text-sm">
              {`// 도형의 크기 (로컬 좌표계)
shape.width   // 도형 기준 가로 길이
shape.height  // 도형 기준 세로 길이`}
            </pre>
          </Card>
        </Box>

        <Callout.Root color="blue">
          <Callout.Text>
            도형이 회전되어 있으면 전역 좌표계와 로컬 좌표계가 서로 다른 방향을
            가리킵니다. 이것이 좌표계 변환이 필요한 이유입니다.
          </Callout.Text>
        </Callout.Root>
      </Card>

      {/* 3. 좌표계 변환 시각화 */}
      <Card>
        <Heading size="5" mb="3">
          3. 좌표계 변환 시각화
        </Heading>
        <Text size="2" mb="4">
          마우스를 드래그하여 전역 좌표계의 벡터를 움직여보세요. 회전 각도를
          조정하면 로컬 좌표계로 변환된 벡터가 어떻게 달라지는지 확인할 수
          있습니다.
        </Text>

        <Flex gap="4" direction="column" mb="4">
          <Box>
            <Text size="2" weight="bold" mb="2">
              회전 각도: {rotation.toFixed(0)}°
            </Text>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={e => setRotation(Number(e.target.value))}
              className="w-full"
            />
          </Box>

          <Box
            ref={canvasRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setIsDragging(false)}
            style={{
              width: '100%',
              height: '500px',
              background: 'var(--gray-3)',
              borderRadius: '8px',
              position: 'relative',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {/* 중심점 */}
            <Box
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '8px',
                height: '8px',
                background: 'var(--gray-12)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            />

            {/* 전역 좌표계 축 */}
            <svg
              viewBox="0 0 800 500"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              {/* X축 (전역) */}
              <line
                x1="400"
                y1="250"
                x2="780"
                y2="250"
                stroke="var(--gray-9)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              {/* Y축 (전역) */}
              <line
                x1="400"
                y1="250"
                x2="400"
                y2="480"
                stroke="var(--gray-9)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              {/* 축 레이블 */}
              <text x="760" y="240" fill="var(--gray-11)" fontSize="12">
                X (전역)
              </text>
              <text x="410" y="475" fill="var(--gray-11)" fontSize="12">
                Y (전역)
              </text>

              {/* 로컬 좌표계 축 (회전됨) */}
              <g transform={`translate(400, 250) rotate(${rotation})`}>
                {/* X'축 (로컬) */}
                <line
                  x1="0"
                  y1="0"
                  x2="180"
                  y2="0"
                  stroke="var(--blue-9)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <text
                  x="190"
                  y="5"
                  fill="var(--blue-9)"
                  fontSize="13"
                  fontWeight="bold"
                >
                  X' (로컬)
                </text>
                {/* Y'축 (로컬) */}
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="180"
                  stroke="var(--green-9)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <text
                  x="10"
                  y="195"
                  fill="var(--green-9)"
                  fontSize="13"
                  fontWeight="bold"
                >
                  Y' (로컬)
                </text>
              </g>

              {/* 전역 좌표계 벡터 */}
              <g transform="translate(400, 250)">
                <line
                  x1="0"
                  y1="0"
                  x2={globalDelta.x}
                  y2={globalDelta.y}
                  stroke="var(--red-9)"
                  strokeWidth="4"
                  markerEnd="url(#arrowhead-global)"
                />
                <circle
                  cx={globalDelta.x}
                  cy={globalDelta.y}
                  r="7"
                  fill="var(--red-9)"
                />
              </g>

              {/* 로컬 좌표계 벡터 */}
              <g transform={`translate(400, 250) rotate(${rotation})`}>
                <line
                  x1="0"
                  y1="0"
                  x2={localDelta.x}
                  y2={localDelta.y}
                  stroke="var(--purple-9)"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  markerEnd="url(#arrowhead-local)"
                />
                <circle
                  cx={localDelta.x}
                  cy={localDelta.y}
                  r="7"
                  fill="var(--purple-9)"
                />
              </g>

              {/* 화살표 마커 정의 */}
              <defs>
                <marker
                  id="arrowhead-global"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 5, 0 10" fill="var(--red-9)" />
                </marker>
                <marker
                  id="arrowhead-local"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 5, 0 10" fill="var(--purple-9)" />
                </marker>
              </defs>
            </svg>

            {/* 텍스트 레이블 */}
            <Box className="absolute top-4 left-4 bg-[var(--gray-1)] p-3 rounded-md border border-[var(--gray-6)] text-[13px]">
              <Text size="2" weight="bold" mb="1">
                전역 좌표계 (빨강)
              </Text>
              <Text size="1" className="font-mono">
                dx: {globalDelta.x.toFixed(0)}, dy: {globalDelta.y.toFixed(0)}
              </Text>
            </Box>

            <Box className="absolute top-4 right-4 bg-[var(--gray-1)] p-3 rounded-md border border-[var(--gray-6)] text-[13px]">
              <Text size="2" weight="bold" mb="1">
                로컬 좌표계 (보라)
              </Text>
              <Text size="1" className="font-mono">
                dx': {localDelta.x.toFixed(0)}, dy': {localDelta.y.toFixed(0)}
              </Text>
            </Box>
          </Box>
        </Flex>

        <Callout.Root color="blue">
          <Callout.Text>
            같은 마우스 이동이라도 도형의 회전 각도에 따라 로컬 좌표계
            기준으로는 다른 값이 됩니다. 이것이 좌표계 변환의 핵심입니다.
          </Callout.Text>
        </Callout.Root>
      </Card>

      {/* 4. 회전 변환 행렬 */}
      <Card>
        <Heading size="5" mb="3">
          4. 회전 변환 행렬 (Rotation Matrix)
        </Heading>
        <Text size="2" mb="4">
          좌표계 변환은 회전 변환 행렬을 사용합니다. 수학적으로 2D 회전 변환은
          다음과 같이 표현됩니다.
        </Text>

        <Box mb="4">
          <Heading size="3" mb="2">
            정회전 (Forward Rotation)
          </Heading>
          <Text size="2" mb="2">
            로컬 좌표계를 전역 좌표계로 변환할 때 사용합니다.
          </Text>
          <Card className="bg-gray-50 dark:bg-gray-900 p-4 mb-2">
            <pre className="text-sm">
              {`// 로컬 → 전역 변환
x_global = x_local × cos(θ) - y_local × sin(θ)
y_global = x_local × sin(θ) + y_local × cos(θ)`}
            </pre>
          </Card>
        </Box>

        <Box mb="4">
          <Heading size="3" mb="2">
            역회전 (Inverse Rotation)
          </Heading>
          <Text size="2" mb="2">
            전역 좌표계를 로컬 좌표계로 변환할 때 사용합니다. 각도를 음수로
            적용하면 됩니다.
          </Text>
          <Card className="bg-gray-50 dark:bg-gray-900 p-4 mb-2">
            <pre className="text-sm">
              {`// 전역 → 로컬 변환
x_local = x_global × cos(-θ) - y_global × sin(-θ)
y_local = x_global × sin(-θ) + y_global × cos(-θ)`}
            </pre>
          </Card>
        </Box>

        <Box mb="4">
          <Heading size="3" mb="2">
            수학적 증명
          </Heading>
          <Text size="2" mb="3">
            왜 회전 변환 공식이 저런 형태일까요? 단위원 위의 점을 이용해
            시각적으로 증명해봅시다.
          </Text>

          {/* 시각화 */}
          <Card className="bg-gray-50 dark:bg-gray-900 p-6 mb-4">
            <svg
              viewBox="-220 -220 440 440"
              className="w-full max-w-[500px] mx-auto"
            >
              {/* 격자 */}
              <g stroke="var(--gray-6)" strokeWidth="0.5">
                {[-200, -150, -100, -50, 50, 100, 150, 200].map(pos => (
                  <>
                    <line
                      key={`v${pos}`}
                      x1={pos}
                      y1="-200"
                      x2={pos}
                      y2="200"
                    />
                    <line
                      key={`h${pos}`}
                      x1="-200"
                      y1={pos}
                      x2="200"
                      y2={pos}
                    />
                  </>
                ))}
              </g>

              {/* 축 */}
              <line
                x1="-200"
                y1="0"
                x2="200"
                y2="0"
                stroke="var(--gray-11)"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="-200"
                x2="0"
                y2="200"
                stroke="var(--gray-11)"
                strokeWidth="2"
              />
              <text x="190" y="-10" fill="var(--gray-11)" fontSize="14">
                X
              </text>
              <text x="10" y="-190" fill="var(--gray-11)" fontSize="14">
                Y
              </text>

              {/* 원 */}
              <circle
                cx="0"
                cy="0"
                r="120"
                fill="none"
                stroke="var(--gray-8)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />

              {/* 초기 각도 α */}
              <path
                d="M 40 0 A 40 40 0 0 0 28.28 -28.28"
                fill="none"
                stroke="var(--blue-9)"
                strokeWidth="2"
              />
              <text
                x="50"
                y="-15"
                fill="var(--blue-9)"
                fontSize="13"
                fontWeight="bold"
              >
                α
              </text>

              {/* 회전 각도 θ */}
              <path
                d="M 84.85 -84.85 A 120 120 0 0 0 37 -113"
                fill="none"
                stroke="var(--orange-9)"
                strokeWidth="2"
              />
              <text
                x="50"
                y="-95"
                fill="var(--orange-9)"
                fontSize="13"
                fontWeight="bold"
              >
                θ
              </text>

              {/* 반지름 r (초기) */}
              <line
                x1="0"
                y1="0"
                x2="84.85"
                y2="-84.85"
                stroke="var(--purple-9)"
                strokeWidth="2"
              />
              <text
                x="50"
                y="-50"
                fill="var(--purple-9)"
                fontSize="13"
                fontWeight="bold"
              >
                r
              </text>

              {/* 반지름 r (회전 후) */}
              <line
                x1="0"
                y1="0"
                x2="37"
                y2="-113"
                stroke="var(--purple-9)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />

              {/* 초기 점 P(x, y) */}
              <circle cx="84.85" cy="-84.85" r="5" fill="var(--red-9)" />
              <text
                x="95"
                y="-75"
                fill="var(--red-9)"
                fontSize="14"
                fontWeight="bold"
              >
                P(x, y)
              </text>

              {/* x 좌표 (수직선) */}
              <line
                x1="84.85"
                y1="-84.85"
                x2="84.85"
                y2="0"
                stroke="var(--red-9)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="88" y="-35" fill="var(--red-9)" fontSize="12">
                y
              </text>

              {/* y 좌표 (수평선) */}
              <line
                x1="0"
                y1="-84.85"
                x2="84.85"
                y2="-84.85"
                stroke="var(--red-9)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="35" y="-90" fill="var(--red-9)" fontSize="12">
                x
              </text>

              {/* 회전 후 점 P'(x', y') */}
              <circle cx="37" cy="-113" r="5" fill="var(--green-9)" />
              <text
                x="45"
                y="-120"
                fill="var(--green-9)"
                fontSize="14"
                fontWeight="bold"
              >
                P'(x', y')
              </text>

              {/* x' 좌표 (수직선) */}
              <line
                x1="37"
                y1="-113"
                x2="37"
                y2="0"
                stroke="var(--green-9)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="20" y="-50" fill="var(--green-9)" fontSize="12">
                y'
              </text>

              {/* y' 좌표 (수평선) */}
              <line
                x1="0"
                y1="-113"
                x2="37"
                y2="-113"
                stroke="var(--green-9)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="10" y="-118" fill="var(--green-9)" fontSize="12">
                x'
              </text>

              {/* 중심점 */}
              <circle cx="0" cy="0" r="3" fill="var(--gray-12)" />
            </svg>

            <Box className="mt-4 space-y-2 text-sm">
              <Flex gap="3" align="center">
                <Box className="w-4 h-4 rounded-full bg-[var(--red-9)]" />
                <Text size="2">
                  <strong>P(x, y)</strong>: 초기 점 (각도 α)
                </Text>
              </Flex>
              <Flex gap="3" align="center">
                <Box className="w-4 h-4 rounded-full bg-[var(--green-9)]" />
                <Text size="2">
                  <strong>P'(x', y')</strong>: 회전 후 점 (각도 α + θ)
                </Text>
              </Flex>
              <Flex gap="3" align="center">
                <Box className="w-12 h-0.5 bg-[var(--purple-9)]" />
                <Text size="2">
                  <strong>r</strong>: 원점으로부터의 거리 (일정)
                </Text>
              </Flex>
            </Box>
          </Card>

          <Box className="space-y-3">
            <Box>
              <Text size="2" weight="bold" mb="2">
                1단계: 원점을 중심으로 한 점 P(x, y)
              </Text>
              <Card className="bg-gray-50 dark:bg-gray-900 p-4">
                <pre className="text-sm">
                  {`점 P(x, y)는 극좌표로 표현하면:
x = r × cos(α)
y = r × sin(α)

여기서 r은 원점으로부터의 거리, α는 초기 각도`}
                </pre>
              </Card>
            </Box>

            <Box>
              <Text size="2" weight="bold" mb="2">
                2단계: θ만큼 회전한 새로운 점 P'(x', y')
              </Text>
              <Card className="bg-gray-50 dark:bg-gray-900 p-4">
                <pre className="text-sm">
                  {`점 P를 θ만큼 회전하면 각도는 (α + θ)가 됩니다:
x' = r × cos(α + θ)
y' = r × sin(α + θ)`}
                </pre>
              </Card>
            </Box>

            <Box>
              <Text size="2" weight="bold" mb="2">
                3단계: 삼각함수 덧셈 공식 적용
              </Text>
              <Card className="bg-gray-50 dark:bg-gray-900 p-4">
                <pre className="text-sm">
                  {`삼각함수 덧셈 공식:
cos(α + θ) = cos(α)cos(θ) - sin(α)sin(θ)
sin(α + θ) = sin(α)cos(θ) + cos(α)sin(θ)

따라서:
x' = r × [cos(α)cos(θ) - sin(α)sin(θ)]
y' = r × [sin(α)cos(θ) + cos(α)sin(θ)]`}
                </pre>
              </Card>
            </Box>

            <Box>
              <Text size="2" weight="bold" mb="2">
                4단계: 정리 및 결론
              </Text>
              <Card className="bg-gray-50 dark:bg-gray-900 p-4">
                <pre className="text-sm">
                  {`r × cos(α) = x, r × sin(α) = y 이므로:

x' = x × cos(θ) - y × sin(θ)
y' = x × sin(θ) + y × cos(θ)

이것이 바로 회전 변환 공식입니다! ✓`}
                </pre>
              </Card>
            </Box>
          </Box>
        </Box>

        <Callout.Root color="purple">
          <Callout.Text>
            <strong>핵심:</strong> 회전 변환은 삼각함수 덧셈 공식에서
            유도됩니다. 이 증명은 2D 평면에서 임의의 점을 원점 중심으로
            회전시키는 보편적인 방법을 보여줍니다.
          </Callout.Text>
        </Callout.Root>
      </Card>

      {/* 5. 마무리 */}
      <Card>
        <Heading size="5" mb="3">
          마무리
        </Heading>
        <Text size="2" mb="4">
          회전된 도형의 리사이즈는 좌표계 변환의 완벽한 예시입니다. 핵심은
          다음과 같습니다:
        </Text>

        <Box className="space-y-2 mb-4 flex flex-col pt-2">
          <Text size="2">
            1. <strong>전역 좌표계</strong>: 화면 기준, 마우스 이벤트가 발생하는
            좌표계
          </Text>
          <Text size="2">
            2. <strong>로컬 좌표계</strong>: 도형 기준, 크기와 형태를 정의하는
            좌표계
          </Text>
          <Text size="2">
            3. <strong>회전 변환 행렬</strong>: 두 좌표계를 변환하는 수학적 도구
          </Text>
          <Text size="2">
            4. <strong>양방향 변환</strong>: 입력은 전역→로컬, 출력은 로컬→전역
          </Text>
        </Box>

        <Callout.Root color="green">
          <Callout.Text>
            이 원리는 회전된 도형의 리사이즈뿐만 아니라 게임 개발, 3D 그래픽스,
            로보틱스 등 다양한 분야에서 활용되는 기본 개념입니다. 한 번 이해하면
            여러 곳에서 응용할 수 있습니다!
          </Callout.Text>
        </Callout.Root>
      </Card>
    </Box>
  )
}
