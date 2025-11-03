import { ShapeType } from '../_types'
import { Shape } from './Shape'

/**
 * Star 클래스
 * 5각 별 도형을 표현합니다.
 * CSS clip-path를 사용하여 렌더링됩니다.
 */
export class Star extends Shape {
  constructor(
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    super(id, ShapeType.Star, x, y, w, h, color)
  }

  /**
   * 별의 10개 꼭지점을 반환합니다 (외부 5개 + 내부 5개)
   * 0도부터 시작하여 시계방향으로 회전
   */
  getVertices(): { x: number; y: number }[] {
    const vertices: { x: number; y: number }[] = []
    const centerX = this.x + this.w / 2
    const centerY = this.y + this.h / 2
    const outerRadius = this.w / 2
    const innerRadius = outerRadius * 0.4 // 내부 꼭지점은 40% 크기

    // 10개의 점을 생성 (외부, 내부를 번갈아가며)
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI / 5) * i - Math.PI / 2 // -90도부터 시작 (위쪽)
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      vertices.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      })
    }

    return vertices
  }

  /**
   * 주어진 좌표가 별 내부에 있는지 확인합니다.
   * 간단한 경계 상자(bounding box) 검사를 사용합니다.
   */
  contains(x: number, y: number): boolean {
    // 별의 경우 정확한 polygon 충돌 검사가 복잡하므로
    // 원형 근사를 사용합니다 (중심으로부터의 거리)
    const centerX = this.x + this.w / 2
    const centerY = this.y + this.h / 2
    const radius = this.w / 2
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    )
    return distance <= radius
  }
}
