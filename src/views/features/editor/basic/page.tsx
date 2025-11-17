import { useState } from 'react'
import { Box, Heading, Text } from '@radix-ui/themes'
import { parseMarkdown } from '@/shared/utils'

export default function EditorBasicPage() {
  const [content, setContent] = useState(`# 마크다운 에디터`)

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          마크다운 에디터
        </Heading>
        <Text size="2" color="gray">
          라이브러리 없이 구현한 실시간 마크다운 에디터입니다.
        </Text>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
        {/* 왼쪽: 입력 영역 */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            입력
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
          <strong>{content.trim().split(/\s+/).length}</strong>
        </Text>
      </Box>
    </div>
  )
}
