export interface Position {
  x: number
  y: number
}

export interface Size {
  w: number
  h: number
}

export interface Bounds extends Position, Size {}

export enum ShapeType {
  Rectangle = 'rectangle',
  Circle = 'circle',
  Triangle = 'triangle',
  Star = 'star',
  Hexagon = 'hexagon',
}

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

export enum ResizeHandle {
  TopLeft = 'tl',
  TopRight = 'tr',
  BottomLeft = 'bl',
  BottomRight = 'br',
}

export enum RotateHandle {
  Top = 'rotate-top',
}

export type InteractionMode = 'idle' | 'dragging' | 'resizing' | 'rotating'
