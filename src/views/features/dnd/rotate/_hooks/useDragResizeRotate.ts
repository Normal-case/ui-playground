import { useState, useCallback, useRef } from 'react'
import type { Shape } from '@dnd/_classes'
import { ResizeHandle, RotateHandle, type InteractionMode } from '@dnd/_types'

interface InteractionState {
  mode: InteractionMode
  targetShapeId: string | null
  offsetX: number
  offsetY: number
  resizeHandle: ResizeHandle | null
  rotateHandle: RotateHandle | null
  initialBounds: { x: number; y: number; w: number; h: number } | null
  initialRotation: number | null
  initialAngle: number | null
}

export function useDragResizeRotate(
  shapes: Shape[],
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const [interactionState, setInteractionState] = useState<InteractionState>({
    mode: 'idle',
    targetShapeId: null,
    offsetX: 0,
    offsetY: 0,
    resizeHandle: null,
    rotateHandle: null,
    initialBounds: null,
    initialRotation: null,
    initialAngle: null,
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  /**
   * 리사이즈 핸들 마우스 다운 핸들러
   */
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, shapeId: string, handle: ResizeHandle) => {
      e.stopPropagation()

      const shape = shapes.find(s => s.id === shapeId)
      if (!shape || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      setInteractionState({
        mode: 'resizing',
        targetShapeId: shapeId,
        offsetX: mouseX,
        offsetY: mouseY,
        resizeHandle: handle,
        rotateHandle: null,
        initialBounds: {
          x: shape.x,
          y: shape.y,
          w: shape.w,
          h: shape.h,
        },
        initialRotation: null,
        initialAngle: null,
      })
    },
    [shapes]
  )

  /**
   * 회전 핸들 마우스 다운 핸들러
   */
  const handleRotateMouseDown = useCallback(
    (e: React.MouseEvent, shapeId: string, handle: RotateHandle) => {
      e.stopPropagation()

      const shape = shapes.find(s => s.id === shapeId)
      if (!shape || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const center = shape.getCenter()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // 중심점에서 마우스까지의 초기 각도 계산
      const initialAngle = Math.atan2(mouseY - center.y, mouseX - center.x)

      setInteractionState({
        mode: 'rotating',
        targetShapeId: shapeId,
        offsetX: mouseX,
        offsetY: mouseY,
        resizeHandle: null,
        rotateHandle: handle,
        initialBounds: null,
        initialRotation: shape.rotation,
        initialAngle,
      })
    },
    [shapes]
  )

  /**
   * 도형 드래그 시작 핸들러
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // 역순으로 순회하여 가장 위에 있는 도형을 찾음
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i]
        if (shape.contains(x, y)) {
          setSelectedShapeId(shape.id)
          setInteractionState({
            mode: 'dragging',
            targetShapeId: shape.id,
            offsetX: x - shape.x,
            offsetY: y - shape.y,
            resizeHandle: null,
            rotateHandle: null,
            initialBounds: null,
            initialRotation: null,
            initialAngle: null,
          })

          // 선택된 도형을 맨 위로 이동
          setShapes(prev => {
            const newShapes = prev.filter(s => s.id !== shape.id)
            return [...newShapes, shape]
          })
          return
        }
      }

      // 빈 공간 클릭 시 선택 해제
      setSelectedShapeId(null)
    },
    [shapes, setShapes]
  )

  /**
   * 마우스 이동 핸들러 (드래그, 리사이즈, 회전)
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (interactionState.mode === 'idle' || !canvasRef.current) {
        return
      }

      const rect = canvasRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      if (interactionState.mode === 'dragging') {
        // 드래그 처리
        setShapes(prev =>
          prev.map(shape => {
            if (shape.id === interactionState.targetShapeId) {
              let newX = mouseX - interactionState.offsetX
              let newY = mouseY - interactionState.offsetY

              // 캔버스 경계 체크
              newX = Math.max(0, Math.min(newX, rect.width - shape.w))
              newY = Math.max(0, Math.min(newY, rect.height - shape.h))

              shape.setPosition(newX, newY)
            }
            return shape
          })
        )
      } else if (
        interactionState.mode === 'resizing' &&
        interactionState.resizeHandle &&
        interactionState.initialBounds
      ) {
        // 리사이즈 처리
        const deltaX = mouseX - interactionState.offsetX
        const deltaY = mouseY - interactionState.offsetY
        const { resizeHandle, initialBounds } = interactionState

        setShapes(prev =>
          prev.map(shape => {
            if (shape.id === interactionState.targetShapeId) {
              let newX = initialBounds.x
              let newY = initialBounds.y
              let newW = initialBounds.w
              let newH = initialBounds.h

              // 최소 크기
              const MIN_SIZE = 20

              // 각 핸들에 따른 리사이즈 로직
              switch (resizeHandle) {
                case ResizeHandle.TopLeft:
                  newX = initialBounds.x + deltaX
                  newY = initialBounds.y + deltaY
                  newW = initialBounds.w - deltaX
                  newH = initialBounds.h - deltaY
                  break
                case ResizeHandle.TopRight:
                  newY = initialBounds.y + deltaY
                  newW = initialBounds.w + deltaX
                  newH = initialBounds.h - deltaY
                  break
                case ResizeHandle.BottomLeft:
                  newX = initialBounds.x + deltaX
                  newW = initialBounds.w - deltaX
                  newH = initialBounds.h + deltaY
                  break
                case ResizeHandle.BottomRight:
                  newW = initialBounds.w + deltaX
                  newH = initialBounds.h + deltaY
                  break
              }

              // 최소 크기 적용
              if (newW < MIN_SIZE) {
                newW = MIN_SIZE
                if (
                  resizeHandle === ResizeHandle.TopLeft ||
                  resizeHandle === ResizeHandle.BottomLeft
                ) {
                  newX = initialBounds.x + initialBounds.w - MIN_SIZE
                }
              }
              if (newH < MIN_SIZE) {
                newH = MIN_SIZE
                if (
                  resizeHandle === ResizeHandle.TopLeft ||
                  resizeHandle === ResizeHandle.TopRight
                ) {
                  newY = initialBounds.y + initialBounds.h - MIN_SIZE
                }
              }

              // 캔버스 경계 체크
              newX = Math.max(0, Math.min(newX, rect.width - MIN_SIZE))
              newY = Math.max(0, Math.min(newY, rect.height - MIN_SIZE))
              newW = Math.min(newW, rect.width - newX)
              newH = Math.min(newH, rect.height - newY)

              shape.setPosition(newX, newY)
              shape.setSize(newW, newH)
            }
            return shape
          })
        )
      } else if (
        interactionState.mode === 'rotating' &&
        interactionState.initialRotation !== null &&
        interactionState.initialAngle !== null
      ) {
        // 회전 처리
        const initialRotation = interactionState.initialRotation
        const initialAngle = interactionState.initialAngle

        setShapes(prev =>
          prev.map(shape => {
            if (shape.id === interactionState.targetShapeId) {
              const center = shape.getCenter()

              // 현재 마우스의 각도 계산
              const currentAngle = Math.atan2(
                mouseY - center.y,
                mouseX - center.x
              )

              // 각도 변화량 계산 (라디안 → 도)
              const angleDelta = ((currentAngle - initialAngle) * 180) / Math.PI

              // 새로운 회전 각도 계산
              let newRotation = initialRotation + angleDelta

              // 0-360 범위로 정규화
              newRotation = ((newRotation % 360) + 360) % 360

              shape.setRotation(newRotation)
            }
            return shape
          })
        )
      }
    },
    [interactionState, setShapes]
  )

  /**
   * 마우스 업 핸들러
   */
  const handleMouseUp = useCallback(() => {
    setInteractionState({
      mode: 'idle',
      targetShapeId: null,
      offsetX: 0,
      offsetY: 0,
      resizeHandle: null,
      rotateHandle: null,
      initialBounds: null,
      initialRotation: null,
      initialAngle: null,
    })
  }, [])

  /**
   * 마우스 리브 핸들러
   */
  const handleMouseLeave = useCallback(() => {
    if (interactionState.mode !== 'idle') {
      setInteractionState({
        mode: 'idle',
        targetShapeId: null,
        offsetX: 0,
        offsetY: 0,
        resizeHandle: null,
        rotateHandle: null,
        initialBounds: null,
        initialRotation: null,
        initialAngle: null,
      })
    }
  }, [interactionState.mode])

  return {
    canvasRef,
    selectedShapeId,
    interactionState,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
    handleResizeMouseDown,
    handleRotateMouseDown,
  }
}
