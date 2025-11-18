import { MARKDOWN_PATTERNS, MARKDOWN_HTML_TEMPLATES } from '@/constants'

// HTML 이스케이프 함수
function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * 마크다운을 HTML로 변환하는 함수
 * @param markdown - 변환할 마크다운 텍스트
 * @returns HTML 문자열
 */
export function parseMarkdown(markdown: string): string {
  let html = markdown

  // 코드 블록 (```) - 먼저 처리해야 다른 규칙의 영향을 받지 않음
  html = html.replace(MARKDOWN_PATTERNS.CODE_BLOCK, (_, lang, code) => {
    return MARKDOWN_HTML_TEMPLATES.CODE_BLOCK(escapeHtml(code.trim()), lang)
  })

  // 인라인 코드 (`)
  html = html.replace(
    MARKDOWN_PATTERNS.INLINE_CODE,
    MARKDOWN_HTML_TEMPLATES.INLINE_CODE
  )

  // 제목 (# ~ ######) - 순서 중요: 긴 것부터 처리
  html = html.replace(
    MARKDOWN_PATTERNS.HEADING_6,
    MARKDOWN_HTML_TEMPLATES.HEADING_6
  )
  html = html.replace(
    MARKDOWN_PATTERNS.HEADING_5,
    MARKDOWN_HTML_TEMPLATES.HEADING_5
  )
  html = html.replace(
    MARKDOWN_PATTERNS.HEADING_4,
    MARKDOWN_HTML_TEMPLATES.HEADING_4
  )
  html = html.replace(
    MARKDOWN_PATTERNS.HEADING_3,
    MARKDOWN_HTML_TEMPLATES.HEADING_3
  )
  html = html.replace(
    MARKDOWN_PATTERNS.HEADING_2,
    MARKDOWN_HTML_TEMPLATES.HEADING_2
  )
  html = html.replace(
    MARKDOWN_PATTERNS.HEADING_1,
    MARKDOWN_HTML_TEMPLATES.HEADING_1
  )

  // 굵게 (**)
  html = html.replace(MARKDOWN_PATTERNS.BOLD, MARKDOWN_HTML_TEMPLATES.BOLD)

  // 기울임 (*)
  html = html.replace(MARKDOWN_PATTERNS.ITALIC, MARKDOWN_HTML_TEMPLATES.ITALIC)

  // 취소선 (~~)
  html = html.replace(
    MARKDOWN_PATTERNS.STRIKETHROUGH,
    MARKDOWN_HTML_TEMPLATES.STRIKETHROUGH
  )

  // 링크 [text](url)
  html = html.replace(MARKDOWN_PATTERNS.LINK, MARKDOWN_HTML_TEMPLATES.LINK)

  // 이미지 ![alt](url)
  html = html.replace(MARKDOWN_PATTERNS.IMAGE, MARKDOWN_HTML_TEMPLATES.IMAGE)

  // 수평선 (---)
  html = html.replace(
    MARKDOWN_PATTERNS.HORIZONTAL_RULE,
    MARKDOWN_HTML_TEMPLATES.HORIZONTAL_RULE
  )

  // 인용구 (>)
  html = html.replace(
    MARKDOWN_PATTERNS.BLOCKQUOTE,
    MARKDOWN_HTML_TEMPLATES.BLOCKQUOTE
  )

  // 순서 없는 리스트 (-, *, +)
  html = html.replace(
    MARKDOWN_PATTERNS.UNORDERED_LIST_ITEM,
    MARKDOWN_HTML_TEMPLATES.UNORDERED_LIST_ITEM
  )
  html = html.replace(
    MARKDOWN_PATTERNS.UNORDERED_LIST_WRAP,
    MARKDOWN_HTML_TEMPLATES.UNORDERED_LIST_WRAP
  )

  // 순서 있는 리스트 (1., 2., ...)
  html = html.replace(
    MARKDOWN_PATTERNS.ORDERED_LIST_ITEM,
    MARKDOWN_HTML_TEMPLATES.ORDERED_LIST_ITEM
  )
  html = html.replace(
    MARKDOWN_PATTERNS.ORDERED_LIST_WRAP,
    MARKDOWN_HTML_TEMPLATES.ORDERED_LIST_WRAP
  )

  // 줄바꿈을 <br>로
  html = html.replace(
    MARKDOWN_PATTERNS.LINE_BREAK,
    MARKDOWN_HTML_TEMPLATES.LINE_BREAK
  )

  return html
}
