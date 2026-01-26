import { useMemo, useState } from 'react'
import { Eye, EyeOff } from '@/components/ui/icons'
import { cn } from '@/shared/lib/cn'
import { cryptoShuffle } from './_utils'

export default function SafePadPage() {
  const [input, setInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeIndices, setActiveIndices] = useState<number[]>([])

  const keys = useMemo(() => {
    const keyNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const numbers = cryptoShuffle([...keyNumbers, ''])

    numbers.push('←')
    return [
      [numbers[0], numbers[1], numbers[2]],
      [numbers[3], numbers[4], numbers[5]],
      [numbers[6], numbers[7], numbers[8]],
      [numbers[9], numbers[10], numbers[11]],
    ]
  }, [])

  // 랜덤하게 다른 버튼 인덱스들도 선택하는 함수
  const getRandomIndices = (clickedIndex: number, totalCount: number) => {
    const indices = [clickedIndex]
    const flatKeys = keys.flat()
    const availableIndices = Array.from(
      { length: totalCount },
      (_, i) => i
    ).filter(
      i => i !== clickedIndex && flatKeys[i] !== '' && flatKeys[i] !== '←'
    )
    const shuffledIndices = cryptoShuffle(availableIndices)
    indices.push(shuffledIndices[0])

    return indices
  }

  const handleKeyPress = (key: string, clickedIndex: number) => {
    if (key === '←') {
      setInput(prev => prev.slice(0, -1))
      return
    }

    // 랜덤 버튼들에 이펙트 표시
    const randomIndices = getRandomIndices(clickedIndex, keys.flat().length)
    setActiveIndices(randomIndices)

    // 300ms 후 이펙트 제거
    setTimeout(() => {
      setActiveIndices([])
    }, 300)
    setInput(prev => prev + key)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="rounded-lg bg-muted p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
            안전 키패드
          </h2>

          {/* 입력 디스플레이 */}
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              value={input}
              readOnly
              placeholder="입력하세요"
              className="w-full rounded-md border-2 border-border bg-background p-4 pr-12 text-center text-2xl font-mono tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-opacity hover:opacity-70"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* 4x3 키패드 그리드 */}
          <div className="grid grid-cols-3 gap-3">
            {keys.flat().map((key, index) => (
              <button
                key={index}
                onClick={() => handleKeyPress(key, index)}
                disabled={key === ''}
                className={cn(
                  'py-4 text-2xl font-medium transition-all duration-150',
                  key === ''
                    ? 'pointer-events-none opacity-0'
                    : 'text-foreground hover:opacity-70',
                  activeIndices.includes(index) && 'scale-95 bg-accent'
                )}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
