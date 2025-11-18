import { useState } from 'react'
import { Box, Heading, Text } from '@radix-ui/themes'
import { parseMarkdown } from '@/shared/utils'
import { Modal } from '@/components/ui/modal'

const DEFAULT_MARKDOWN = `# 마크다운 에디터

왼쪽에 **마크다운**을 입력하면 오른쪽에 *실시간*으로 프리뷰가 표시됩니다.

## 지원하는 문법

### 텍스트 스타일
- **굵게**: \`**텍스트**\` 또는 \`__텍스트__\`
- *기울임*: \`*텍스트*\` 또는 \`_텍스트_\`
- ~~취소선~~: \`~~텍스트~~\`

### 제목
\`\`\`
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
\`\`\`

### 링크와 이미지
- 링크: \`[텍스트](URL)\`
- 이미지: \`![대체텍스트](이미지URL)\`

예시: [GitHub](https://github.com)

### 코드

인라인 코드는 \`백틱\`으로 감싸세요.

코드 블록은 백틱 3개로 감싸고, 언어를 지정할 수 있습니다:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
  return 42;
}
\`\`\`

\`\`\`python
def greet(name):
    print(f"안녕하세요, {name}님!")
\`\`\`

### 리스트

**순서 없는 리스트:**
- 항목 1
- 항목 2
- 항목 3

**순서 있는 리스트:**
1. 첫 번째
2. 두 번째
3. 세 번째

### 인용구

> 이것은 인용구입니다.
> 여러 줄로 작성할 수 있습니다.

### 수평선

아래는 수평선입니다:

---

## 팁

- 실시간으로 프리뷰가 업데이트됩니다
- 다크 모드를 지원합니다
- 코드 블록에 언어를 지정하면 라벨이 표시됩니다

자유롭게 수정해보세요! 🚀`

export default function EditorMarkdownPage() {
  const [content, setContent] = useState('')
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          마크다운 에디터
        </Heading>
        <Text size="2" color="gray">
          라이브러리 없이 구현한 실시간 마크다운 에디터입니다. 왼쪽에 마크다운을
          입력하고 오른쪽에서 결과를 확인하세요.
        </Text>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
        {/* 왼쪽: 입력 영역 */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              마크다운 입력
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="text-xs px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                📖 사용법 보기
              </button>
              <button
                onClick={() => setContent(DEFAULT_MARKDOWN)}
                className="text-xs px-3 py-1 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                예제 불러오기
              </button>
            </div>
          </div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="마크다운을 입력하세요..."
            className="flex-1 p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-card resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        {/* 오른쪽: 프리뷰 영역 */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            프리뷰
          </div>
          <div
            className="flex-1 p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-card overflow-auto prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
          />
        </div>
      </div>

      <Box mt="4">
        <Text size="2" color="gray">
          글자 수: <strong>{content.length}</strong> | 줄 수:{' '}
          <strong>{content.split('\n').length}</strong> | 단어 수:{' '}
          <strong>{content.trim().split(/\s+/).filter(Boolean).length}</strong>
        </Text>
      </Box>

      {/* 사용법 모달 */}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="마크다운 사용법"
        maxWidth="2xl"
      >
        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(DEFAULT_MARKDOWN) }}
        />
      </Modal>
    </div>
  )
}
