import { useEffect, useRef, useId } from 'react'
import { useLayer } from '@/shared/contexts/LayerContext'

interface UseModalOptions {
  isOpen: boolean
  onClose: () => void
}

export function useModal({ isOpen, onClose }: UseModalOptions) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const id = useId()
  const { pushLayer, popLayer, isTopLayer } = useLayer()

  // 모달 열기/닫기
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
        pushLayer(id, 'modal')
      }
    } else {
      if (dialog.open) {
        dialog.close()
        popLayer(id)
      }
    }
  }, [isOpen, id, pushLayer, popLayer])

  // ESC 키로 닫기 (dialog가 기본 제공하지만 커스텀 핸들러)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      // 최상위 레이어일 때만 닫기
      if (isTopLayer(id)) {
        onClose()
      }
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [id, onClose, isTopLayer])

  // 클린업: 컴포넌트 언마운트 시 레이어 제거
  useEffect(() => {
    return () => {
      popLayer(id)
    }
  }, [id, popLayer])

  return { dialogRef, layerId: id }
}
