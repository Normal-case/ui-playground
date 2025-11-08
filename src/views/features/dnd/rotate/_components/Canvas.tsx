import type { Shape } from '@dnd/_classes'
import { ShapeRenderer } from './ShapeRenderer'
import { useDragResizeRotate } from '../_hooks/useDragResizeRotate'
import { cn } from '@/shared/lib/cn'

interface CanvasProps {
  shapes: Shape[]
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
  width?: number
  height?: number
}

/**
 * Canvas 컴포넌트
 * 도형들을 렌더링하고 드래그, 리사이즈, 회전을 처리하는 메인 캔버스입니다.
 */
export function Canvas({
  shapes,
  setShapes,
  width = 800,
  height = 600,
}: CanvasProps) {
  const {
    canvasRef,
    selectedShapeId,
    interactionState,
    handlers,
    handleResizeMouseDown,
    handleRotateMouseDown,
  } = useDragResizeRotate(shapes, setShapes)

  const getCursorClass = () => {
    switch (interactionState.mode) {
      case 'dragging':
        return 'cursor-grabbing'
      case 'resizing':
        return 'cursor-nwse-resize'
      case 'rotating':
        return 'cursor-grabbing'
      default:
        return 'cursor-default'
    }
  }

  return (
    <div
      ref={canvasRef}
      className={cn(
        'relative overflow-hidden rounded-lg border-2 border-slate-200 bg-surface-canvas dark:border-slate-700',
        getCursorClass()
      )}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      {...handlers}
    >
      {shapes.map(shape => (
        <ShapeRenderer
          key={shape.id}
          shape={shape}
          isDragging={
            interactionState.mode === 'dragging' &&
            interactionState.targetShapeId === shape.id
          }
          isResizing={
            interactionState.mode === 'resizing' &&
            interactionState.targetShapeId === shape.id
          }
          isRotating={
            interactionState.mode === 'rotating' &&
            interactionState.targetShapeId === shape.id
          }
          selectedShapeId={selectedShapeId}
          onResizeHandleMouseDown={handleResizeMouseDown}
          onRotateHandleMouseDown={handleRotateMouseDown}
        />
      ))}

      {/* 캔버스가 비어있을 때 안내 메시지 */}
      {shapes.length === 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-lg font-medium text-slate-400 dark:text-slate-500">
          도형을 추가하고 드래그 & 리사이즈 & 회전 해보세요
        </div>
      )}
    </div>
  )
}
