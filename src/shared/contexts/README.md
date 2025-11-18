# Layer Management System

라이브러리 없이 구현한 확장 가능한 레이어 관리 시스템입니다.

## 아키텍처

```
┌─────────────────────────────────────┐
│   Layer Stack (관리 시스템)          │
├─────────────────────────────────────┤
│   Toast     (z-index: 4000+)        │
│   Modal     (z-index: 3000+)        │
│   Popover   (z-index: 2000+)        │
│   Dropdown  (z-index: 1000+)        │
└─────────────────────────────────────┘
```

## 구성 요소

### 1. LayerContext (`LayerContext.tsx`)

전역 레이어 상태 관리

**기능:**

- 레이어 스택 관리
- z-index 자동 계산
- 레이어 우선순위 관리

### 2. useModal Hook (`useModal.ts`)

Dialog 기반 모달을 위한 hook

**기능:**

- `<dialog>` 태그의 showModal/close 자동 관리
- ESC 키 처리
- 레이어 스택에 자동 등록/해제

## 사용법

### Modal (현재 구현됨)

```tsx
import { Modal } from '@/components/ui/modal'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>Modal content</p>
      </Modal>
    </>
  )
}
```

### 중첩 Modal

자동으로 처리됩니다!

```tsx
<Modal isOpen={modal1Open} onClose={() => setModal1Open(false)}>
  Modal 1<button onClick={() => setModal2Open(true)}>Open Modal 2</button>
  <Modal isOpen={modal2Open} onClose={() => setModal2Open(false)}>
    Modal 2 (자동으로 위에 표시됨)
  </Modal>
</Modal>
```

## 확장: 다른 레이어 타입 추가하기

### Toast 추가 예시

#### 1. useToast Hook 만들기

```tsx
// src/shared/hooks/useToast.ts
import { useId, useEffect } from 'react'
import { useLayer } from '@/shared/contexts/LayerContext'

export function useToast(isVisible: boolean) {
  const id = useId()
  const { pushLayer, popLayer, getLayerZIndex } = useLayer()

  useEffect(() => {
    if (isVisible) {
      pushLayer(id, 'toast')
    } else {
      popLayer(id)
    }
    return () => popLayer(id)
  }, [isVisible, id, pushLayer, popLayer])

  const zIndex = getLayerZIndex('toast', id)

  return { zIndex, layerId: id }
}
```

#### 2. Toast 컴포넌트 만들기

```tsx
// src/components/ui/toast/Toast.tsx
import { useToast } from '@/shared/hooks/useToast'

interface ToastProps {
  isVisible: boolean
  message: string
  onClose: () => void
}

export function Toast({ isVisible, message, onClose }: ToastProps) {
  const { zIndex } = useToast(isVisible)

  if (!isVisible) return null

  return (
    <div
      className="fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg bg-white dark:bg-slate-800"
      style={{ zIndex }}
    >
      <p>{message}</p>
      <button onClick={onClose}>✕</button>
    </div>
  )
}
```

### Popover 추가 예시

```tsx
// src/shared/hooks/usePopover.ts
export function usePopover(isOpen: boolean) {
  const id = useId()
  const { pushLayer, popLayer, getLayerZIndex } = useLayer()

  useEffect(() => {
    if (isOpen) {
      pushLayer(id, 'popover')
    } else {
      popLayer(id)
    }
    return () => popLayer(id)
  }, [isOpen, id, pushLayer, popLayer])

  return { zIndex: getLayerZIndex('popover', id) }
}
```

## 레이어 우선순위 변경

`LayerContext.tsx`에서 `LAYER_PRIORITY` 수정:

```typescript
export const LAYER_PRIORITY: Record<LayerType, number> = {
  dropdown: 1000,
  popover: 2000,
  modal: 3000,
  toast: 4000, // Toast가 항상 최상위
}
```

## 특징

✅ **확장 가능**: 새로운 레이어 타입 쉽게 추가
✅ **타입 안전**: TypeScript로 완전한 타입 지원
✅ **자동 관리**: z-index 자동 계산
✅ **중첩 지원**: 같은 타입 레이어 중첩 가능
✅ **Dialog 기반**: 네이티브 웹 표준 활용

## 디버깅

현재 레이어 스택 확인:

```tsx
import { useLayer } from '@/shared/contexts/LayerContext'

function DebugLayers() {
  const { layers } = useLayer()
  console.log('Current layers:', layers)
  return null
}
```
