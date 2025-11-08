import { cn } from '@/shared/lib/cn'
import { ShapeType } from '@dnd/_types'
import type { Shape } from '@dnd/_classes'

interface ShapePreviewProps {
  shape: Shape
  size?: number
}

/**
 * 도형 미리보기 컴포넌트
 * 각 도형 타입에 맞게 작은 미리보기를 렌더링합니다.
 */
export function ShapePreview({ shape, size = 24 }: ShapePreviewProps) {
  const sizeClass = `h-${size / 4} w-${size / 4}` // Tailwind 클래스 (h-6 w-6)

  // 삼각형
  if (shape.type === ShapeType.Triangle) {
    return (
      <div
        className={sizeClass}
        style={{
          transform: `rotate(${shape.rotation}deg)`,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${shape.color}`,
          }}
        />
      </div>
    )
  }

  // 별
  if (shape.type === ShapeType.Star) {
    return (
      <div
        className={sizeClass}
        style={{
          backgroundColor: shape.color,
          clipPath:
            'polygon(50% 0%, 61.8% 33.8%, 97.6% 34.5%, 69% 56.2%, 79.4% 90.5%, 50% 70%, 20.6% 90.5%, 31% 56.2%, 2.4% 34.5%, 38.2% 33.8%)',
          transform: `rotate(${shape.rotation}deg)`,
        }}
      />
    )
  }

  // 육각형
  if (shape.type === ShapeType.Hexagon) {
    return (
      <div
        className={sizeClass}
        style={{
          backgroundColor: shape.color,
          clipPath:
            'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          transform: `rotate(${shape.rotation}deg)`,
        }}
      />
    )
  }

  // 원과 사각형
  return (
    <div
      className={cn(
        sizeClass,
        shape.type === ShapeType.Circle && 'rounded-full'
      )}
      style={{
        backgroundColor: shape.color,
        transform: `rotate(${shape.rotation}deg)`,
      }}
    />
  )
}
