import { Shape } from './Shape'
import { ShapeType } from '../_types'

/**
 * Circle 클래스
 * 원형 도형을 표현합니다.
 */
export class Circle extends Shape {
  constructor(
    id: string,
    x: number,
    y: number,
    diameter: number,
    color: string
  ) {
    // 원의 경우 w와 h가 동일합니다
    super(id, ShapeType.Circle, x, y, diameter, diameter, color)
  }

  /**
   * 반지름을 반환합니다.
   */
  get radius(): number {
    return this.w / 2
  }

  /**
   * 주어진 좌표가 원 내부에 있는지 확인합니다.
   */
  contains(x: number, y: number): boolean {
    const center = this.getCenter()
    const distance = Math.sqrt(
      Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)
    )
    return distance <= this.radius
  }

  /**
   * 원의 지름을 설정합니다.
   */
  setDiameter(diameter: number): void {
    this.w = diameter
    this.h = diameter
  }
}
