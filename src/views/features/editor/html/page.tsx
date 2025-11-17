import { useState, useRef, useEffect } from 'react'
import { Box, Heading, Text } from '@radix-ui/themes'
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  Link2Icon,
  ListBulletIcon,
  CodeIcon,
} from '@radix-ui/react-icons'

type FormatCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'formatBlock'
  | 'foreColor'
  | 'hiliteColor'
  | 'fontSize'
  | 'createLink'

export default function EditorHtmlPage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = `
        <h1>HTML WYSIWYG 에디터</h1>
        <p>이 에디터는 <strong>contentEditable</strong>과 <code>document.execCommand</code>를 사용하여 만들어졌습니다.</p>
        <h2>지원하는 기능</h2>
        <ul>
          <li><strong>굵게</strong>, <em>기울임</em>, <u>밑줄</u>, <s>취소선</s></li>
          <li>제목 스타일 (H1 ~ H6)</li>
          <li>정렬 (왼쪽, 가운데, 오른쪽)</li>
          <li>리스트 (순서 있음/없음)</li>
          <li>링크 삽입</li>
          <li>텍스트 색상 및 배경색</li>
        </ul>
        <p>텍스트를 선택하고 위의 버튼을 사용해보세요! 🎨</p>
      `
      updateStats()
    }
  }, [])

  const executeCommand = (command: FormatCommand, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateStats()
  }

  const insertLink = () => {
    const url = prompt('URL을 입력하세요:')
    if (url) {
      executeCommand('createLink', url)
    }
  }

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    executeCommand('foreColor', e.target.value)
  }

  const changeBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    executeCommand('hiliteColor', e.target.value)
  }

  const changeFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    executeCommand('fontSize', e.target.value)
  }

  const changeHeading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      executeCommand('formatBlock', value)
    }
  }

  const updateStats = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText
      setContent(editorRef.current.innerHTML)
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
    }
  }

  const handleInput = () => {
    updateStats()
  }

  const getHtmlSource = () => {
    return editorRef.current?.innerHTML || ''
  }

  const [showSource, setShowSource] = useState(false)

  return (
    <div>
      <Box mb="4">
        <Heading size="6" mb="2">
          HTML WYSIWYG 에디터
        </Heading>
        <Text size="2" color="gray">
          라이브러리 없이 구현한 리치 텍스트 에디터입니다.
        </Text>
      </Box>

      {/* 툴바 */}
      <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md">
        <div className="flex flex-wrap gap-2">
          {/* 제목 선택 */}
          <select
            onChange={changeHeading}
            className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="">본문</option>
            <option value="h1">제목 1</option>
            <option value="h2">제목 2</option>
            <option value="h3">제목 3</option>
            <option value="h4">제목 4</option>
            <option value="h5">제목 5</option>
            <option value="h6">제목 6</option>
          </select>

          {/* 폰트 크기 */}
          <select
            onChange={changeFontSize}
            className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="3"
          >
            <option value="1">매우 작게</option>
            <option value="2">작게</option>
            <option value="3">보통</option>
            <option value="4">크게</option>
            <option value="5">매우 크게</option>
          </select>

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />

          {/* 텍스트 스타일 */}
          <ToolbarButton
            onClick={() => executeCommand('bold')}
            icon={<FontBoldIcon />}
            title="굵게 (Ctrl+B)"
          />
          <ToolbarButton
            onClick={() => executeCommand('italic')}
            icon={<FontItalicIcon />}
            title="기울임 (Ctrl+I)"
          />
          <ToolbarButton
            onClick={() => executeCommand('underline')}
            icon={<UnderlineIcon />}
            title="밑줄 (Ctrl+U)"
          />
          <ToolbarButton
            onClick={() => executeCommand('strikeThrough')}
            icon={<StrikethroughIcon />}
            title="취소선"
          />

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />

          {/* 정렬 */}
          <ToolbarButton
            onClick={() => executeCommand('justifyLeft')}
            icon={<TextAlignLeftIcon />}
            title="왼쪽 정렬"
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyCenter')}
            icon={<TextAlignCenterIcon />}
            title="가운데 정렬"
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyRight')}
            icon={<TextAlignRightIcon />}
            title="오른쪽 정렬"
          />

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />

          {/* 리스트 */}
          <ToolbarButton
            onClick={() => executeCommand('insertUnorderedList')}
            icon={<ListBulletIcon />}
            title="순서 없는 리스트"
          />
          <ToolbarButton
            onClick={() => executeCommand('insertOrderedList')}
            icon={<CodeIcon />}
            title="순서 있는 리스트"
          />

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />

          {/* 링크 */}
          <ToolbarButton
            onClick={insertLink}
            icon={<Link2Icon />}
            title="링크 삽입"
          />

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />

          {/* 색상 */}
          <label className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
            <span>색상</span>
            <input
              type="color"
              onChange={changeColor}
              className="w-6 h-6 cursor-pointer"
              defaultValue="#000000"
            />
          </label>

          <label className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
            <span>배경</span>
            <input
              type="color"
              onChange={changeBackgroundColor}
              className="w-6 h-6 cursor-pointer"
              defaultValue="#ffff00"
            />
          </label>

          <div className="w-px h-8 bg-slate-300 dark:bg-slate-600" />

          {/* HTML 소스 보기 */}
          <button
            onClick={() => setShowSource(!showSource)}
            className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {showSource ? '에디터' : 'HTML 소스'}
          </button>
        </div>
      </div>

      {/* 에디터 영역 */}
      {showSource ? (
        <div className="mb-4">
          <textarea
            value={getHtmlSource()}
            readOnly
            className="w-full h-[calc(100vh-350px)] p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-card resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="min-h-[calc(100vh-350px)] p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
          style={{ wordWrap: 'break-word' }}
        />
      )}

      {/* 통계 */}
      <Box mt="4">
        <Text size="2" color="gray">
          글자 수: <strong>{editorRef.current?.innerText.length || 0}</strong> |
          단어 수: <strong>{wordCount}</strong>
        </Text>
      </Box>
    </div>
  )
}

// 툴바 버튼 컴포넌트
function ToolbarButton({
  onClick,
  icon,
  title,
}: {
  onClick: () => void
  icon: React.ReactNode
  title: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {icon}
    </button>
  )
}
