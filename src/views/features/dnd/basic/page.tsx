import { useState } from 'react'
import { Button, Flex, Box, Heading, Text } from '@radix-ui/themes'
import { Canvas } from './_components/Canvas'
import { Rectangle, Circle, Triangle, type Shape } from './_classes'
import { cn } from '@/shared/lib/cn'

// 캔버스 크기 상수
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

export default function DndBasicPage() {
  const [shapes, setShapes] = useState<Shape[]>([])

  /**
   * 랜덤한 색상을 생성합니다.
   */
  const getRandomColor = () => {
    const colors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // violet
      '#ec4899', // pink
      '#06b6d4', // cyan
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  /**
   * 사각형을 추가합니다.
   */
  const addRectangle = () => {
    const width = 100
    const height = 80
    const rect = new Rectangle(
      `rect-${Date.now()}`,
      Math.random() * (CANVAS_WIDTH - width),
      Math.random() * (CANVAS_HEIGHT - height),
      width,
      height,
      getRandomColor()
    )
    setShapes(prev => [...prev, rect])
  }

  /**
   * 원을 추가합니다.
   */
  const addCircle = () => {
    const diameter = 80
    const circle = new Circle(
      `circle-${Date.now()}`,
      Math.random() * (CANVAS_WIDTH - diameter),
      Math.random() * (CANVAS_HEIGHT - diameter),
      diameter,
      getRandomColor()
    )
    setShapes(prev => [...prev, circle])
  }

  /**
   * 삼각형을 추가합니다.
   */
  const addTriangle = () => {
    const width = 100
    const height = 90
    const triangle = new Triangle(
      `triangle-${Date.now()}`,
      Math.random() * (CANVAS_WIDTH - width),
      Math.random() * (CANVAS_HEIGHT - height),
      width,
      height,
      getRandomColor()
    )
    setShapes(prev => [...prev, triangle])
  }

  /**
   * 모든 도형을 제거합니다.
   */
  const clearAll = () => {
    setShapes([])
  }

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          DND Basic - 도형 드래그 앤 드롭
        </Heading>
        <Text size="2" color="gray">
          도형을 추가하고 자유롭게 드래그해보세요. 각 도형은 클래스로 관리되며
          (x, y, w, h) 위치 정보를 가집니다.
        </Text>
      </Box>

      {/* 컨트롤 패널 */}
      <Flex gap="3" mb="4" wrap="wrap">
        <Button onClick={addRectangle} variant="soft" color="blue">
          🟦 사각형 추가
        </Button>
        <Button onClick={addCircle} variant="soft" color="green">
          🟢 원 추가
        </Button>
        <Button onClick={addTriangle} variant="soft" color="purple">
          🔺 삼각형 추가
        </Button>
        <Button
          onClick={clearAll}
          variant="soft"
          color="red"
          disabled={shapes.length === 0}
        >
          🗑️ 모두 제거
        </Button>
      </Flex>

      {/* 상태 정보 */}
      <Box mb="4">
        <Text size="2" color="gray">
          현재 도형 개수: <strong>{shapes.length}</strong>
        </Text>
      </Box>

      {/* 캔버스 */}
      <Canvas
        shapes={shapes}
        setShapes={setShapes}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />

      {/* 도형 목록 */}
      {shapes.length > 0 && (
        <Box mt="4">
          <Heading size="4" mb="2">
            도형 목록
          </Heading>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {shapes.map(shape => (
              <Box
                key={shape.id}
                p="3"
                className="rounded-md border border-slate-200 bg-card dark:border-slate-700"
              >
                <Flex justify="between" align="center">
                  <div>
                    <Text size="2" weight="bold">
                      {shape.type === 'rectangle' && '🟦 사각형'}
                      {shape.type === 'circle' && '🟢 원'}
                      {shape.type === 'triangle' && '🔺 삼각형'}
                    </Text>
                    <Text size="1" color="gray" className="mt-1 block">
                      x: {Math.round(shape.x)}, y: {Math.round(shape.y)}
                    </Text>
                    <Text size="1" color="gray" className="block">
                      w: {shape.w}, h: {shape.h}
                    </Text>
                  </div>
                  <div
                    className={cn(
                      'h-6 w-6',
                      shape.type === 'circle' ? 'rounded-full' : 'rounded'
                    )}
                    style={{
                      backgroundColor: shape.color,
                    }}
                  />
                </Flex>
              </Box>
            ))}
          </div>
        </Box>
      )}
    </div>
  )
}
