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

  /**
   * 마우스 다운 이벤트 핸들러
   * 클릭한 위치에 있는 도형을 찾아 드래그를 시작합니다.
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // 역순으로 검색 (위에 있는 도형부터)
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i]
        if (shape.contains(x, y)) {
          setDragState({
            isDragging: true,
            draggedShapeId: shape.id,
            offsetX: x - shape.x,
            offsetY: y - shape.y,
          })

          // 드래그 중인 도형을 배열의 맨 뒤로 이동 (z-index 효과)
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

  /**
   * 마우스 이동 이벤트 핸들러
   * 드래그 중인 도형의 위치를 업데이트합니다.
   */
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

  /**
   * 마우스 업 이벤트 핸들러
   * 드래그를 종료합니다.
   */
  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedShapeId: null,
      offsetX: 0,
      offsetY: 0,
    })
  }, [])

  /**
   * 마우스가 캔버스를 벗어났을 때의 핸들러
   */
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
