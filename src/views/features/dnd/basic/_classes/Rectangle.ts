import { Shape } from './Shape'

/**
 * Rectangle 클래스
 * 사각형 도형을 표현합니다.
 */
export class Rectangle extends Shape {
  constructor(
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    super(id, 'rectangle', x, y, w, h, color)
  }

  /**
   * 주어진 좌표가 사각형 내부에 있는지 확인합니다.
   */
  contains(x: number, y: number): boolean {
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    )
  }
}
