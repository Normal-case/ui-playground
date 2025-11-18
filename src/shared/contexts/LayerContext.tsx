import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// 레이어 타입 정의
export type LayerType = 'modal' | 'toast' | 'popover' | 'dropdown'

// 레이어 우선순위 (숫자가 높을수록 위에 표시)
export const LAYER_PRIORITY: Record<LayerType, number> = {
  dropdown: 1000,
  popover: 2000,
  modal: 3000,
  toast: 4000,
}

// 레이어 아이템
interface LayerItem {
  id: string
  type: LayerType
  timestamp: number
}

interface LayerContextValue {
  layers: LayerItem[]
  pushLayer: (id: string, type: LayerType) => void
  popLayer: (id: string) => void
  getLayerZIndex: (type: LayerType, id: string) => number
  isTopLayer: (id: string) => boolean
}

const LayerContext = createContext<LayerContextValue | null>(null)

interface LayerProviderProps {
  children: ReactNode
}

export function LayerProvider({ children }: LayerProviderProps) {
  const [layers, setLayers] = useState<LayerItem[]>([])

  // 레이어 추가
  const pushLayer = useCallback((id: string, type: LayerType) => {
    setLayers(prev => {
      // 이미 존재하는 레이어면 무시
      if (prev.some(layer => layer.id === id)) {
        return prev
      }
      return [...prev, { id, type, timestamp: Date.now() }]
    })
  }, [])

  // 레이어 제거
  const popLayer = useCallback((id: string) => {
    setLayers(prev => prev.filter(layer => layer.id !== id))
  }, [])

  // 레이어의 z-index 계산
  const getLayerZIndex = useCallback(
    (type: LayerType, id: string) => {
      const baseZIndex = LAYER_PRIORITY[type]
      const layerIndex = layers.findIndex(layer => layer.id === id)

      if (layerIndex === -1) return baseZIndex

      // 같은 타입의 레이어들 중에서 몇 번째인지 계산
      const sameTypeLayers = layers
        .slice(0, layerIndex + 1)
        .filter(layer => layer.type === type)

      return baseZIndex + sameTypeLayers.length
    },
    [layers]
  )

  // 최상위 레이어인지 확인
  const isTopLayer = useCallback(
    (id: string) => {
      if (layers.length === 0) return false
      return layers[layers.length - 1].id === id
    },
    [layers]
  )

  return (
    <LayerContext.Provider
      value={{ layers, pushLayer, popLayer, getLayerZIndex, isTopLayer }}
    >
      {children}
    </LayerContext.Provider>
  )
}

export function useLayer() {
  const context = useContext(LayerContext)
  if (!context) {
    throw new Error('useLayer must be used within LayerProvider')
  }
  return context
}

