import type { Shape } from '../_classes'
import { cn } from '@/shared/lib/cn'

interface ShapeRendererProps {
  shape: Shape
  isDragging: boolean
}

/**
 * ShapeRenderer 컴포넌트
 * 각 도형을 DOM 요소로 렌더링합니다.
 */
export function ShapeRenderer({ shape, isDragging }: ShapeRendererProps) {
  // 삼각형의 경우 특별한 처리
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
