import { ShapeType } from '@dnd/_types'
import { Shape } from '@dnd/_classes/Shape'

/**
 * Triangle 클래스
 * 삼각형 도형을 표현합니다. (정삼각형 기준)
 */
export class Triangle extends Shape {
  constructor(
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    super(id, ShapeType.Triangle, x, y, w, h, color)
  }

  /**
   * 삼각형의 세 꼭지점을 반환합니다.
   * 위쪽 꼭지점이 중앙에 있는 형태
   */
  getVertices(): { x: number; y: number }[] {
    return [
      { x: this.x + this.w / 2, y: this.y }, // 상단 중앙
      { x: this.x, y: this.y + this.h }, // 좌측 하단
      { x: this.x + this.w, y: this.y + this.h }, // 우측 하단
    ]
  }

  /**
   * 주어진 좌표가 삼각형 내부에 있는지 확인합니다.
   * 무게중심 좌표계(Barycentric coordinates)를 사용합니다.
   */
  contains(x: number, y: number): boolean {
    const vertices = this.getVertices()
    const [v1, v2, v3] = vertices

    const area = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ): number => {
      return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2)
    }

    const totalArea = area(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y)
    const area1 = area(x, y, v2.x, v2.y, v3.x, v3.y)
    const area2 = area(v1.x, v1.y, x, y, v3.x, v3.y)
    const area3 = area(v1.x, v1.y, v2.x, v2.y, x, y)

    // 부분 면적의 합이 전체 면적과 거의 같으면 내부에 있음
    return Math.abs(totalArea - (area1 + area2 + area3)) < 0.01
  }
}
