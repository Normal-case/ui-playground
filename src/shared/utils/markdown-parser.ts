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
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto my-4"><code class="text-sm">${escapeHtml(code.trim())}</code></pre>`
  })

  // 인라인 코드 (`)
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">$1</code>'
  )

  // 제목 (# ~ ######)
  html = html.replace(
    /^######\s+(.+)$/gm,
    '<h6 class="text-sm font-bold mt-4 mb-2">$1</h6>'
  )
  html = html.replace(
    /^#####\s+(.+)$/gm,
    '<h5 class="text-base font-bold mt-4 mb-2">$1</h5>'
  )
  html = html.replace(
    /^####\s+(.+)$/gm,
    '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>'
  )
  html = html.replace(
    /^###\s+(.+)$/gm,
    '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>'
  )
  html = html.replace(
    /^##\s+(.+)$/gm,
    '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>'
  )
  html = html.replace(
    /^#\s+(.+)$/gm,
    '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>'
  )

  // 굵게 (**)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')

  // 기울임 (*)
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

  // 취소선 (~~)
  html = html.replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>')

  // 링크 [text](url)
  html = html.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-blue-500 hover:text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // 이미지 ![alt](url)
  html = html.replace(
    /!\[(.+?)\]\((.+?)\)/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-4" />'
  )

  // 수평선 (---)
  html = html.replace(
    /^---$/gm,
    '<hr class="my-6 border-slate-300 dark:border-slate-700" />'
  )

  // 인용구 (>)
  html = html.replace(
    /^>\s+(.+)$/gm,
    '<blockquote class="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic text-slate-600 dark:text-slate-400 my-4">$1</blockquote>'
  )

  // 순서 없는 리스트 (-, *, +)
  html = html.replace(/^[-*+]\s+(.+)$/gm, '<li class="ml-6 list-disc">$1</li>')
  html = html.replace(
    /(<li class="ml-6 list-disc">.*<\/li>\n?)+/g,
    '<ul class="my-4">$&</ul>'
  )

  // 순서 있는 리스트 (1., 2., ...)
  html = html.replace(
    /^\d+\.\s+(.+)$/gm,
    '<li class="ml-6 list-decimal">$1</li>'
  )
  html = html.replace(
    /(<li class="ml-6 list-decimal">.*<\/li>\n?)+/g,
    '<ol class="my-4">$&</ol>'
  )

  // 줄바꿈을 <br>로
  html = html.replace(/\n/g, '<br />')

  return html
}
