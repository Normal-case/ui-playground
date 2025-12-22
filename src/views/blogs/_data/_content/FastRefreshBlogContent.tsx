import {
  Box,
  Heading,
  Text,
  Card,
  Flex,
  Code,
  Callout,
  Badge,
} from '@radix-ui/themes'

/**
 * "React Fast Refresh: 하나의 파일에 하나의 컴포넌트만" 블로그 글 컨텐츠
 */
export function FastRefreshBlogContent() {
  return (
    <Box className="space-y-8">
      {/* 서론 */}
      <Box>
        <Heading size="6" mb="4">
          React Fast Refresh: 하나의 파일에 하나의 컴포넌트만
        </Heading>
        <Text size="3" color="gray" className="leading-relaxed">
          React로 개발하다 보면 "왜 내 state가 초기화되지?" 하고 당황한 경험이
          있으실 겁니다. 또는 "왜 하나의 파일에 하나의 컴포넌트만 써야 해?"라는
          의문을 가져보셨을 것입니다. 이 글에서는 React Fast Refresh의 동작
          원리를 깊이 파헤치고, 언제 state가 보존되고 언제 초기화되는지 명확히
          알아봅니다.
        </Text>
      </Box>

      {/* Fast Refresh란? */}
      <Box>
        <Heading size="5" mb="3">
          1. Fast Refresh란 무엇인가?
        </Heading>

        <Text mb="3">
          Fast Refresh는 React에서 제공하는 Hot Reload 메커니즘입니다. 코드를
          수정하고 저장하면 <strong>전체 페이지를 새로고침하지 않고</strong>{' '}
          변경된 컴포넌트만 업데이트합니다.
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
              React 팀이 제공하는 핵심 엔진. 번들러와 독립적으로 동작하며,
              컴포넌트 등록, Signature 추적, Fiber 트리 업데이트를 담당합니다.
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
              파일 변경 감지, HMR 프로토콜, 브라우저와의 통신을 담당합니다. 각
              번들러마다 구현이 다릅니다.
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
              코드에 Signature 추적 코드를 자동 삽입하고, 컴포넌트를 등록하는
              코드를 생성합니다.
            </Text>
          </Card>
        </Flex>
      </Box>

      {/* 동작 흐름 */}
      <Box>
        <Heading size="5" mb="3">
          2. Fast Refresh 동작 흐름 (단계별)
        </Heading>

        <Text mb="3">
          파일을 수정하고 저장했을 때 어떤 일이 일어나는지 살펴봅시다.
        </Text>

        <Card mb="4">
          <Box
            p="4"
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
          >
            <Code
              size="2"
              variant="ghost"
              className="whitespace-pre font-mono text-xs leading-relaxed"
            >
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
          Fast Refresh가 어떻게 특정 컴포넌트만 찾아서 업데이트할 수 있을까요?
          그 비밀은 바로 <strong>Fiber 트리</strong>에 있습니다.
        </Text>

        <Heading size="4" mb="3">
          📊 Fiber 노드 구조
        </Heading>

        <Box
          p="4"
          mb="4"
          className="bg-surface-code-dark rounded-lg border border-gray-300 dark:border-gray-600"
        >
          <Code
            size="2"
            variant="ghost"
            className="text-code whitespace-pre font-mono"
          >
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

        <Callout.Root color="blue" mb="4">
          <Callout.Text>
            💡 <strong>핵심:</strong> State는{' '}
            <Code variant="ghost">memoizedState</Code>에 저장됩니다. Fast
            Refresh는 컴포넌트 함수(<Code variant="ghost">type</Code>
            )만 교체하고 <Code variant="ghost">memoizedState</Code>는 건드리지
            않아서 state가 보존됩니다!
          </Callout.Text>
        </Callout.Root>
      </Box>

      {/* Fast Refresh의 3가지 모드 */}
      <Box>
        <Heading size="5" mb="3">
          4. Fast Refresh의 3가지 모드
        </Heading>

        <Text mb="4">
          Fast Refresh는 변경 사항에 따라 3가지 모드로 동작합니다. 각 모드마다
          state 처리 방식이 다릅니다.
        </Text>

        {/* 모드 비교 표 */}
        <Card mb="4" variant="surface">
          <Heading size="4" mb="3">
            📊 모드 비교
          </Heading>
          <Box
            p="3"
            className="overflow-x-auto bg-gray-50 dark:bg-gray-900 rounded"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2 px-3">모드</th>
                  <th className="text-left py-2 px-3">조건</th>
                  <th className="text-left py-2 px-3">State 보존</th>
                  <th className="text-left py-2 px-3">속도</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3">
                    <Badge color="green">Hot Swap</Badge>
                  </td>
                  <td className="py-2 px-3">Signature 동일</td>
                  <td className="py-2 px-3">✅ 완벽 보존</td>
                  <td className="py-2 px-3">🚀 10~50ms</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3">
                    <Badge color="blue">Warm Reload</Badge>
                  </td>
                  <td className="py-2 px-3">Signature 변경</td>
                  <td className="py-2 px-3">⚠️ 해당 컴포넌트만 리셋</td>
                  <td className="py-2 px-3">⚡ 50~200ms</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">
                    <Badge color="red">Full Reload</Badge>
                  </td>
                  <td className="py-2 px-3">안전하지 않은 변경</td>
                  <td className="py-2 px-3">❌ 모든 state 초기화</td>
                  <td className="py-2 px-3">🐌 1~5초</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Card>

        {/* 모드 1: Hot Swap */}
        <Card mb="4">
          <Badge color="green" mb="2">
            모드 1
          </Badge>
          <Heading size="4" mb="3">
            🟢 Hot Swap: State 완벽 보존
          </Heading>

          <Text size="2" mb="3" color="gray">
            Signature가 동일할 때 발생합니다. Hook 구조가 변하지 않은
            경우입니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// Before (count = 5)
function Counter() {
  const [count, setCount] = useState(0)
  return <button>Count: {count}</button>
}

// After - JSX만 수정
function Counter() {
  const [count, setCount] = useState(0)
  return <button className="new">카운터: {count}</button>
}

✅ count = 5 유지!
✅ 자식 컴포넌트 Fiber 재사용!
✅ 자식의 state도 유지!`}
            </Code>
          </Box>

          <Box
            p="3"
            mb="3"
            className="bg-green-100 dark:bg-green-900/20 rounded"
          >
            <Text size="2" weight="bold" mb="2">
              🔄 동작 과정:
            </Text>
            <Code
              size="1"
              variant="ghost"
              className="whitespace-pre leading-relaxed"
            >
              {`
1. Signature 확인: "useState" → "useState" (동일 ✅)
2. Counter Fiber 노드 찾기
3. memoizedState 보존 (count = 5)
4. fiber.type만 교체: OldCounter → NewCounter
5. NewCounter() 실행 → useState(0) → 5 반환
6. React reconciliation으로 자식 비교
7. 자식 Props 변경 없으면 재사용

✅ 결과: 모든 state 유지, 가장 빠름!`}
            </Code>
          </Box>

          <Callout.Root color="green" mb="3">
            <Callout.Text>
              💡 <strong>Hot Swap이 가능한 변경:</strong> JSX 수정, 이벤트
              핸들러 로직 변경, 조건부 렌더링, CSS 클래스명, Props 사용 방식 등
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 모드 2: Warm Reload */}
        <Card mb="4">
          <Badge color="blue" mb="2">
            모드 2
          </Badge>
          <Heading size="4" mb="3">
            🟡 Warm Reload: 해당 컴포넌트만 Remount
          </Heading>

          <Text size="2" mb="3" color="gray">
            Signature가 변경될 때 발생합니다. Hook을 추가/제거/순서 변경한
            경우입니다.
          </Text>

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
  useEffect(() => {
    console.log('mounted')
  }, [])
  return <button>{count}</button>
}

⚠️ Counter의 count = 0으로 초기화
✅ 하지만 부모의 state는 안전!
❌ 자식도 모두 Remount (새로 생성)`}
            </Code>
          </Box>

          <Box p="3" mb="3" className="bg-blue-50 dark:bg-blue-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              🔄 동작 과정:
            </Text>
            <Code
              size="1"
              variant="ghost"
              className="whitespace-pre leading-relaxed"
            >
              {`
1. Signature 확인:
   Old: "useState"
   New: "useState→useEffect"
   → 변경됨!

2. Fast Refresh 판단: "Warm Reload"
3. Counter Fiber만 Remount
   - useEffect cleanup 실행
   - Counter 언마운트
   - 자식들도 모두 언마운트
   - Counter 새로 마운트
   - 자식들도 새로 마운트
   
4. 부모 App Fiber는 안전!

⚠️ Counter와 자식: 초기화됨
✅ 부모 state: 완벽히 유지!`}
            </Code>
          </Box>

          <Callout.Root color="amber" mb="3">
            <Callout.Text>
              ⚠️ <strong>Warm Reload가 발생하는 변경:</strong> Hook 추가/제거,
              Hook 순서 변경, Custom Hook 추가/제거. 중요한 state는 부모에서
              관리하세요!
            </Callout.Text>
          </Callout.Root>

          <Box p="3" className="bg-blue-50 dark:bg-blue-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              💡 해결 전략:
            </Text>
            <Code
              size="2"
              variant="ghost"
              className="whitespace-pre leading-relaxed"
            >
              {`// 부모에서 state 관리
function App() {
  const form = useForm({ defaultValues: { email: "test@test.com" } })
  return <LoginForm control={form.control} />
}

// LoginForm에 Hook 추가해도
// form state는 App에 있으니 안전! ✅`}
            </Code>
          </Box>
        </Card>

        {/* 모드 3: Full Reload */}
        <Card mb="4">
          <Badge color="red" mb="2">
            모드 3
          </Badge>
          <Heading size="4" mb="3">
            🔴 Full Reload: 전체 페이지 새로고침
          </Heading>

          <Text size="2" mb="3" color="gray">
            React 컴포넌트가 아닌 것도 export하거나, 안전하지 않은 변경을 할 때
            발생합니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// ❌ 예시 1: 한 파일에 여러 컴포넌트
export function Counter() {
  const [count, setCount] = useState(0)  // count = 5
  return <button>{count}</button>
}

export function Timer() {
  const [time, setTime] = useState(0)    // time = 30
  return <span>{time}</span>
}

// ❌ 예시 2: 상수도 함께 export
export const MAX_COUNT = 100
export function Counter() { ... }

// ❌ 예시 3: 최상위 Side Effect
console.log('파일 로드됨')
export function Counter() { ... }

// 결과: location.reload() 실행
// → 모든 state 초기화 (count = 0, time = 0)`}
            </Code>
          </Box>

          <Box p="3" mb="3" className="bg-red-50 dark:bg-red-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              🔴 Full Reload가 발생하는 경우:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">1. 한 파일에 여러 컴포넌트 export</Text>
              <Text size="2">2. 컴포넌트와 상수/함수 함께 export</Text>
              <Text size="2">3. 클래스 컴포넌트</Text>
              <Text size="2">4. HOC가 반환하는 컴포넌트</Text>
              <Text size="2">5. 최상위에서 Side Effect 실행</Text>
              <Text size="2">6. React 컴포넌트가 아닌 것만 export</Text>
            </Flex>
          </Box>

          <Callout.Root color="red" mb="3">
            <Callout.Text>
              🚨 <strong>Full Reload는 개발 경험을 크게 저하시킵니다.</strong>{' '}
              모든 state가 초기화되고, 네트워크 요청이 재실행되며, 가장
              느립니다. 반드시 피해야 합니다!
            </Callout.Text>
          </Callout.Root>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded">
            <Text size="2" weight="bold" mb="2">
              ✅ 올바른 패턴:
            </Text>
            <Code
              size="2"
              variant="ghost"
              className="whitespace-pre leading-relaxed"
            >
              {`
// constants.ts (별도 파일)
export const MAX_COUNT = 100

// Counter.tsx (컴포넌트만)
import { MAX_COUNT } from './constants'
export default function Counter() { ... }

// Timer.tsx (컴포넌트만)
export default function Timer() { ... }

// 이제 Counter 수정 시
// → Counter.tsx만 Hot Swap
// → Timer는 영향 없음 ✅`}
            </Code>
          </Box>
        </Card>

        {/* 실전 비교 */}
        <Card variant="surface">
          <Heading size="4" mb="3">
            🎯 실전 비교: 폼 개발 시나리오
          </Heading>

          <Flex direction="column" gap="3">
            <Box>
              <Badge color="green" mb="1" mr="2">
                Hot Swap
              </Badge>
              <Text size="2" mb="1">
                LoginForm의 버튼 텍스트를 "Login" → "로그인"으로 수정
              </Text>
              <Text size="1" color="gray" ml="2">
                ✅ 입력한 이메일/비밀번호 그대로 유지
              </Text>
            </Box>

            <Box>
              <Badge color="blue" mb="1" mr="2">
                Warm Reload
              </Badge>
              <Text size="2" mb="1">
                LoginForm에 디버깅용 useEffect 추가
              </Text>
              <Text size="1" color="gray" ml="2">
                ⚠️ LoginForm 초기화되지만, 부모의 form state는 유지 (부모가
                관리하는 경우)
              </Text>
            </Box>

            <Box>
              <Badge color="red" mb="1" mr="2">
                Full Reload
              </Badge>
              <Text size="2" mb="1">
                Forms.tsx에 LoginForm과 SignupForm을 함께 export
              </Text>
              <Text size="1" color="gray" ml="2">
                ❌ 모든 폼의 입력값 초기화, 전체 페이지 새로고침
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>

      {/* Signature 추적 */}
      <Box>
        <Heading size="5" mb="3">
          5. Signature: 컴포넌트의 지문
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
              • Signature 동일 → <Badge color="green">Hot Swap</Badge> (state
              완벽 보존)
            </Text>
            <Text size="2">
              • Signature 변경 → <Badge color="blue">Warm Reload</Badge> (해당
              컴포넌트만 Remount)
            </Text>
            <Text size="2">
              • React 아닌 것도 export → <Badge color="red">Full Reload</Badge>{' '}
              (전체 새로고침)
            </Text>
          </Flex>
        </Card>
      </Box>

      {/* 하나의 파일에 하나의 컴포넌트 */}
      <Box>
        <Heading size="5" mb="3">
          6. 왜 하나의 파일에 하나의 컴포넌트인가?
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
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
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
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
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
            <Text size="2">2. 내부 헬퍼 컴포넌트는 export하지 말기</Text>
            <Text size="2">3. 상수/타입은 별도 파일로 분리</Text>
            <Text size="2">
              4. 컴포넌트는 named function으로 (익명 함수 ❌)
            </Text>
            <Text size="2">5. State는 최대한 상위 컴포넌트에 배치</Text>
          </Flex>
        </Card>
      </Box>

      {/* 번들러별 차이 */}
      <Box>
        <Heading size="5" mb="3">
          7. 번들러별 차이점
        </Heading>

        <Text mb="4">
          Fast Refresh의 핵심 로직(React Refresh Runtime)은 모든 번들러에서
          동일하지만, 구현 방식은 다릅니다.
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
          8. Fast Refresh 디버깅 팁
        </Heading>

        <Flex direction="column" gap="3">
          <Card>
            <Heading size="3" mb="2">
              🔍 ESLint로 검사하기
            </Heading>
            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
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
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
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
          React Fast Refresh는 개발 생산성을 크게 향상시키는 강력한 도구입니다.
          하지만 제대로 이해하지 못하면 예상치 못한 state 초기화로 혼란을 겪을
          수 있습니다.
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
              <Text size="2" color="gray" ml="2">
                하나의 파일에 여러 컴포넌트가 있으면 모두 영향받음
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                2. State는 Fiber 트리의 memoizedState에 저장
              </Text>
              <Text size="2" color="gray" ml="2">
                컴포넌트 함수만 교체하고 state는 보존
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                3. Signature로 변경 감지
              </Text>
              <Text size="2" color="gray" ml="2">
                Hook 패턴이 변경되면 Remount (부모는 안전)
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                4. 두 가지 모드: Hot Swap vs Warm Reload
              </Text>
              <Text size="2" color="gray" ml="2">
                Hot Swap (완벽 보존) / Warm Reload (해당 컴포넌트만 Remount)
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                5. 하나의 파일 = 하나의 컴포넌트
              </Text>
              <Text size="2" color="gray" ml="2">
                이것이 Fast Refresh를 최대한 활용하는 방법
              </Text>
            </Box>
          </Flex>
        </Card>

        <Box
          mt="6"
          p="4"
          className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg"
        >
          <Text size="3" weight="bold" mb="2">
            💡 개발 경험 개선 = 생산성 향상
          </Text>
          <Text size="2">
            Fast Refresh를 이해하고 올바르게 사용하면, 개발 중 state를
            유지하면서 빠르게 반복 작업을 할 수 있습니다. 복잡한 폼, 다단계
            모달, 복잡한 사용자 플로우를 개발할 때 특히 빛을 발합니다. 🚀
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
