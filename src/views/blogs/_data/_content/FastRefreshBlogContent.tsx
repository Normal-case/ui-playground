import { useState, useEffect } from 'react'
import { Box, Heading, Text, Card, Flex, Code, Callout, Badge } from '@radix-ui/themes'

/**
 * "React Fast Refresh: 하나의 파일에 하나의 컴포넌트만" 블로그 글 컨텐츠
 */
export function FastRefreshBlogContent() {
  // 데모용 state
  const [demoCount, setDemoCount] = useState(0)
  const [demoName, setDemoName] = useState('')
  const [refreshLog, setRefreshLog] = useState<string[]>([])

  return (
    <Box className="space-y-8">
      {/* 서론 */}
      <Box>
        <Heading size="6" mb="4">
          React Fast Refresh: 하나의 파일에 하나의 컴포넌트만
        </Heading>
        <Text size="3" color="gray" className="leading-relaxed">
          React로 개발하다 보면 "왜 내 state가 초기화되지?" 하고 당황한 경험이 있으실
          겁니다. 또는 "왜 하나의 파일에 하나의 컴포넌트만 써야 해?"라는 의문을 가져보셨을
          것입니다. 이 글에서는 React Fast Refresh의 동작 원리를 깊이 파헤치고, 언제 state가
          보존되고 언제 초기화되는지 명확히 알아봅니다.
        </Text>
      </Box>

      {/* 인터랙티브 데모 */}
      <Card>
        <Heading size="4" mb="3">
          💡 먼저 체험해보기
        </Heading>
        <Text size="2" color="gray" mb="4">
          아래 입력 필드에 값을 입력한 후, 브라우저 콘솔을 열고 이 파일을 수정해보세요!
        </Text>

        <Flex direction="column" gap="4">
          <Box>
            <Text size="2" weight="bold" mb="2">
              카운터: {demoCount}
            </Text>
            <Flex gap="2">
              <button
                onClick={() => setDemoCount(c => c + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +1
              </button>
              <button
                onClick={() => setDemoCount(c => c - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -1
              </button>
            </Flex>
          </Box>

          <Box>
            <Text size="2" weight="bold" mb="2">
              이름:
            </Text>
            <input
              type="text"
              value={demoName}
              onChange={e => setDemoName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-2 border rounded"
            />
            <Text size="1" color="gray" mt="1">
              현재 값: "{demoName}"
            </Text>
          </Box>

          <Box p="3" className="bg-gray-100 dark:bg-gray-800 rounded">
            <Text size="2" weight="bold">
              🎯 실험 방법:
            </Text>
            <Text size="2" className="mt-2">
              1. 위에서 값을 입력하세요 (예: count=5, name="홍길동")
              <br />
              2. 이 파일(FastRefreshBlogContent.tsx)을 열어 JSX를 수정하세요
              <br />
              3. 저장하면 → state가 유지됩니다! ✅
              <br />
              4. 이번엔 useEffect를 추가해보세요 → 여전히 유지! ✅
            </Text>
          </Box>
        </Flex>
      </Card>

      {/* Fast Refresh란? */}
      <Box>
        <Heading size="5" mb="3">
          1. Fast Refresh란 무엇인가?
        </Heading>

        <Text mb="3">
          Fast Refresh는 React에서 제공하는 Hot Reload 메커니즘입니다. 코드를 수정하고
          저장하면 <strong>전체 페이지를 새로고침하지 않고</strong> 변경된 컴포넌트만
          업데이트합니다.
        </Text>

        <Card variant="surface" mb="4">
          <Heading size="3" mb="2">
            ⚡ Fast Refresh의 장점
          </Heading>
          <Flex direction="column" gap="2">
            <Text>• 개발 중 state를 유지하면서 코드 수정 가능</Text>
            <Text>• 전체 새로고침보다 훨씬 빠름 (10~100ms)</Text>
            <Text>• 복잡한 사용자 인터랙션 상태를 유지하면서 디버깅 가능</Text>
            <Text>• 폼 입력값, 모달 상태 등을 잃어버리지 않음</Text>
          </Flex>
        </Card>

        <Heading size="4" mb="3">
          📦 Fast Refresh의 3가지 레이어
        </Heading>

        <Flex direction="column" gap="3" mb="4">
          <Card>
            <Badge color="purple" mb="2">
              Layer 1
            </Badge>
            <Heading size="3" mb="2">
              React Refresh Runtime
            </Heading>
            <Text size="2" color="gray">
              React 팀이 제공하는 핵심 엔진. 번들러와 독립적으로 동작하며, 컴포넌트
              등록, Signature 추적, Fiber 트리 업데이트를 담당합니다.
            </Text>
          </Card>

          <Card>
            <Badge color="blue" mb="2">
              Layer 2
            </Badge>
            <Heading size="3" mb="2">
              번들러 통합 (Vite/Webpack/Turbopack)
            </Heading>
            <Text size="2" color="gray">
              파일 변경 감지, HMR 프로토콜, 브라우저와의 통신을 담당합니다. 각 번들러마다
              구현이 다릅니다.
            </Text>
          </Card>

          <Card>
            <Badge color="green" mb="2">
              Layer 3
            </Badge>
            <Heading size="3" mb="2">
              컴파일러 Transform (Babel/SWC/esbuild)
            </Heading>
            <Text size="2" color="gray">
              코드에 Signature 추적 코드를 자동 삽입하고, 컴포넌트를 등록하는 코드를
              생성합니다.
            </Text>
          </Card>
        </Flex>
      </Box>

      {/* 동작 흐름 */}
      <Box>
        <Heading size="5" mb="3">
          2. Fast Refresh 동작 흐름 (단계별)
        </Heading>

        <Text mb="3">파일을 수정하고 저장했을 때 어떤 일이 일어나는지 살펴봅시다.</Text>

        <Card mb="4">
          <Box p="4" className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <Code size="2" className="whitespace-pre font-mono text-xs leading-relaxed">
              {`00:00 - 개발자가 Counter.tsx 수정 (JSX 변경)
00:01 - Cmd+S (저장)
00:02 - VS Code가 파일 시스템에 저장
      ↓
00:03 - Vite가 파일 변경 감지 (chokidar)
00:04 - esbuild로 Counter.tsx 재변환 (10ms)
      ↓
00:05 - 브라우저로 WebSocket 메시지 전송
        { type: "update", path: "/src/Counter.tsx" }
00:06 - 브라우저가 새 모듈 fetch
        import('./Counter.tsx?t=1234567890')
      ↓
00:07 - import.meta.hot.accept() 콜백 실행
00:08 - $RefreshReg$(NewCounter, "Counter")
00:09 - performReactRefresh() 호출 ← Fast Refresh 시작!
      ↓
00:10 - React Fiber 트리 순회
00:11 - Counter 컴포넌트 Fiber 노드 찾기
00:12 - 기존 state hook 보존 (count = 5)
00:13 - 컴포넌트 함수만 새 버전으로 교체
      ↓
00:14 - NewCounter() 실행 with count = 5
00:15 - JSX 생성: <div>Counter: 5</div>
00:16 - DOM 업데이트 완료
      ↓
✅ Fast Refresh 완료!
✅ state 보존됨!`}
            </Code>
          </Box>
        </Card>
      </Box>

      {/* Fiber 트리 */}
      <Box>
        <Heading size="5" mb="3">
          3. React Fiber 트리: Fast Refresh의 비밀 무기
        </Heading>

        <Text mb="3">
          Fast Refresh가 어떻게 특정 컴포넌트만 찾아서 업데이트할 수 있을까요? 그 비밀은
          바로 <strong>Fiber 트리</strong>에 있습니다.
        </Text>

        <Card variant="surface" mb="4">
          <Heading size="4" mb="2">
            🌳 일반 트리 vs Fiber 트리
          </Heading>

          <Flex direction={{ initial: 'column', md: 'row' }} gap="4">
            <Box className="flex-1">
              <Heading size="3" mb="2">
                일반 트리
              </Heading>
              <Flex direction="column" gap="2">
                <Text size="2">• 부모 → 자식 (단방향)</Text>
                <Text size="2">• 재귀로 순회</Text>
                <Text size="2">• 중단 불가능</Text>
                <Text size="2">• State 저장 안 함</Text>
              </Flex>
            </Box>

            <Box className="flex-1">
              <Heading size="3" mb="2" color="blue">
                Fiber 트리
              </Heading>
              <Flex direction="column" gap="2">
                <Text size="2">• 부모 ↔ 자식 ↔ 형제 (3방향)</Text>
                <Text size="2">• 포인터로 순회</Text>
                <Text size="2">• 언제든 중단 가능 ✅</Text>
                <Text size="2">• memoizedState에 저장 ✅</Text>
              </Flex>
            </Box>
          </Flex>
        </Card>

        <Heading size="4" mb="3">
          📊 Fiber 노드 구조
        </Heading>

        <Box p="4" mb="4" className="bg-surface-code-dark rounded-lg">
          <Code size="2" variant="ghost" className="text-code whitespace-pre font-mono">
            {`class FiberNode {
  // 컴포넌트 정보
  type: Function              // Counter 함수
  elementType: Function       // 원본 타입
  
  // 트리 구조 (3방향 포인터!)
  return: Fiber | null        // 부모 ↑
  child: Fiber | null         // 첫 자식 ↓
  sibling: Fiber | null       // 다음 형제 →
  
  // State 저장소 (핵심!)
  memoizedState: any          // Hook 체인이 여기 저장됨!
  memoizedProps: any          // Props
  
  // 업데이트 정보
  alternate: Fiber | null     // 이전 버전 (더블 버퍼링)
  effectTag: number           // Update/Delete/Insert 등
}`}
          </Code>
        </Box>

        <Heading size="4" mb="3">
          🔍 Fiber 트리 예시
        </Heading>

        <Box p="4" mb="4" className="bg-gray-50 dark:bg-gray-900 rounded-lg">
          <Code size="2" className="whitespace-pre font-mono leading-relaxed">
            {`function App() {
  const form = useForm({ title: "안녕", count: 42 })
  return (
    <div>
      <TitleForm control={form.control} />
      <CounterForm control={form.control} />
    </div>
  )
}

Fiber 트리 구조:

        App Fiber
        type: App
        memoizedState: {
          baseState: { title: "안녕", count: 42 }  ← form state 저장!
        }
            ↓ child
        div Fiber
            ↓ child
    TitleForm Fiber ──→ sibling ──→ CounterForm Fiber
    type: TitleForm                 type: CounterForm
    memoizedState: null             memoizedState: null
    (props로 control 받음)          (props로 control 받음)`}
          </Code>
        </Box>

        <Callout.Root color="blue" mb="4">
          <Callout.Text>
            💡 <strong>핵심:</strong> State는 <Code variant="ghost">memoizedState</Code>에
            저장됩니다. Fast Refresh는 컴포넌트 함수(<Code variant="ghost">type</Code>
            )만 교체하고 <Code variant="ghost">memoizedState</Code>는 건드리지 않아서
            state가 보존됩니다!
          </Callout.Text>
        </Callout.Root>
      </Box>

      {/* State 보존 vs 초기화 */}
      <Box>
        <Heading size="5" mb="3">
          4. State 보존 vs 초기화: 완벽 가이드
        </Heading>

        <Text mb="4">
          언제 state가 유지되고 언제 초기화될까요? 다양한 시나리오를 살펴봅시다.
        </Text>

        {/* 시나리오 1: JSX만 수정 */}
        <Card mb="4">
          <Badge color="green" mb="2">
            시나리오 1
          </Badge>
          <Heading size="4" mb="3">
            ✅ JSX만 수정 → State 완벽 보존
          </Heading>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// Before (count = 5)
function Counter() {
  const [count, setCount] = useState(0)
  return <button>Count: {count}</button>
}

// After - 텍스트만 변경
function Counter() {
  const [count, setCount] = useState(0)
  return <button>카운터: {count}</button>  // ← 변경
}

✅ count = 5 유지!`}
            </Code>
          </Box>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              📋 타임라인:
            </Text>
            <Code size="1" className="whitespace-pre leading-relaxed">
              {`Signature 확인: "useState" → "useState" (동일 ✅)
Counter Fiber 찾기
memoizedState 보존 (count = 5)
type만 교체: OldCounter → NewCounter
NewCounter() 실행 → useState(0) → 5 반환
JSX 생성: <button>카운터: 5</button>

결과: count = 5 유지!`}
            </Code>
          </Box>
        </Card>

        {/* 시나리오 2: Hook 추가 */}
        <Card mb="4">
          <Badge color="blue" mb="2">
            시나리오 2
          </Badge>
          <Heading size="4" mb="3">
            ⚠️ Hook 추가 → 해당 컴포넌트만 Remount
          </Heading>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// Before (count = 5)
function Counter() {
  const [count, setCount] = useState(0)
  return <button>{count}</button>
}

// After - useEffect 추가
function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {  // ← Hook 추가!
    console.log(count)
  }, [count])
  return <button>{count}</button>
}`}
            </Code>
          </Box>

          <Box p="3" mb="3" className="bg-blue-50 dark:bg-blue-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              📋 타임라인:
            </Text>
            <Code size="1" className="whitespace-pre leading-relaxed">
              {`Signature 확인:
  Old: "useState"
  New: "useState→useEffect"
  → 변경됨!

Fast Refresh 판단: "Warm Reload 진행"
Counter Fiber만 Remount
부모 App Fiber는 안전!

Counter의 로컬 state: 초기화될 수 있음
부모의 state (form): 완벽히 유지! ✅`}
            </Code>
          </Box>

          <Callout.Root color="amber">
            <Callout.Text>
              ⚠️ <strong>주의:</strong> Hook 추가 시 해당 컴포넌트는 Remount되지만,{' '}
              <strong>부모 컴포넌트의 state는 안전</strong>합니다. 페이지 전체
              새로고침은 일어나지 않습니다!
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 시나리오 3: 여러 컴포넌트 export */}
        <Card mb="4">
          <Badge color="red" mb="2">
            시나리오 3
          </Badge>
          <Heading size="4" mb="3">
            ❌ 여러 컴포넌트 export → 모두 리셋
          </Heading>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// ❌ 나쁜 예: 한 파일에 여러 컴포넌트
export function Counter() {
  const [count, setCount] = useState(0)  // count = 5
  return <button>{count}</button>
}

export function Timer() {
  const [time, setTime] = useState(0)    // time = 30
  return <span>{time}</span>
}

// Counter만 수정해도...
// 파일 전체가 재평가됨!
// → Counter도 리셋 (count = 0)
// → Timer도 리셋 (time = 0)`}
            </Code>
          </Box>

          <Box p="3" className="bg-red-50 dark:bg-red-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              🔴 문제점:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">
                1. 파일 저장 시 모든 export가 재평가됨
              </Text>
              <Text size="2">
                2. $RefreshReg$(Counter, "Counter")
              </Text>
              <Text size="2">
                3. $RefreshReg$(Timer, "Timer") ← Timer도 같이 호출!
              </Text>
              <Text size="2">
                4. 두 컴포넌트 모두 새 버전으로 간주됨
              </Text>
              <Text size="2">
                5. 모든 state 초기화 ❌
              </Text>
            </Flex>
          </Box>
        </Card>
      </Box>

      {/* 실전 예제 */}
      <Box>
        <Heading size="5" mb="3">
          5. 실전 예제: Form 개발
        </Heading>

        <Text mb="3">
          실무에서 자주 마주치는 상황입니다. React Hook Form을 사용하는 폼을 개발하는
          중입니다.
        </Text>

        <Box p="4" mb="4" className="bg-surface-code-dark rounded-lg">
          <Code size="2" variant="ghost" className="text-code whitespace-pre">
            {`function MyForm() {
  const form = useForm({
    defaultValues: {
      title: '',
      count: 0
    }
  })
  
  return (
    <div>
      <TitleForm control={form.control} name="title" />
      <CounterForm control={form.control} name="count" />
    </div>
  )
}

// 사용자 입력:
// title = "안녕하세요"
// count = 42`}
          </Code>
        </Box>

        <Heading size="4" mb="3">
          🧪 테스트 케이스
        </Heading>

        <Flex direction="column" gap="3">
          <Card>
            <Heading size="3" mb="2" color="green">
              Case 1: CounterForm JSX 수정
            </Heading>
            <Code size="2" className="mb-2">
              label 추가
            </Code>
            <Text size="2" color="green">
              ✅ title = "안녕하세요" 유지
              <br />
              ✅ count = 42 유지
            </Text>
          </Card>

          <Card>
            <Heading size="3" mb="2" color="blue">
              Case 2: CounterForm에 useEffect 추가
            </Heading>
            <Code size="2" className="mb-2">
              useEffect(() =&gt; console.log('mount'), [])
            </Code>
            <Text size="2" color="blue">
              ✅ title = "안녕하세요" 유지 (부모 state)
              <br />
              ✅ count = 42 유지 (부모 state)
              <br />
              ⚠️ CounterForm만 Remount
            </Text>
          </Card>

          <Card>
            <Heading size="3" mb="2" color="red">
              Case 3: 한 파일에 TitleForm + CounterForm
            </Heading>
            <Code size="2" className="mb-2">
              Forms.tsx에 두 컴포넌트 모두 export
            </Code>
            <Text size="2" color="red">
              ❌ title 초기화
              <br />
              ❌ count 초기화
              <br />
              ❌ 둘 다 리셋됨!
            </Text>
          </Card>
        </Flex>
      </Box>

      {/* Signature 추적 */}
      <Box>
        <Heading size="5" mb="3">
          6. Signature: 컴포넌트의 지문
        </Heading>

        <Text mb="3">
          Fast Refresh는 각 컴포넌트의 "Signature"를 추적해서 변경을 감지합니다.
          Signature는 컴포넌트가 사용하는 Hook의 패턴입니다.
        </Text>

        <Box p="4" mb="4" className="bg-surface-code-dark rounded-lg">
          <Code size="2" variant="ghost" className="text-code whitespace-pre">
            {`function MyComponent() {
  const [count, setCount] = useState(0)      // Hook #1
  const [name, setName] = useState("Guest")  // Hook #2
  useEffect(() => { ... }, [count])          // Hook #3
  
  // Signature: "useState→useState→useEffect"
}

// Babel이 자동 생성하는 코드:
var _s = $RefreshSig$()

function MyComponent() {
  _s()  // Signature 호출
  
  const [count, setCount] = useState(0)
  const [name, setName] = useState("Guest")
  useEffect(() => { ... }, [count])
  
  return <div>{count} - {name}</div>
}

_s(MyComponent, "useState→useState→useEffect")
$RefreshReg$(MyComponent, "MyComponent")`}
          </Code>
        </Box>

        <Card variant="surface">
          <Heading size="4" mb="2">
            🎯 Signature 비교 로직
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="2">
              • Signature 동일 → <Badge color="green">Hot Swap</Badge> (state 완벽 보존)
            </Text>
            <Text size="2">
              • Signature 변경 → <Badge color="blue">Warm Reload</Badge> (해당
              컴포넌트만 Remount)
            </Text>
            <Text size="2">
              • React 아닌 것도 export → <Badge color="red">Full Reload</Badge> (전체
              새로고침)
            </Text>
          </Flex>
        </Card>
      </Box>

      {/* 하나의 파일에 하나의 컴포넌트 */}
      <Box>
        <Heading size="5" mb="3">
          7. 왜 하나의 파일에 하나의 컴포넌트인가?
        </Heading>

        <Text mb="4">
          이제 명확합니다. Fast Refresh는 <strong>파일 단위</strong>로 동작하기
          때문입니다.
        </Text>

        <Flex direction="column" gap="3" mb="4">
          <Card>
            <Heading size="3" mb="2" color="red">
              ❌ 나쁜 예
            </Heading>
            <Box p="3" className="bg-surface-code-dark rounded-md mb-3">
              <Code size="2" variant="ghost" className="text-code whitespace-pre">
                {`// Components.tsx
export function Button() { ... }
export function Input() { ... }
export function Form() { ... }

// Button만 수정해도
// → 파일 전체 재평가
// → Input, Form도 리셋됨 ❌`}
              </Code>
            </Box>
          </Card>

          <Card>
            <Heading size="3" mb="2" color="green">
              ✅ 좋은 예
            </Heading>
            <Box p="3" className="bg-surface-code-dark rounded-md mb-3">
              <Code size="2" variant="ghost" className="text-code whitespace-pre">
                {`// Button.tsx
export function Button() { ... }

// Input.tsx
export function Input() { ... }

// Form.tsx
export function Form() { ... }

// Button 수정 시
// → Button.tsx만 재평가
// → Input, Form은 안전 ✅`}
              </Code>
            </Box>
          </Card>
        </Flex>

        <Heading size="4" mb="3">
          📋 Best Practices
        </Heading>

        <Card variant="surface">
          <Flex direction="column" gap="2">
            <Text size="2">
              1. 하나의 파일 = 하나의 default export 컴포넌트
            </Text>
            <Text size="2">
              2. 내부 헬퍼 컴포넌트는 export하지 말기
            </Text>
            <Text size="2">
              3. 상수/타입은 별도 파일로 분리
            </Text>
            <Text size="2">
              4. 컴포넌트는 named function으로 (익명 함수 ❌)
            </Text>
            <Text size="2">
              5. State는 최대한 상위 컴포넌트에 배치
            </Text>
          </Flex>
        </Card>
      </Box>

      {/* 번들러별 차이 */}
      <Box>
        <Heading size="5" mb="3">
          8. 번들러별 차이점
        </Heading>

        <Text mb="4">
          Fast Refresh의 핵심 로직(React Refresh Runtime)은 모든 번들러에서 동일하지만,
          구현 방식은 다릅니다.
        </Text>

        <Flex direction="column" gap="3">
          <Card>
            <Heading size="3" mb="2">
              Webpack
            </Heading>
            <Flex direction="column" gap="2">
              <Text size="2">• Transform: Babel (느림)</Text>
              <Text size="2">• HMR: WebSocket + module.hot</Text>
              <Text size="2">• 속도: 100~500ms</Text>
              <Text size="2">• 전체 번들링</Text>
            </Flex>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              Vite (추천!)
            </Heading>
            <Flex direction="column" gap="2">
              <Text size="2">• Transform: esbuild (매우 빠름)</Text>
              <Text size="2">• HMR: ESM + import.meta.hot</Text>
              <Text size="2">• 속도: 10~50ms ⚡</Text>
              <Text size="2">• 번들링 없음 (dev)</Text>
            </Flex>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              Next.js (Turbopack)
            </Heading>
            <Flex direction="column" gap="2">
              <Text size="2">• Transform: SWC/Rust (빠름)</Text>
              <Text size="2">• HMR: 증분 빌드</Text>
              <Text size="2">• 속도: 20~100ms</Text>
              <Text size="2">• 기본 내장</Text>
            </Flex>
          </Card>
        </Flex>
      </Box>

      {/* 디버깅 팁 */}
      <Box>
        <Heading size="5" mb="3">
          9. Fast Refresh 디버깅 팁
        </Heading>

        <Flex direction="column" gap="3">
          <Card>
            <Heading size="3" mb="2">
              🔍 ESLint로 검사하기
            </Heading>
            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code size="2" variant="ghost" className="text-code whitespace-pre">
                {`// .eslintrc.js
{
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": "warn"
  }
}

// 여러 컴포넌트 export 시 경고!`}
              </Code>
            </Box>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              📊 로그로 확인하기
            </Heading>
            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code size="2" variant="ghost" className="text-code whitespace-pre">
                {`function MyComponent() {
  console.log('🎨 MyComponent 렌더링')
  
  useEffect(() => {
    console.log('✅ MyComponent 마운트')
    return () => console.log('❌ MyComponent 언마운트')
  }, [])
  
  // Fast Refresh 후:
  // - Hot Swap: 렌더링 로그만
  // - Remount: 언마운트 + 마운트 로그
}`}
              </Code>
            </Box>
          </Card>
        </Flex>
      </Box>

      {/* 결론 */}
      <Box>
        <Heading size="5" mb="3">
          마무리
        </Heading>

        <Text mb="4">
          React Fast Refresh는 개발 생산성을 크게 향상시키는 강력한 도구입니다. 하지만
          제대로 이해하지 못하면 예상치 못한 state 초기화로 혼란을 겪을 수 있습니다.
        </Text>

        <Card variant="surface">
          <Heading size="4" mb="3">
            🎯 핵심 요약
          </Heading>
          <Flex direction="column" gap="3">
            <Box>
              <Text weight="bold" mb="1">
                1. Fast Refresh는 파일 단위로 동작
              </Text>
              <Text size="2" color="gray">
                하나의 파일에 여러 컴포넌트가 있으면 모두 영향받음
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                2. State는 Fiber 트리의 memoizedState에 저장
              </Text>
              <Text size="2" color="gray">
                컴포넌트 함수만 교체하고 state는 보존
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                3. Signature로 변경 감지
              </Text>
              <Text size="2" color="gray">
                Hook 패턴이 변경되면 Remount (부모는 안전)
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                4. 두 가지 모드: Hot Swap vs Warm Reload
              </Text>
              <Text size="2" color="gray">
                Hot Swap (완벽 보존) / Warm Reload (해당 컴포넌트만 Remount)
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                5. 하나의 파일 = 하나의 컴포넌트
              </Text>
              <Text size="2" color="gray">
                이것이 Fast Refresh를 최대한 활용하는 방법
              </Text>
            </Box>
          </Flex>
        </Card>

        <Box mt="6" p="4" className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
          <Text size="3" weight="bold" mb="2">
            💡 개발 경험 개선 = 생산성 향상
          </Text>
          <Text size="2">
            Fast Refresh를 이해하고 올바르게 사용하면, 개발 중 state를 유지하면서
            빠르게 반복 작업을 할 수 있습니다. 복잡한 폼, 다단계 모달, 복잡한 사용자
            플로우를 개발할 때 특히 빛을 발합니다. 🚀
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

