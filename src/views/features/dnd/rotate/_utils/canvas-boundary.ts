/**
 * 전역 좌표계의 벡터를 로컬 좌표계로 변환합니다 (역회전)
 */
export function globalToLocalCoordinates(
  deltaX: number,
  deltaY: number,
  rotationDegrees: number
): { x: number; y: number } {
  const rotationRad = (rotationDegrees * Math.PI) / 180
  const cos = Math.cos(-rotationRad)
  const sin = Math.sin(-rotationRad)

  return {
    x: deltaX * cos - deltaY * sin,
    y: deltaX * sin + deltaY * cos,
  }
}

/**
 * 로컬 좌표계의 벡터를 전역 좌표계로 변환합니다 (정회전)
 */
export function localToGlobalCoordinates(
  deltaX: number,
  deltaY: number,
  rotationDegrees: number
): { x: number; y: number } {
  const rotationRad = (rotationDegrees * Math.PI) / 180
  const cos = Math.cos(rotationRad)
  const sin = Math.sin(rotationRad)

  return {
    x: deltaX * cos - deltaY * sin,
    y: deltaX * sin + deltaY * cos,
  }
}

/**
 * 회전된 도형의 꼭짓점 좌표를 계산합니다
 */
export function getRotatedCorners(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  rotationDegrees: number
): { x: number; y: number }[] {
  const rotationRad = (rotationDegrees * Math.PI) / 180
  const cos = Math.cos(rotationRad)
  const sin = Math.sin(rotationRad)

  // 도형의 4개 꼭짓점 (중심 기준)
  const corners = [
    { x: -width / 2, y: -height / 2 }, // 좌상
    { x: width / 2, y: -height / 2 }, // 우상
    { x: width / 2, y: height / 2 }, // 우하
    { x: -width / 2, y: height / 2 }, // 좌하
  ]

  // 회전 변환 적용 후 실제 좌표 계산
  return corners.map(corner => ({
    x: centerX + corner.x * cos - corner.y * sin,
    y: centerY + corner.x * sin + corner.y * cos,
  }))
}

/**
 * 회전된 도형의 바운딩 박스를 계산합니다
 */
export function getRotatedBoundingBox(
  rotatedCorners: { x: number; y: number }[]
) {
  const xs = rotatedCorners.map(c => c.x)
  const ys = rotatedCorners.map(c => c.y)

  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  }
}

/**
 * 캔버스 경계를 벗어나지 않도록 중심점을 조정합니다
 */
export function adjustCenterToCanvasBounds(
  centerX: number,
  centerY: number,
  boundingBox: { minX: number; maxX: number; minY: number; maxY: number },
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number } {
  let adjustedCenterX = centerX
  let adjustedCenterY = centerY

  if (boundingBox.minX < 0) {
    adjustedCenterX = centerX - boundingBox.minX
  }
  if (boundingBox.maxX > canvasWidth) {
    adjustedCenterX = centerX - (boundingBox.maxX - canvasWidth)
  }
  if (boundingBox.minY < 0) {
    adjustedCenterY = centerY - boundingBox.minY
  }
  if (boundingBox.maxY > canvasHeight) {
    adjustedCenterY = centerY - (boundingBox.maxY - canvasHeight)
  }

  return { x: adjustedCenterX, y: adjustedCenterY }
}

/**
 * 회전된 도형이 캔버스 경계를 벗어나는지 체크하고 위치를 조정합니다
 */
export function constrainRotatedShapeToCanvas(
  shapeX: number,
  shapeY: number,
  width: number,
  height: number,
  rotationDegrees: number,
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number } {
  const centerX = shapeX + width / 2
  const centerY = shapeY + height / 2

  const rotatedCorners = getRotatedCorners(
    centerX,
    centerY,
    width,
    height,
    rotationDegrees
  )
  const boundingBox = getRotatedBoundingBox(rotatedCorners)
  const adjustedCenter = adjustCenterToCanvasBounds(
    centerX,
    centerY,
    boundingBox,
    canvasWidth,
    canvasHeight
  )

  return {
    x: adjustedCenter.x - width / 2,
    y: adjustedCenter.y - height / 2,
  }
}
