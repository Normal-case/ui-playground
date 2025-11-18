import { useModal } from '@/shared/hooks/useModal'
import { cn } from '@/shared/lib/cn'
import { Children, isValidElement } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className?: string
  closeOnBackdropClick?: boolean
}

interface ModalHeaderProps {
  children: React.ReactNode
  onClose?: () => void
  className?: string
  showCloseButton?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
}

export function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = 'lg',
  className,
  closeOnBackdropClick = true,
}: ModalProps) {
  const { dialogRef } = useModal({ isOpen, onClose })

  // 배경 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdropClick) return

    // dialog 요소의 실제 컨텐츠 영역 밖을 클릭했는지 확인
    const rect = e.currentTarget.getBoundingClientRect()
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom

    if (!isInDialog) {
      onClose()
    }
  }

  // Modal.Header가 있는지 확인하고 children 분리
  const childArray = Children.toArray(children)
  const headerIndex = childArray.findIndex(
    child =>
      isValidElement(child) &&
      typeof child.type === 'function' &&
      child.type === Modal.Header
  )

  const hasHeader = headerIndex !== -1
  const header = hasHeader ? childArray[headerIndex] : null
  const content = hasHeader
    ? childArray.filter((_, i) => i !== headerIndex)
    : children

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      style={{
        padding: 0,
        margin: 'auto',
        border: 'none',
        background: 'transparent',
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
    >
      <div
        className={cn(
          'relative bg-white dark:bg-slate-900 rounded-lg shadow-xl max-h-[90vh] mx-4',
          hasHeader ? 'flex flex-col overflow-hidden' : 'overflow-y-auto',
          maxWidthClasses[maxWidth],
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        {hasHeader ? (
          <>
            {header}
            <div className="flex-1 overflow-y-auto">{content}</div>
          </>
        ) : (
          children
        )}
      </div>
    </dialog>
  )
}

// Compound Component - Header만 제공
Modal.Header = function ModalHeader({
  children,
  onClose,
  className,
  showCloseButton = true,
}: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-900',
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-4"
          aria-label="닫기"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
