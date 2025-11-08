import { useState } from 'react'
import { Button, Flex, Box, Heading, Text } from '@radix-ui/themes'
import { Canvas } from './_components/Canvas'
import {
  Rectangle,
  Circle,
  Triangle,
  Star,
  Hexagon,
  type Shape,
} from '@dnd/_classes'
import { ShapeType } from '@dnd/_types'
import { ShapePreview } from '@dnd/_components'

// 캔버스 크기 상수
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

export default function DndResizePage() {
  const [shapes, setShapes] = useState<Shape[]>([])

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

  const addStar = () => {
    const width = 90
    const height = 90
    const star = new Star(
      `star-${Date.now()}`,
      Math.random() * (CANVAS_WIDTH - width),
      Math.random() * (CANVAS_HEIGHT - height),
      width,
      height,
      getRandomColor()
    )
    setShapes(prev => [...prev, star])
  }

  const addHexagon = () => {
    const width = 70
    const height = 80 // 세로로 긴 육각형
    const hexagon = new Hexagon(
      `hexagon-${Date.now()}`,
      Math.random() * (CANVAS_WIDTH - width),
      Math.random() * (CANVAS_HEIGHT - height),
      width,
      height,
      getRandomColor()
    )
    setShapes(prev => [...prev, hexagon])
  }

  const clearAll = () => {
    setShapes([])
  }

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          DND Resize - 도형 드래그 & 리사이즈
        </Heading>
        <Text size="2" color="gray">
          도형을 추가하고 자유롭게 드래그하거나 크기를 조절해보세요. 도형을
          클릭하면 4개의 모서리에 리사이즈 핸들이 표시됩니다.
        </Text>
      </Box>

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
        <Button onClick={addStar} variant="soft" color="amber">
          ⭐ 별 추가
        </Button>
        <Button onClick={addHexagon} variant="soft" color="cyan">
          ⬡ 육각형 추가
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

      <Box mb="4">
        <Text size="2" color="gray">
          현재 도형 개수: <strong>{shapes.length}</strong>
        </Text>
      </Box>

      <Canvas
        shapes={shapes}
        setShapes={setShapes}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />

      {shapes.length > 0 && (
        <Box mt="4">
          <Heading size="4" mb="2">
            도형 목록
          </Heading>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {[...shapes]
              .sort((a, b) => a.createdAt - b.createdAt)
              .map(shape => (
                <Box
                  key={shape.id}
                  p="3"
                  className="rounded-md border border-slate-200 bg-card dark:border-slate-700"
                >
                  <Flex justify="between" align="center">
                    <div>
                      <Text size="2" weight="bold">
                        {shape.type === ShapeType.Rectangle && '🟦 사각형'}
                        {shape.type === ShapeType.Circle && '🟢 원'}
                        {shape.type === ShapeType.Triangle && '🔺 삼각형'}
                        {shape.type === ShapeType.Star && '⭐ 별'}
                        {shape.type === ShapeType.Hexagon && '⬡ 육각형'}
                      </Text>
                      <Text size="1" color="gray" className="mt-1 block">
                        x: {Math.round(shape.x)}, y: {Math.round(shape.y)}
                      </Text>
                      <Text size="1" color="gray" className="block">
                        w: {Math.round(shape.w)}, h: {Math.round(shape.h)}
                      </Text>
                    </div>
                    <ShapePreview shape={shape} />
                  </Flex>
                </Box>
              ))}
          </div>
        </Box>
      )}
    </div>
  )
}
