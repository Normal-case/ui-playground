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

        <Text mb="3">
          <Code variant="ghost">Math.atan2(y, x)</Code>는 두 점 사이의 각도를
          계산하는 함수입니다. 원점(0, 0)에서 점(x, y)까지의 각도를
          <strong>라디안</strong>
          단위로 반환합니다.
        </Text>

        <Card variant="surface" mb="3">
          <Flex direction="column" gap="2">
            <Text weight="bold">특징:</Text>
            <Text>• 반환값: -π ~ π (라디안)</Text>
            <Text>• 4개의 사분면을 모두 구분 가능</Text>
            <Text>• atan보다 안정적 (0으로 나누는 문제 없음)</Text>
          </Flex>
        </Card>

        <Box p="4" className="bg-surface-code-light rounded-lg font-mono">
          <Code size="3" variant="ghost">
            {`// 예시
Math.atan2(0, 1)    // 0      (오른쪽)
Math.atan2(1, 0)    // π/2    (위)
Math.atan2(0, -1)   // π      (왼쪽)
Math.atan2(-1, 0)   // -π/2   (아래)`}
          </Code>
        </Box>
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
              <Code size="2" variant="ghost" className="text-code">
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
              <Code size="2" variant="ghost" className="text-code">
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
              <Code size="2" variant="ghost" className="text-code">
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
          <Code size="2" variant="ghost" className="text-code">
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
