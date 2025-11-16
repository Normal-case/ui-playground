import { useState } from 'react'
import { Box, Heading, Text } from '@radix-ui/themes'

export default function EditorBasicPage() {
  const [content, setContent] = useState('')

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          Editor Basic - 기본 에디터
        </Heading>
        <Text size="2" color="gray">
          기본 텍스트 에디터입니다. 구체적인 기능은 곧 추가될 예정입니다.
        </Text>
      </Box>

      <Box>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="여기에 텍스트를 입력하세요..."
          className="w-full h-96 p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-card resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Box>

      <Box mt="4">
        <Text size="2" color="gray">
          글자 수: <strong>{content.length}</strong> | 줄 수:{' '}
          <strong>{content.split('\n').length}</strong>
        </Text>
      </Box>
    </div>
  )
}

