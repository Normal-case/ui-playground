import { useState } from 'react'
import { Button, Flex, Box, Heading, Text, Card } from '@radix-ui/themes'

export default function TriangleDemoPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      title: '1단계: 일반적인 정사각형',
      description: '100px x 100px 정사각형, 파란색 배경',
      code: `{
  width: '100px',
  height: '100px',
  backgroundColor: '#3b82f6',
}`,
      style: {
        width: '100px',
        height: '100px',
        backgroundColor: '#3b82f6',
      },
    },
    {
      title: '2단계: Border 추가',
      description:
        '각 방향에 50px 두꺼운 border 추가 (모서리가 대각선으로 나뉨)',
      code: `{
  width: '100px',
  height: '100px',
  backgroundColor: '#3b82f6',
  borderTop: '50px solid #ef4444',
  borderRight: '50px solid #10b981',
  borderBottom: '50px solid #f59e0b',
  borderLeft: '50px solid #8b5cf6',
}`,
      style: {
        width: '100px',
        height: '100px',
        backgroundColor: '#3b82f6',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid #10b981',
        borderBottom: '50px solid #f59e0b',
        borderLeft: '50px solid #8b5cf6',
      },
    },
    {
      title: '3단계: Width를 0으로',
      description: '너비를 0으로 만들면 좌우 border가 삼각형처럼 보임',
      code: `{
  width: '0',        // 👈 0으로!
  height: '100px',
  backgroundColor: '#3b82f6',
  borderTop: '50px solid #ef4444',
  borderRight: '50px solid #10b981',
  borderBottom: '50px solid #f59e0b',
  borderLeft: '50px solid #8b5cf6',
}`,
      style: {
        width: '0',
        height: '100px',
        backgroundColor: '#3b82f6',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid #10b981',
        borderBottom: '50px solid #f59e0b',
        borderLeft: '50px solid #8b5cf6',
      },
    },
    {
      title: '4단계: Height도 0으로',
      description: '높이도 0으로 만들면 border들만 남아서 4개의 삼각형이 보임',
      code: `{
  width: '0',        // 👈 0
  height: '0',       // 👈 0으로!
  backgroundColor: '#3b82f6',
  borderTop: '50px solid #ef4444',
  borderRight: '50px solid #10b981',
  borderBottom: '50px solid #f59e0b',
  borderLeft: '50px solid #8b5cf6',
}`,
      style: {
        width: '0',
        height: '0',
        backgroundColor: '#3b82f6',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid #10b981',
        borderBottom: '50px solid #f59e0b',
        borderLeft: '50px solid #8b5cf6',
      },
    },
    {
      title: '5단계: 위쪽 border만 남기기',
      description: '다른 border를 투명하게 하면 위쪽 삼각형만 보임',
      code: `{
  width: '0',
  height: '0',
  borderTop: '50px solid #ef4444',       // 👈 표시
  borderRight: '50px solid transparent', // 👈 투명
  borderBottom: '50px solid transparent',// 👈 투명
  borderLeft: '50px solid transparent',  // 👈 투명
}`,
      style: {
        width: '0',
        height: '0',
        borderTop: '50px solid #ef4444',
        borderRight: '50px solid transparent',
        borderBottom: '50px solid transparent',
        borderLeft: '50px solid transparent',
      },
    },
    {
      title: '6단계: 아래쪽 삼각형 (우리가 사용하는 방식)',
      description: 'bottom border만 색상을 주면 아래를 향한 삼각형!',
      code: `{
  width: '0',
  height: '0',
  borderTop: '0',                        // 👈 필요없음
  borderRight: '50px solid transparent', // 👈 투명
  borderBottom: '90px solid #8b5cf6',    // 👈 표시! (높이 조절)
  borderLeft: '50px solid transparent',  // 👈 투명
}`,
      style: {
        width: '0',
        height: '0',
        borderTop: '0',
        borderRight: '50px solid transparent',
        borderBottom: '90px solid #8b5cf6',
        borderLeft: '50px solid transparent',
      },
    },
    {
      title: '7단계: 좌우 크기 조절',
      description: 'borderLeft와 borderRight의 크기로 삼각형의 너비 조절',
      code: `{
  width: '0',
  height: '0',
  borderLeft: '75px solid transparent',  // 👈 75px
  borderRight: '75px solid transparent', // 👈 75px
  borderBottom: '90px solid #8b5cf6',
}

전체 너비 = 75 + 75 = 150px`,
      style: {
        width: '0',
        height: '0',
        borderLeft: '75px solid transparent',
        borderRight: '75px solid transparent',
        borderBottom: '90px solid #8b5cf6',
      },
    },
    {
      title: '8단계: 최종 - 우리 코드',
      description: 'shape.w / 2로 좌우를 나누고, shape.h로 높이 설정',
      code: `// shape.w = 100, shape.h = 90
{
  width: '0',
  height: '0',
  borderLeft: '50px solid transparent',  // shape.w / 2
  borderRight: '50px solid transparent', // shape.w / 2
  borderBottom: '90px solid #8b5cf6',    // shape.h
}`,
      style: {
        width: '0',
        height: '0',
        borderLeft: '50px solid transparent',
        borderRight: '50px solid transparent',
        borderBottom: '90px solid #8b5cf6',
      },
    },
  ]

  const currentStepData = steps[currentStep - 1]

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          🔺 삼각형 CSS Border Trick 단계별 학습
        </Heading>
        <Text size="2" color="gray">
          CSS border를 이용해 삼각형을 만드는 과정을 단계별로 확인하세요!
        </Text>
      </Box>

      {/* 단계 선택 버튼 */}
      <Card mb="4">
        <Heading size="4" mb="3">
          📍 단계 선택
        </Heading>
        <Flex gap="2" wrap="wrap">
          {steps.map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              variant={currentStep === index + 1 ? 'solid' : 'soft'}
              color={currentStep === index + 1 ? 'indigo' : 'gray'}
            >
              {index + 1}단계
            </Button>
          ))}
        </Flex>
      </Card>

      {/* 현재 단계 표시 */}
      <Card mb="4" className="bg-info-bg">
        <Heading size="5" mb="2">
          {currentStepData.title}
        </Heading>
        <Text size="3" color="gray">
          {currentStepData.description}
        </Text>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* 시각적 결과 */}
        <Card>
          <Heading size="4" mb="4">
            🎨 시각적 결과
          </Heading>
          <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-surface-canvas p-10">
            <div style={currentStepData.style} />
          </div>

          {/* 측정 정보 */}
          <Box mt="4" p="3" className="rounded-md bg-surface-info">
            <Text size="2" weight="bold" className="mb-2 block">
              📏 측정 정보:
            </Text>
            <Text size="2" className="block font-mono">
              width: {currentStepData.style.width || '0'}
            </Text>
            <Text size="2" className="block font-mono">
              height: {currentStepData.style.height || '0'}
            </Text>
            {currentStepData.style.borderLeft && (
              <Text size="2" className="block font-mono">
                borderLeft: {currentStepData.style.borderLeft}
              </Text>
            )}
            {currentStepData.style.borderRight && (
              <Text size="2" className="block font-mono">
                borderRight: {currentStepData.style.borderRight}
              </Text>
            )}
            {currentStepData.style.borderTop &&
              currentStepData.style.borderTop !== '0' && (
                <Text size="2" className="block font-mono">
                  borderTop: {currentStepData.style.borderTop}
                </Text>
              )}
            {currentStepData.style.borderBottom && (
              <Text size="2" className="block font-mono">
                borderBottom: {currentStepData.style.borderBottom}
              </Text>
            )}
          </Box>
        </Card>

        {/* 코드 */}
        <Card>
          <Heading size="4" mb="4">
            💻 CSS 코드
          </Heading>
          <pre className="overflow-auto rounded-lg bg-surface-code p-5 text-sm leading-relaxed text-slate-100">
            {currentStepData.code}
          </pre>
        </Card>
      </div>

      {/* 네비게이션 */}
      <Flex justify="between" mt="4">
        <Button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          size="3"
        >
          ← 이전 단계
        </Button>
        <Text size="2" color="gray" className="self-center">
          {currentStep} / {steps.length}
        </Text>
        <Button
          onClick={() =>
            setCurrentStep(Math.min(steps.length, currentStep + 1))
          }
          disabled={currentStep === steps.length}
          size="3"
        >
          다음 단계 →
        </Button>
      </Flex>

      {/* 핵심 설명 */}
      <Card mt="4" className="bg-surface-info">
        <Heading size="4" mb="3">
          💡 핵심 원리
        </Heading>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            1. Border가 만나는 방식
          </Text>
          <Text size="2" color="gray">
            여러 border가 만날 때, 모서리는 <strong>대각선으로 나뉩니다</strong>
            . 이것이 삼각형을 만드는 핵심입니다!
          </Text>
        </Box>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            2. Width와 Height를 0으로
          </Text>
          <Text size="2" color="gray">
            내용 영역을 없애면 <strong>border들만 보이게</strong> 됩니다.
          </Text>
        </Box>
        <Box mb="3">
          <Text size="2" weight="bold" className="mb-1 block">
            3. 필요한 방향만 색상 적용
          </Text>
          <Text size="2" color="gray">
            원하는 방향의 border만 색상을 주고, 나머지는{' '}
            <strong>transparent</strong>로 만들면 그 방향의 삼각형만 보입니다!
          </Text>
        </Box>
        <Box>
          <Text size="2" weight="bold" className="mb-1 block">
            4. 크기 조절
          </Text>
          <Text size="2" color="gray">
            - <strong>너비</strong>: borderLeft + borderRight의 합
            <br />- <strong>높이</strong>: borderBottom (또는 borderTop)의 크기
          </Text>
        </Box>
      </Card>

      {/* 방향별 삼각형 예시 */}
      <Card mt="4">
        <Heading size="4" mb="3">
          🧭 4방향 삼각형
        </Heading>
        <div className="grid grid-cols-4 gap-6 text-center">
          {/* 위 */}
          <div>
            <Text size="2" weight="bold" className="mb-3 block">
              위 ▲
            </Text>
            <div className="flex justify-center">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderBottom: '60px solid #ef4444',
                }}
              />
            </div>
            <pre className="mt-3 rounded bg-surface-canvas p-2 text-left text-[11px]">
              borderBottom
            </pre>
          </div>

          {/* 오른쪽 */}
          <div>
            <Text size="2" weight="bold" className="mb-3 block">
              오른쪽 ▶
            </Text>
            <div className="flex justify-center">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '40px solid transparent',
                  borderBottom: '40px solid transparent',
                  borderLeft: '60px solid #10b981',
                }}
              />
            </div>
            <pre className="mt-3 rounded bg-surface-canvas p-2 text-left text-[11px]">
              borderLeft
            </pre>
          </div>

          {/* 아래 */}
          <div>
            <Text size="2" weight="bold" className="mb-3 block">
              아래 ▼
            </Text>
            <div className="flex justify-center">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderTop: '60px solid #3b82f6',
                }}
              />
            </div>
            <pre className="mt-3 rounded bg-surface-canvas p-2 text-left text-[11px]">
              borderTop
            </pre>
          </div>

          {/* 왼쪽 */}
          <div>
            <Text size="2" weight="bold" className="mb-3 block">
              왼쪽 ◀
            </Text>
            <div className="flex justify-center">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '40px solid transparent',
                  borderBottom: '40px solid transparent',
                  borderRight: '60px solid #f59e0b',
                }}
              />
            </div>
            <pre className="mt-3 rounded bg-surface-canvas p-2 text-left text-[11px]">
              borderRight
            </pre>
          </div>
        </div>
      </Card>
    </div>
  )
}
