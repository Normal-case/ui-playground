import type { Shape } from '@dnd/_classes'
import { cn } from '@/shared/lib/cn'
import { ResizeHandle, ShapeType } from '@dnd/_types'

interface ShapeRendererProps {
  shape: Shape
  isDragging: boolean
  isResizing: boolean
  selectedShapeId: string | null
  onResizeHandleMouseDown: (
    e: React.MouseEvent,
    shapeId: string,
    handle: ResizeHandle
  ) => void
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

const RESIZE_HANDLES = [
  ResizeHandle.TopLeft,
  ResizeHandle.TopRight,
  ResizeHandle.BottomLeft,
  ResizeHandle.BottomRight,
] as const

function ResizeHandleComponent({
  handle,
  shapeId,
  onMouseDown,
}: {
  handle: ResizeHandle
  shapeId: string
  onMouseDown: (
    e: React.MouseEvent,
    shapeId: string,
    handle: ResizeHandle
  ) => void
}) {
  const positionClass = {
    [ResizeHandle.TopLeft]: '-top-1 -left-1',
    [ResizeHandle.TopRight]: '-top-1 -right-1',
    [ResizeHandle.BottomLeft]: '-bottom-1 -left-1',
    [ResizeHandle.BottomRight]: '-bottom-1 -right-1',
  }[handle]

  const cursorClass = {
    [ResizeHandle.TopLeft]: 'cursor-nwse-resize',
    [ResizeHandle.TopRight]: 'cursor-nesw-resize',
    [ResizeHandle.BottomLeft]: 'cursor-nesw-resize',
    [ResizeHandle.BottomRight]: 'cursor-nwse-resize',
  }[handle]

  return (
    <div
      className={cn(
        'absolute z-10 h-3 w-3 rounded-full border-2 border-blue-500 bg-white',
        positionClass,
        cursorClass
      )}
      onMouseDown={e => {
        e.stopPropagation()
        onMouseDown(e, shapeId, handle)
      }}
    />
  )
}

export function ShapeRenderer({
  shape,
  isDragging,
  isResizing,
  selectedShapeId,
  onResizeHandleMouseDown,
}: ShapeRendererProps) {
  const isSelected = selectedShapeId === shape.id
  const showResizeHandles = isSelected && !isDragging && !isResizing

  // 삼각형의 경우 border trick 사용
  if (shape.type === ShapeType.Triangle) {
    return (
      <div
        className={cn(
          'absolute select-none',
          isDragging || isResizing ? 'cursor-grabbing' : 'cursor-move',
          isSelected && 'ring-2 ring-blue-500 ring-offset-2'
        )}
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
        }}
      >
        <div
          className={cn(
            isDragging || isResizing
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
        {showResizeHandles &&
          RESIZE_HANDLES.map(handle => (
            <ResizeHandleComponent
              key={handle}
              handle={handle}
              shapeId={shape.id}
              onMouseDown={onResizeHandleMouseDown}
            />
          ))}
      </div>
    )
  }

  // 별과 육각형: clip-path polygon
  if (shape.type === ShapeType.Star || shape.type === ShapeType.Hexagon) {
    return (
      <div
        className={cn(
          'absolute select-none',
          isDragging || isResizing ? 'cursor-grabbing' : 'cursor-move',
          isSelected && 'ring-2 ring-blue-500 ring-offset-2 rounded-lg'
        )}
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
        }}
      >
        {/* 도형 자체 (clipPath 적용) */}
        <div
          className={cn(
            'absolute inset-0',
            isDragging || isResizing
              ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
              : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-[filter] duration-200'
          )}
          style={{
            backgroundColor: shape.color,
            clipPath: createPolygonPath(shape),
          }}
        />
        {/* 리사이즈 핸들 (clipPath 영향 안받음) */}
        {showResizeHandles &&
          RESIZE_HANDLES.map(handle => (
            <ResizeHandleComponent
              key={handle}
              handle={handle}
              shapeId={shape.id}
              onMouseDown={onResizeHandleMouseDown}
            />
          ))}
      </div>
    )
  }

  // 원과 사각형
  return (
    <div
      className={cn(
        'absolute select-none',
        isDragging || isResizing ? 'cursor-grabbing' : 'cursor-move',
        isDragging || isResizing
          ? 'shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
          : 'shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-shadow duration-200',
        shape.type === ShapeType.Circle && 'rounded-full',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2'
      )}
      style={{
        left: `${shape.x}px`,
        top: `${shape.y}px`,
        width: `${shape.w}px`,
        height: `${shape.h}px`,
        backgroundColor: shape.color,
      }}
    >
      {showResizeHandles &&
        RESIZE_HANDLES.map(handle => (
          <ResizeHandleComponent
            key={handle}
            handle={handle}
            shapeId={shape.id}
            onMouseDown={onResizeHandleMouseDown}
          />
        ))}
    </div>
  )
}
