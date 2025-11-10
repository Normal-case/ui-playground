import { useState, useRef, useEffect } from 'react'
import { Box, Heading, Text, Card, Flex, Code, Callout } from '@radix-ui/themes'

/**
 * "마우스로 도형 회전시키기: 각도 계산의 원리" 블로그 글 컨텐츠
 */
export function RotationBlogContent() {
  const [angle, setAngle] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [initialAngle, setInitialAngle] = useState(0)
  const [initialRotation, setInitialRotation] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  // 좌표계 시각화용 상태
  const [coordAngle, setCoordAngle] = useState(0)
  const [coordPosition, setCoordPosition] = useState({ x: 150, y: 0 })
  const [isCoordTracking, setIsCoordTracking] = useState(false)
  const coordCanvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

    setIsRotating(true)
    setInitialAngle(mouseAngle)
    setInitialRotation(angle)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRotating || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    const angleDelta = ((currentAngle - initialAngle) * 180) / Math.PI

    let newRotation = initialRotation + angleDelta
    newRotation = ((newRotation % 360) + 360) % 360

    setAngle(newRotation)
  }

  const handleMouseUp = () => {
    setIsRotating(false)
  }

  // 좌표계 시각화용 마우스 이벤트
  const handleCoordClick = () => {
    setIsCoordTracking(!isCoordTracking)
  }

  const handleCoordMouseMove = (e: React.MouseEvent) => {
    if (!isCoordTracking || !coordCanvasRef.current) return

    const rect = coordCanvasRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const dx = mouseX - centerX
    const dy = mouseY - centerY

    const radians = Math.atan2(dy, dx)
    const degrees = (radians * 180) / Math.PI

    setCoordAngle(degrees)
    setCoordPosition({ x: dx, y: dy })
  }

  const handleCoordMouseLeave = () => {
    setIsCoordTracking(false)
  }

  useEffect(() => {
    if (isRotating) {
      window.addEventListener('mouseup', handleMouseUp)
      return () => window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isRotating])

  return (
    <Box className="space-y-8">
      {/* 서론 */}
      <Box>
        <Heading size="6" mb="4">
          도형 회전 각도 계산의 원리
        </Heading>
        <Text size="3" color="gray">
          마우스 드래그로 도형을 회전시키는 기능을 구현할 때, 어떻게 각도를
          계산할까요? 이 글에서는 수학의 기본 개념인{' '}
          <Code variant="ghost">atan2</Code> 함수를 활용한 회전 각도 계산 원리를
          알아봅니다.
        </Text>
      </Box>

      {/* 인터랙티브 데모 */}
      <Card>
        <Heading size="4" mb="3">
          💡 직접 체험해보기
        </Heading>
        <Text size="2" color="gray" mb="4">
          사각형을 드래그해서 회전시켜보세요!
        </Text>

        <Box
          ref={canvasRef}
          className="relative w-[300px] h-[300px] mx-auto bg-surface-code-light rounded-lg"
          style={{
            cursor: isRotating ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {/* 중심점 표시 */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2" />

          {/* 회전하는 사각형 */}
          <div
            className="absolute top-1/2 left-1/2 w-[100px] h-[100px] bg-blue-500"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transition: isRotating ? 'none' : 'transform 0.3s',
            }}
          />
        </Box>

        <Flex justify="center" mt="4">
          <Text size="5" weight="bold" color="blue">
            현재 각도: {Math.round(angle)}°
          </Text>
        </Flex>
      </Card>

      {/* 핵심 개념 1: atan2 함수 */}
      <Box>
        <Heading size="5" mb="3">
          1. atan2 함수란?
        </Heading>

        <Card variant="surface" mb="4">
          <Heading size="3" mb="2">
            🤔 왜 필요할까?
          </Heading>
          <Text mb="3">
            도형을 회전시키려면{' '}
            <strong>"마우스가 도형의 어느 방향에 있는지"</strong>를 알아야
            합니다. 이 방향을 각도로 표현해주는 것이 바로{' '}
            <Code variant="ghost">atan2</Code>입니다.{' '}
          </Text>
          <Text mb="3">
            예를 들어, 도형 중심을 기준으로 마우스가 오른쪽에 있으면 0°, 위쪽에
            있으면 90°, 왼쪽이면 180°를 알려줍니다.
          </Text>
        </Card>

        <Heading size="4" mb="3">
          📐 atan2의 역할
        </Heading>

        <Text mb="3">
          <Code variant="ghost">Math.atan2(y, x)</Code>는 원점 (0, 0)에서 점 (x,
          y)까지의 <strong>방향(각도)</strong>을 계산합니다.
        </Text>

        <Card variant="surface" mb="3">
          <Flex direction="column" gap="2">
            <Text weight="bold">간단히 말하면:</Text>
            <Text>
              • <strong>입력:</strong> 중심점에서 목표 지점까지의 X, Y 거리
            </Text>
            <Text>
              • <strong>출력:</strong> 그 방향이 몇 도(각도)인지
            </Text>
            <Text>
              • <strong>단위:</strong> 라디안 (-π ~ π) → 도(degree)로 변환 필요
            </Text>
          </Flex>
        </Card>

        <Heading size="4" mb="3">
          🧭 좌표계에서의 각도
        </Heading>

        <Text mb="3">
          컴퓨터 화면에서는 <strong>오른쪽이 0°</strong>이고, 시계 반대 방향으로
          각도가 증가합니다:
        </Text>

        <Card mb="4">
          <Heading size="3" mb="2">
            📊 좌표계 시각화 (인터랙티브)
          </Heading>
          <Text size="2" color="gray" mb="3">
            {isCoordTracking
              ? '✅ 추적 중! 마우스를 움직여보세요. (클릭하면 정지)'
              : '🖱️ 클릭하면 마우스 추적이 시작됩니다'}
          </Text>

          <Box
            ref={coordCanvasRef}
            className="relative w-[400px] h-[400px] mx-auto bg-surface-code-light rounded-lg border-2"
            onClick={handleCoordClick}
            onMouseMove={handleCoordMouseMove}
            onMouseLeave={handleCoordMouseLeave}
            style={{ cursor: isCoordTracking ? 'crosshair' : 'pointer' }}
          >
            {/* 중심점 */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
            <Text
              size="1"
              className="absolute top-1/2 left-1/2 translate-x-2 -translate-y-6 font-bold text-red-600"
            >
              원점 (0, 0)
            </Text>

            {/* X축 */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-400" />
            <Text
              size="2"
              weight="bold"
              className="absolute top-1/2 right-2 -translate-y-6"
            >
              +X →
            </Text>

            {/* Y축 */}
            <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-400" />
            <Text
              size="2"
              weight="bold"
              className="absolute left-1/2 bottom-2 translate-x-2"
            >
              +Y ↓
            </Text>

            {/* 4방향 각도 표시 */}
            {/* 오른쪽: X축 위로 올림 */}
            <Text
              size="2"
              weight="bold"
              className="absolute top-1/2 right-12 -translate-y-8 text-blue-600"
            >
              0° / 0 rad
            </Text>
            {/* 위: Y축 왼쪽으로 이동 */}
            <Text
              size="2"
              weight="bold"
              className="absolute top-12 left-1/2 -translate-x-24 text-blue-600"
            >
              -90° / -π/2
            </Text>
            {/* 왼쪽: X축 위로 올림 */}
            <Text
              size="2"
              weight="bold"
              className="absolute top-1/2 left-8 -translate-y-8 text-blue-600"
            >
              ±180° / ±π
            </Text>
            {/* 아래: Y축 오른쪽으로 이동 */}
            <Text
              size="2"
              weight="bold"
              className="absolute bottom-12 left-1/2 translate-x-4 text-blue-600"
            >
              90° / π/2
            </Text>

            {/* 마우스 위치까지의 선 */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            >
              <line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${coordPosition.x}px)`}
                y2={`calc(50% + ${coordPosition.y}px)`}
                stroke="rgb(139, 92, 246)"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <circle
                cx={`calc(50% + ${coordPosition.x}px)`}
                cy={`calc(50% + ${coordPosition.y}px)`}
                r="6"
                fill="rgb(139, 92, 246)"
              />
            </svg>
          </Box>

          <Box mt="4" p="4" className="bg-surface-code-dark rounded-lg">
            <Flex direction="column" gap="2">
              <Text size="3" weight="bold" className="text-code">
                📍 마우스 위치: ({coordPosition.x.toFixed(0)},{' '}
                {coordPosition.y.toFixed(0)})
              </Text>
              <Text size="3" weight="bold" className="text-code">
                📐 각도 (Degree): {coordAngle.toFixed(1)}°
              </Text>
              <Text size="3" weight="bold" className="text-code">
                🔢 각도 (Radian): {((coordAngle * Math.PI) / 180).toFixed(3)}{' '}
                rad
              </Text>
              <Text size="2" className="text-code">
                ➡️ Math.atan2({coordPosition.y.toFixed(0)},{' '}
                {coordPosition.x.toFixed(0)}) ={' '}
                {((coordAngle * Math.PI) / 180).toFixed(3)}
              </Text>
            </Flex>
          </Box>
        </Card>

        <Box p="4" mb="3" className="bg-surface-code-light rounded-lg">
          <Text mb="2" weight="bold">
            📍 실제 예시: <br />
          </Text>
          <Code size="3" variant="ghost" className="whitespace-pre font-mono">
            {`Math.atan2(0, 1)    // 0      → 오른쪽 (0°)
Math.atan2(1, 0)    // π/2    → 위 (90°)
Math.atan2(0, -1)   // π      → 왼쪽 (180°)
Math.atan2(-1, 0)   // -π/2   → 아래 (-90° 또는 270°)`}
          </Code>
        </Box>

        <Card variant="surface" mb="3">
          <Heading size="3" mb="2">
            💡 실전 사용 예시
          </Heading>
          <Text mb="2">
            도형 중심이 (150, 150)이고 마우스가 (200, 100)에 있을 때:
          </Text>
          <Box p="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// 1. 중심에서 마우스까지의 상대 거리 계산
const dx = 200 - 150  // 50 (오른쪽으로 50px)
const dy = 100 - 150  // -50 (위로 50px)

// 2. 각도 계산
const angle = Math.atan2(dy, dx)  // -0.785 라디안
const degrees = angle * (180 / Math.PI)  // -45°

// → 마우스는 도형 중심 기준으로 오른쪽 위(45°) 방향!`}
            </Code>
          </Box>
        </Card>

        <Card variant="surface" mb="3">
          <Flex direction="column" gap="2">
            <Text weight="bold">🎯 핵심 포인트:</Text>
            <Text>
              • <Code variant="ghost">atan2(y, x)</Code> 순서 주의! (Y가 먼저)
            </Text>
            <Text>• 반환값은 라디안 (-π ~ π) → 도(°)로 변환 필요</Text>
            <Text>• 360도 전 방향을 정확하게 구분 가능</Text>
            <Text>• 0으로 나누는 오류 걱정 없음 (안전)</Text>
          </Flex>
        </Card>
      </Box>

      {/* 핵심 개념 2: 회전 각도 계산 */}
      <Box>
        <Heading size="5" mb="3">
          2. 회전 각도 계산 방법
        </Heading>

        <Text mb="3">마우스로 도형을 회전시킬 때는 다음 3단계를 거칩니다:</Text>

        <Flex direction="column" gap="4">
          <Card>
            <Heading size="3" mb="2">
              Step 1: 초기 각도 저장
            </Heading>
            <Text mb="2">마우스를 누른 순간의 각도를 계산합니다.</Text>
            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`const centerX = shape.x + shape.w / 2
const centerY = shape.y + shape.h / 2

// 마우스 위치에서 중심점까지의 각도
const initialAngle = Math.atan2(
  mouseY - centerY,
  mouseX - centerX
)`}
              </Code>
            </Box>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              Step 2: 현재 각도 계산
            </Heading>
            <Text mb="2">
              마우스가 움직이는 동안 계속 현재 각도를 계산합니다.
            </Text>
            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`const currentAngle = Math.atan2(
  mouseY - centerY,
  mouseX - centerX
)`}
              </Code>
            </Box>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              Step 3: 변화량 계산 및 적용
            </Heading>
            <Text mb="2">
              현재 각도와 초기 각도의 차이를 구하고, 기존 회전 값에 더합니다.
            </Text>
            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`// 각도 변화량 (라디안 → 도)
const angleDelta = 
  ((currentAngle - initialAngle) * 180) / Math.PI

// 새로운 회전 각도
let newRotation = initialRotation + angleDelta

// 0-360 범위로 정규화
newRotation = ((newRotation % 360) + 360) % 360`}
              </Code>
            </Box>
          </Card>
        </Flex>
      </Box>

      {/* 핵심 개념 3: 라디안과 도 */}
      <Box>
        <Heading size="5" mb="3">
          3. 라디안(Radian)과 도(Degree) 변환
        </Heading>

        <Text mb="3">
          JavaScript의 삼각함수는 <strong>라디안</strong>을 사용하지만, CSS
          transform은 <strong>도(degree)</strong>를 사용합니다. 따라서 변환이
          필요합니다.
        </Text>

        <Flex gap="4" mb="3">
          <Card className="flex-1">
            <Heading size="3" mb="2">
              라디안 → 도
            </Heading>
            <Box p="3" className="bg-surface-code-light rounded-md">
              <Code variant="ghost">degree = (radian × 180) / π</Code>
            </Box>
          </Card>

          <Card className="flex-1">
            <Heading size="3" mb="2">
              도 → 라디안
            </Heading>
            <Box p="3" className="bg-surface-code-light rounded-md">
              <Code variant="ghost">radian = (degree × π) / 180</Code>
            </Box>
          </Card>
        </Flex>

        <Callout.Root color="blue">
          <Callout.Icon>💡</Callout.Icon>
          <Callout.Text>
            <strong>참고:</strong> 1 라디안 = 약 57.3도, 2π 라디안 = 360도
          </Callout.Text>
        </Callout.Root>
      </Box>

      {/* 핵심 개념 4: 각도 정규화 */}
      <Box>
        <Heading size="5" mb="3">
          4. 각도 정규화 (0-360도 범위)
        </Heading>

        <Text mb="3">
          회전을 계속하다 보면 각도가 360도를 넘거나 음수가 될 수 있습니다. 이를
          항상 0-360도 범위로 유지하려면:
        </Text>

        <Box p="4" mb="3" className="bg-surface-code-dark rounded-md">
          <Code size="2" variant="ghost" className="text-code whitespace-pre">
            {`// 각도 정규화
newRotation = ((newRotation % 360) + 360) % 360

// 예시:
// 370° → 10°
// -30° → 330°
// 720° → 0°`}
          </Code>
        </Box>

        <Callout.Root color="amber">
          <Callout.Icon>⚠️</Callout.Icon>
          <Callout.Text>
            JavaScript의 % 연산자는 음수를 제대로 처리하지 못하므로,
            <Code variant="ghost">((x % 360) + 360) % 360</Code> 패턴을 사용해야
            합니다.
          </Callout.Text>
        </Callout.Root>
      </Box>

      {/* 전체 코드 */}
      <Box>
        <Heading size="5" mb="3">
          5. 전체 구현 코드
        </Heading>

        <Text mb="3">위의 개념들을 모두 합친 완성 코드입니다:</Text>

        <Box p="4" className="bg-surface-code-dark rounded-md overflow-auto">
          <Code size="2" variant="ghost" className="text-code whitespace-pre">
            {`// 1. 마우스 다운: 초기 각도 저장
const handleRotateMouseDown = (e, shape) => {
  const center = shape.getCenter()
  const mouseX = e.clientX
  const mouseY = e.clientY
  
  const initialAngle = Math.atan2(
    mouseY - center.y,
    mouseX - center.x
  )
  
  setState({
    mode: 'rotating',
    initialAngle,
    initialRotation: shape.rotation
  })
}

// 2. 마우스 이동: 회전 적용
const handleMouseMove = (e) => {
  if (state.mode !== 'rotating') return
  
  const center = shape.getCenter()
  const mouseX = e.clientX
  const mouseY = e.clientY
  
  // 현재 각도 계산
  const currentAngle = Math.atan2(
    mouseY - center.y,
    mouseX - center.x
  )
  
  // 변화량 계산 (라디안 → 도)
  const angleDelta = 
    ((currentAngle - state.initialAngle) * 180) / Math.PI
  
  // 새로운 회전 각도
  let newRotation = state.initialRotation + angleDelta
  
  // 0-360 범위로 정규화
  newRotation = ((newRotation % 360) + 360) % 360
  
  // 도형에 적용
  shape.setRotation(newRotation)
}`}
          </Code>
        </Box>
      </Box>

      {/* atan2 계산 원리 */}
      <Box>
        <Heading size="5" mb="3">
          🔬 atan2는 어떻게 계산되는가?
        </Heading>

        <Text mb="3">
          <Code variant="ghost">atan2</Code>는 <Code variant="ghost">atan</Code>{' '}
          (아크 탄젠트)의 확장 버전입니다. 먼저 기본 삼각함수부터 이해해봅시다.
        </Text>

        <Card variant="surface" mb="4">
          <Heading size="4" mb="2">
            📐 기본 삼각함수 복습
          </Heading>
          <Text mb="3">
            직각삼각형에서 <Code variant="ghost">tan(각도) = 높이 / 밑변</Code>
            입니다.
          </Text>
          <Box p="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// tan (탄젠트)
tan(45°) = 1       // 45도일 때 tan 값은 1

// atan (아크 탄젠트 = tan의 역함수)
atan(1) = 45°      // tan 값이 1일 때 각도는 45도

// 즉, tan과 atan은 서로 반대!
tan(각도) → 비율
atan(비율) → 각도`}
            </Code>
          </Box>

          <Box mt="4" mb="3">
            <Text weight="bold">📊 함수 그래프로 이해하기</Text>
          </Box>
          <Flex gap="3" direction={{ initial: 'column', md: 'row' }}>
            {/* tan 그래프 */}
            <Box className="flex-1">
              <Text size="2" weight="bold" mb="2" align="center">
                tan(x) 함수
              </Text>
              <svg
                viewBox="0 0 300 200"
                className="w-full bg-surface-code-light rounded-lg border"
              >
                {/* 격자 */}
                <line
                  x1="0"
                  y1="100"
                  x2="300"
                  y2="100"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="200"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />

                {/* 점근선 */}
                <line
                  x1="55"
                  y1="0"
                  x2="55"
                  y2="200"
                  stroke="#f87171"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1="245"
                  y1="0"
                  x2="245"
                  y2="200"
                  stroke="#f87171"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />

                {/* tan 곡선 */}
                <path
                  d={(() => {
                    const points: string[] = []
                    for (let x = 60; x < 140; x += 2) {
                      const angle = ((x - 150) / 95) * (Math.PI / 2)
                      const y = 100 - Math.tan(angle) * 20
                      if (y > -100 && y < 300) {
                        points.push(`${x},${Math.max(0, Math.min(200, y))}`)
                      }
                    }
                    return `M ${points.join(' L ')}`
                  })()}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
                <path
                  d={(() => {
                    const points: string[] = []
                    for (let x = 160; x < 240; x += 2) {
                      const angle = ((x - 150) / 95) * (Math.PI / 2)
                      const y = 100 - Math.tan(angle) * 20
                      if (y > -100 && y < 300) {
                        points.push(`${x},${Math.max(0, Math.min(200, y))}`)
                      }
                    }
                    return `M ${points.join(' L ')}`
                  })()}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />

                {/* 레이블 */}
                <text x="10" y="15" fill="#64748b" fontSize="12">
                  y
                </text>
                <text x="285" y="115" fill="#64748b" fontSize="12">
                  x
                </text>
                <text x="50" y="195" fill="#f87171" fontSize="10">
                  -π/2
                </text>
                <text x="240" y="195" fill="#f87171" fontSize="10">
                  π/2
                </text>
                <text x="145" y="115" fill="#64748b" fontSize="10">
                  0
                </text>
              </svg>
              <Text size="1" color="gray" align="center" mt="1">
                급격하게 증가하며 점근선(빨간 선)에서 무한대로
              </Text>
            </Box>

            {/* atan 그래프 */}
            <Box className="flex-1">
              <Text size="2" weight="bold" mb="2" align="center">
                atan(x) 함수
              </Text>
              <svg
                viewBox="0 0 300 200"
                className="w-full bg-surface-code-light rounded-lg border"
              >
                {/* 격자 */}
                <line
                  x1="0"
                  y1="100"
                  x2="300"
                  y2="100"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1="150"
                  y1="0"
                  x2="150"
                  y2="200"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />

                {/* 수평 점근선 */}
                <line
                  x1="0"
                  y1="30"
                  x2="300"
                  y2="30"
                  stroke="#f87171"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1="0"
                  y1="170"
                  x2="300"
                  y2="170"
                  stroke="#f87171"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />

                {/* atan 곡선 */}
                <path
                  d={(() => {
                    const points: string[] = []
                    for (let x = 0; x <= 300; x += 2) {
                      const inputValue = (x - 150) / 30
                      const y = 100 - Math.atan(inputValue) * 45
                      points.push(`${x},${y}`)
                    }
                    return `M ${points.join(' L ')}`
                  })()}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                {/* 레이블 */}
                <text x="10" y="15" fill="#64748b" fontSize="12">
                  y
                </text>
                <text x="285" y="115" fill="#64748b" fontSize="12">
                  x
                </text>
                <text x="5" y="35" fill="#f87171" fontSize="10">
                  π/2
                </text>
                <text x="5" y="175" fill="#f87171" fontSize="10">
                  -π/2
                </text>
                <text x="145" y="115" fill="#64748b" fontSize="10">
                  0
                </text>
              </svg>
              <Text size="1" color="gray" align="center" mt="1">
                완만하게 증가하며 -π/2 ~ π/2 범위에 수렴
              </Text>
            </Box>
          </Flex>

          <Callout.Root color="blue" mt="3">
            <Callout.Text>
              💡 <strong>핵심:</strong> tan은 각도 → 비율, atan은 비율 → 각도로
              변환합니다. 하지만 atan은 -90° ~ 90°만 반환할 수 있습니다!
            </Callout.Text>
          </Callout.Root>
        </Card>

        <Card variant="surface" mb="4">
          <Heading size="4" mb="2">
            ⚠️ atan의 문제점
          </Heading>
          <Text mb="3">
            <Code variant="ghost">atan(y / x)</Code>만 사용하면 두 가지 문제가
            있습니다:
          </Text>

          <Flex direction="column" gap="2" mb="3">
            <Text>
              <strong>1. 범위 제한:</strong> atan은 -90° ~ 90°만 반환 (2사분면만
              커버)
            </Text>
            <Text>
              <strong>2. 0으로 나누기 오류:</strong> x가 0이면 계산 불가
            </Text>
          </Flex>

          <Box p="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// atan의 한계
atan(1 / 1)    = 45°    ✅ (1사분면: 오른쪽 위)
atan(-1 / -1)  = 45°    ❌ (3사분면인데 45°로 나옴!)
atan(1 / 0)    = ERROR  ❌ (0으로 나눌 수 없음)`}
            </Code>
          </Box>
        </Card>

        <Card variant="surface" mb="4">
          <Heading size="4" mb="2">
            ✨ atan2의 해결책
          </Heading>
          <Text mb="3">
            <Code variant="ghost">atan2(y, x)</Code>는 x와 y를{' '}
            <strong>따로</strong> 받아서 4가지 사분면을 모두 구분합니다:
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// atan2는 x, y의 부호로 사분면 판단!
atan2(1, 1)    =  45°   ✅ (x>0, y>0 → 1사분면)
atan2(1, -1)   = 135°   ✅ (x<0, y>0 → 2사분면)
atan2(-1, -1)  = -135°  ✅ (x<0, y<0 → 3사분면)
atan2(-1, 1)   = -45°   ✅ (x>0, y<0 → 4사분면)

// x가 0이어도 안전!
atan2(1, 0)    =  90°   ✅ (정확히 위)
atan2(-1, 0)   = -90°   ✅ (정확히 아래)`}
            </Code>
          </Box>

          <Callout.Root color="blue" mb="3">
            <Callout.Text>
              💡 <strong>핵심:</strong> atan2는 단순히{' '}
              <Code variant="ghost">atan(y/x)</Code>가 아니라, x와 y의{' '}
              <strong>부호를 확인</strong>해서 정확한 사분면을 찾아냅니다!
            </Callout.Text>
          </Callout.Root>

          <Box mt="4">
            <Heading size="4" mb="3">
              🔍 atan2의 내부 동작 원리
            </Heading>
            <Text mb="3">
              atan2는 결국 <strong>atan에 사분면 분기 처리를 추가한 것</strong>
              입니다:
            </Text>

            <Box p="4" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`// 1단계: 기본 각도 계산
angle = atan(y / x)  // -90° ~ 90° 범위만 나옴

// 2단계: 사분면 보정
if (x > 0) {
    return angle              // 1, 4사분면: 그대로
}
else if (x < 0 && y >= 0) {
    return angle + 180°       // 2사분면: 180° 더함
}
else if (x < 0 && y < 0) {
    return angle - 180°       // 3사분면: 180° 뺌
}
else if (x == 0 && y > 0) {
    return 90°                // 정북 (수직 위)
}
else if (x == 0 && y < 0) {
    return -90°               // 정남 (수직 아래)
}`}
              </Code>
            </Box>

            <Box mt="3" p="3" className="bg-surface-info rounded-md">
              <Text size="2" weight="bold" mb="2">
                📝 왜 이렇게 보정할까?
              </Text>
              <Flex direction="column" gap="2">
                <Text size="2">
                  • <strong>1, 4사분면 (x &gt; 0):</strong> atan이 이미 올바른
                  값을 반환
                </Text>
                <Text size="2">
                  • <strong>2사분면 (x &lt; 0, y ≥ 0):</strong> atan은 음수를
                  반환하지만 실제로는 90°~180° 범위 → +180° 보정
                </Text>
                <Text size="2">
                  • <strong>3사분면 (x &lt; 0, y &lt; 0):</strong> atan은 양수를
                  반환하지만 실제로는 -180°~-90° 범위 → -180° 보정
                </Text>
                <Text size="2">
                  • <strong>수직선 (x = 0):</strong> 0으로 나누기 방지, y의
                  부호로 판단
                </Text>
              </Flex>
            </Box>
          </Box>
        </Card>

        <Card variant="surface">
          <Heading size="4" mb="2">
            🧮 실제 계산 예시
          </Heading>
          <Text mb="3">
            마우스가 중심에서 <strong>왼쪽 위 (2사분면)</strong>에 있을 때:
          </Text>
          <Box p="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// 좌표
const dx = -50  // 왼쪽 (음수)
const dy = 30   // 위 (양수)

// ❌ atan만 사용한다면?
const wrongAngle = Math.atan(dy / dx)
// = atan(30 / -50) 
// = atan(-0.6)
// = -31° ❌ (4사분면 각도가 나옴! 실제로는 2사분면인데...)

// ✅ atan2를 사용하면?
const correctAngle = Math.atan2(dy, dx)

// [내부 동작]
// 1단계: 기본 각도 계산
angle = atan(30 / -50) = atan(-0.6) = -31°

// 2단계: 사분면 판단
// x < 0, y >= 0 → 2사분면!

// 3단계: 보정
angle + 180° = -31° + 180° = 149° ✅

// 결과: 149° (정확한 2사분면 각도!)`}
            </Code>
          </Box>

          <Callout.Root color="green" mt="3">
            <Callout.Text>
              🎯 <strong>이게 핵심입니다!</strong> atan2는 단순히 y/x를
              계산하는게 아니라, <strong>x와 y를 따로 받아서</strong> 부호를
              확인한 뒤 적절히 보정합니다. 이렇게 하면 360도 전체를 정확하게
              표현할 수 있습니다!
            </Callout.Text>
          </Callout.Root>
        </Card>
      </Box>

      {/* 결론 */}
      <Box>
        <Heading size="5" mb="3">
          마무리
        </Heading>

        <Text mb="3">
          회전 각도 계산의 핵심은 <Code variant="ghost">atan2</Code> 함수를
          사용해 마우스와 중심점 사이의 각도를 구하고, 초기 각도와의 차이를
          계산하는 것입니다.
        </Text>

        <Card variant="surface">
          <Flex direction="column" gap="2">
            <Text weight="bold">핵심 요약:</Text>
            <Text>
              1. <Code variant="ghost">atan2(y, x)</Code>로 각도 계산 (라디안)
            </Text>
            <Text>2. 초기 각도 저장 → 현재 각도 계산 → 차이 구하기</Text>
            <Text>
              3. 라디안을 도로 변환:{' '}
              <Code variant="ghost">(radian × 180) / Math.PI</Code>
            </Text>
            <Text>
              4. 각도 정규화:{' '}
              <Code variant="ghost">((angle % 360) + 360) % 360</Code>
            </Text>
          </Flex>
        </Card>
      </Box>
    </Box>
  )
}
