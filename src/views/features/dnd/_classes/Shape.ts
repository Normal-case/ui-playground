import type { ShapeType, Bounds } from '@dnd/_types'

/**
 * Shape 추상 베이스 클래스
 * 모든 도형의 공통 속성과 메서드를 정의합니다.
 */
export abstract class Shape {
  id: string
  type: ShapeType
  x: number
  y: number
  w: number
  h: number
  color: string
  isDragging: boolean
  rotation: number // 회전 각도 (0-360도)
  createdAt: number // 생성 시간 (타임스탬프)

  constructor(
    id: string,
    type: ShapeType,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    rotation: number = 0
  ) {
    this.id = id
    this.type = type
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.isDragging = false
    this.rotation = rotation
    this.createdAt = Date.now()
  }

  /**
   * 도형을 이동시킵니다.
   */
  move(deltaX: number, deltaY: number): void {
    this.x += deltaX
    this.y += deltaY
  }

  /**
   * 도형의 위치를 설정합니다.
   */
  setPosition(x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /**
   * 도형의 크기를 설정합니다.
   */
  setSize(w: number, h: number): void {
    this.w = w
    this.h = h
  }

  /**
   * 도형의 회전 각도를 설정합니다.
   */
  setRotation(rotation: number): void {
    this.rotation = rotation % 360
  }

  /**
   * 주어진 좌표가 도형 내부에 있는지 확인합니다.
   */
  abstract contains(x: number, y: number): boolean

  /**
   * 도형의 경계 상자를 반환합니다.
   */
  getBounds(): Bounds {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
    }
  }

  /**
   * 도형의 중심점을 반환합니다.
   */
  getCenter(): { x: number; y: number } {
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2,
    }
  }

  /**
   * 도형을 JSON으로 직렬화합니다.
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      color: this.color,
      isDragging: this.isDragging,
      rotation: this.rotation,
    }
  }
}
