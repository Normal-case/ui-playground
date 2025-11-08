import type { Shape } from '@dnd/_classes'
import { cn } from '@/shared/lib/cn'
import { ResizeHandle, RotateHandle, ShapeType } from '@dnd/_types'

interface ShapeRendererProps {
  shape: Shape
  isDragging: boolean
  isResizing: boolean
  isRotating: boolean
  selectedShapeId: string | null
  onResizeHandleMouseDown: (
    e: React.MouseEvent,
    shapeId: string,
    handle: ResizeHandle
  ) => void
  onRotateHandleMouseDown: (
    e: React.MouseEvent,
    shapeId: string,
    handle: RotateHandle
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

function RotateHandleComponent({
  shapeId,
  onMouseDown,
}: {
  shapeId: string
  onMouseDown: (
    e: React.MouseEvent,
    shapeId: string,
    handle: RotateHandle
  ) => void
}) {
  return (
    <div
      className="absolute -top-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
      onMouseDown={e => {
        e.stopPropagation()
        onMouseDown(e, shapeId, RotateHandle.Top)
      }}
    >
      {/* 연결선 */}
      <div className="h-7 w-0.5 bg-blue-500" />
      {/* 회전 핸들 */}
      <div className="-mt-7 flex h-4 w-4 cursor-grab items-center justify-center rounded-full border-2 border-blue-500 bg-white hover:cursor-grabbing">
        <svg
          className="h-2.5 w-2.5 text-blue-500"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 19v4l-5-5 5-5v4c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6H4c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      </div>
    </div>
  )
}

export function ShapeRenderer({
  shape,
  isDragging,
  isResizing,
  isRotating,
  selectedShapeId,
  onResizeHandleMouseDown,
  onRotateHandleMouseDown,
}: ShapeRendererProps) {
  const isSelected = selectedShapeId === shape.id
  const showHandles = isSelected && !isDragging && !isResizing && !isRotating

  // 공통 transform 스타일
  const transformStyle = {
    transform: `rotate(${shape.rotation}deg)`,
    transformOrigin: 'center center',
  }

  // 삼각형의 경우 border trick 사용
  if (shape.type === ShapeType.Triangle) {
    return (
      <div
        className={cn(
          'absolute select-none',
          isDragging || isResizing || isRotating
            ? 'cursor-grabbing'
            : 'cursor-move',
          isSelected && 'ring-2 ring-blue-500 ring-offset-2'
        )}
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
          ...transformStyle,
        }}
      >
        <div
          className={cn(
            isDragging || isResizing || isRotating
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
        {showHandles && (
          <>
            {RESIZE_HANDLES.map(handle => (
              <ResizeHandleComponent
                key={handle}
                handle={handle}
                shapeId={shape.id}
                onMouseDown={onResizeHandleMouseDown}
              />
            ))}
            <RotateHandleComponent
              shapeId={shape.id}
              onMouseDown={onRotateHandleMouseDown}
            />
          </>
        )}
      </div>
    )
  }

  // 별과 육각형: clip-path polygon
  if (shape.type === ShapeType.Star || shape.type === ShapeType.Hexagon) {
    return (
      <div
        className={cn(
          'absolute select-none',
          isDragging || isResizing || isRotating
            ? 'cursor-grabbing'
            : 'cursor-move',
          isSelected && 'ring-2 ring-blue-500 ring-offset-2 rounded-lg'
        )}
        style={{
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          width: `${shape.w}px`,
          height: `${shape.h}px`,
          ...transformStyle,
        }}
      >
        {/* 도형 자체 (clipPath 적용) */}
        <div
          className={cn(
            'absolute inset-0',
            isDragging || isResizing || isRotating
              ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
              : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-[filter] duration-200'
          )}
          style={{
            backgroundColor: shape.color,
            clipPath: createPolygonPath(shape),
          }}
        />
        {/* 리사이즈 & 회전 핸들 */}
        {showHandles && (
          <>
            {RESIZE_HANDLES.map(handle => (
              <ResizeHandleComponent
                key={handle}
                handle={handle}
                shapeId={shape.id}
                onMouseDown={onResizeHandleMouseDown}
              />
            ))}
            <RotateHandleComponent
              shapeId={shape.id}
              onMouseDown={onRotateHandleMouseDown}
            />
          </>
        )}
      </div>
    )
  }

  // 원과 사각형
  return (
    <div
      className={cn(
        'absolute select-none',
        isDragging || isResizing || isRotating
          ? 'cursor-grabbing'
          : 'cursor-move',
        isDragging || isResizing || isRotating
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
        ...transformStyle,
      }}
    >
      {showHandles && (
        <>
          {RESIZE_HANDLES.map(handle => (
            <ResizeHandleComponent
              key={handle}
              handle={handle}
              shapeId={shape.id}
              onMouseDown={onResizeHandleMouseDown}
            />
          ))}
          <RotateHandleComponent
            shapeId={shape.id}
            onMouseDown={onRotateHandleMouseDown}
          />
        </>
      )}
    </div>
  )
}
