import type { Shape } from '../_classes'
import { cn } from '@/shared/lib/cn'

interface ShapeRendererProps {
  shape: Shape
  isDragging: boolean
}

/**
 * 도형의 vertices를 bounds 기준 퍼센트로 변환하여 polygon 문자열 생성
 */
function createPolygonPath(shape: Shape): string {
  if (!('getVertices' in shape)) return ''

  const vertices = (
    shape as { getVertices: () => { x: number; y: number }[] }
  ).getVertices()

  const polygonPoints = vertices
    .map(vertex => {
      // 절대 좌표를 shape bounds 내에서 퍼센트로 변환
      const xPercent = ((vertex.x - shape.x) / shape.w) * 100
      const yPercent = ((vertex.y - shape.y) / shape.h) * 100
      return `${xPercent.toFixed(2)}% ${yPercent.toFixed(2)}%`
    })
    .join(', ')

  return `polygon(${polygonPoints})`
}

/**
 * ShapeRenderer 컴포넌트
 * 각 도형을 DOM 요소로 렌더링합니다.
 */
export function ShapeRenderer({ shape, isDragging }: ShapeRendererProps) {
  // 삼각형의 경우 border trick 사용
  if (shape.type === 'triangle') {
    return (
      <div
        className="absolute cursor-move select-none"
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
        }}
      >
        <div
          className={cn(
            isDragging
              ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
              : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-[filter] duration-200'
          )}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${shape.w / 2}px solid transparent`,
            borderRight: `${shape.w / 2}px solid transparent`,
            borderBottom: `${shape.h}px solid ${shape.color}`,
          }}
        />
      </div>
    )
  }

  // 별: clip-path polygon으로 5각 별 그리기
  if (shape.type === 'star') {
    return (
      <div
        className={cn(
          'absolute cursor-move select-none',
          isDragging
            ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
            : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-[filter] duration-200'
        )}
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
          backgroundColor: shape.color,
          clipPath: createPolygonPath(shape),
        }}
      />
    )
  }

  // 육각형: clip-path polygon으로 정육각형 그리기
  if (shape.type === 'hexagon') {
    return (
      <div
        className={cn(
          'absolute cursor-move select-none',
          isDragging
            ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
            : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-[filter] duration-200'
        )}
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
          backgroundColor: shape.color,
          clipPath: createPolygonPath(shape),
        }}
      />
    )
  }

  // 원과 사각형
  return (
    <div
      className={cn(
        'absolute cursor-move select-none',
        isDragging
          ? 'shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
          : 'shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-shadow duration-200',
        shape.type === 'circle' && 'rounded-full'
      )}
      style={{
        left: `${shape.x}px`,
        top: `${shape.y}px`,
        width: `${shape.w}px`,
        height: `${shape.h}px`,
        backgroundColor: shape.color,
      }}
    />
  )
}
