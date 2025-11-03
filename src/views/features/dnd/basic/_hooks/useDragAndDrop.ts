import { useState, useCallback, useRef } from 'react'
import type { Shape } from '../_classes'

interface DragState {
  isDragging: boolean
  draggedShapeId: string | null
  offsetX: number
  offsetY: number
}

export function useDragAndDrop(
  shapes: Shape[],
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedShapeId: null,
    offsetX: 0,
    offsetY: 0,
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i]
        if (shape.contains(x, y)) {
          setDragState({
            isDragging: true,
            draggedShapeId: shape.id,
            offsetX: x - shape.x,
            offsetY: y - shape.y,
          })

          setShapes(prev => {
            const newShapes = prev.filter(s => s.id !== shape.id)
            return [...newShapes, shape]
          })
          break
        }
      }
    },
    [shapes, setShapes]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !dragState.isDragging ||
        !dragState.draggedShapeId ||
        !canvasRef.current
      ) {
        return
      }

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setShapes(prev =>
        prev.map(shape => {
          if (shape.id === dragState.draggedShapeId) {
            // 새로운 위치 계산
            let newX = x - dragState.offsetX
            let newY = y - dragState.offsetY

            // 캔버스 경계 체크
            const canvasWidth = rect.width
            const canvasHeight = rect.height

            newX = Math.max(0, Math.min(newX, canvasWidth - shape.w))
            newY = Math.max(0, Math.min(newY, canvasHeight - shape.h))

            shape.setPosition(newX, newY)
          }
          return shape
        })
      )
    },
    [dragState, setShapes]
  )

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedShapeId: null,
      offsetX: 0,
      offsetY: 0,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (dragState.isDragging) {
      setDragState({
        isDragging: false,
        draggedShapeId: null,
        offsetX: 0,
        offsetY: 0,
      })
    }
  }, [dragState.isDragging])

  return {
    canvasRef,
    dragState,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
  }
}
