export interface Position {
  x: number
  y: number
}

export interface Size {
  w: number
  h: number
}

export interface Bounds extends Position, Size {}

export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'hexagon'

export interface ShapeConfig {
  id: string
  type: ShapeType
  x: number
  y: number
  w: number
  h: number
  color: string
  isDragging?: boolean
}
