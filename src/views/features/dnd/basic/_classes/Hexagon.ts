import { Shape } from './Shape'
import { ShapeType } from '../_types'

/**
 * Hexagon 클래스
 * 정육각형 도형을 표현합니다.
 * CSS clip-path를 사용하여 렌더링됩니다.
 */
export class Hexagon extends Shape {
  constructor(
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    super(id, ShapeType.Hexagon, x, y, w, h, color)
  }

  /**
   * 육각형의 6개 꼭지점을 반환합니다
   * 세로로 긴 육각형 (위아래가 뾰족한 형태)
   */
  getVertices(): { x: number; y: number }[] {
    const vertices: { x: number; y: number }[] = []
    const centerX = this.x + this.w / 2
    const centerY = this.y + this.h / 2
    const radiusX = this.w / 2
    const radiusY = this.h / 2

    // 6개의 꼭지점 생성 (0도부터 시작하여 위아래가 뾰족하게)
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2 // -90도(위)부터 시작
      vertices.push({
        x: centerX + radiusX * Math.cos(angle),
        y: centerY + radiusY * Math.sin(angle),
      })
    }

    return vertices
  }

  /**
   * 주어진 좌표가 육각형 내부에 있는지 확인합니다.
   * 타원형 근사를 사용합니다.
   */
  contains(x: number, y: number): boolean {
    const centerX = this.x + this.w / 2
    const centerY = this.y + this.h / 2
    const radiusX = this.w / 2
    const radiusY = this.h / 2
    const normalizedDistance = Math.sqrt(
      Math.pow((x - centerX) / radiusX, 2) +
        Math.pow((y - centerY) / radiusY, 2)
    )
    return normalizedDistance <= 1
  }
}
