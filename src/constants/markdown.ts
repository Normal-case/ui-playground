// 마크다운 정규식 패턴
export const MARKDOWN_PATTERNS = {
  // 코드 관련
  CODE_BLOCK: /```(\w+)?\n([\s\S]*?)```/g,
  INLINE_CODE: /`([^`]+)`/g,

  // 제목
  HEADING_6: /^######\s+(.+)$/gm,
  HEADING_5: /^#####\s+(.+)$/gm,
  HEADING_4: /^####\s+(.+)$/gm,
  HEADING_3: /^###\s+(.+)$/gm,
  HEADING_2: /^##\s+(.+)$/gm,
  HEADING_1: /^#\s+(.+)$/gm,

  // 텍스트 스타일
  BOLD: /\*\*(.+?)\*\*/g,
  ITALIC: /\*(.+?)\*/g,
  STRIKETHROUGH: /~~(.+?)~~/g,

  // 링크 및 이미지
  LINK: /\[(.+?)\]\((.+?)\)/g,
  IMAGE: /!\[(.+?)\]\((.+?)\)/g,

  // 기타
  HORIZONTAL_RULE: /^---$/gm,
  BLOCKQUOTE: /^>\s+(.+)$/gm,

  // 리스트
  UNORDERED_LIST_ITEM: /^[-*+]\s+(.+)$/gm,
  UNORDERED_LIST_WRAP: /(<li class="ml-6 list-disc">.*<\/li>\n?)+/g,
  ORDERED_LIST_ITEM: /^\d+\.\s+(.+)$/gm,
  ORDERED_LIST_WRAP: /(<li class="ml-6 list-decimal">.*<\/li>\n?)+/g,

  // 줄바꿈
  LINE_BREAK: /\n/g,
} as const

// HTML 템플릿
export const MARKDOWN_HTML_TEMPLATES = {
  CODE_BLOCK: (code: string, language?: string) => {
    const langLabel = language
      ? `<div class="text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">${language}</div>`
      : ''
    const langClass = language ? `language-${language}` : ''
    return `<div class="my-4">${langLabel}<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto"><code class="text-sm ${langClass}">${code}</code></pre></div>`
  },
  INLINE_CODE:
    '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">$1</code>',

  HEADING_6: '<h6 class="text-sm font-bold mt-4 mb-2">$1</h6>',
  HEADING_5: '<h5 class="text-base font-bold mt-4 mb-2">$1</h5>',
  HEADING_4: '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>',
  HEADING_3: '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>',
  HEADING_2: '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>',
  HEADING_1: '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>',

  BOLD: '<strong class="font-bold">$1</strong>',
  ITALIC: '<em class="italic">$1</em>',
  STRIKETHROUGH: '<del class="line-through">$1</del>',

  LINK: '<a href="$2" class="text-blue-500 hover:text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>',
  IMAGE: '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-4" />',

  HORIZONTAL_RULE: '<hr class="my-6 border-slate-300 dark:border-slate-700" />',
  BLOCKQUOTE:
    '<blockquote class="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic text-slate-600 dark:text-slate-400 my-4">$1</blockquote>',

  UNORDERED_LIST_ITEM: '<li class="ml-6 list-disc">$1</li>',
  UNORDERED_LIST_WRAP: '<ul class="my-4">$&</ul>',
  ORDERED_LIST_ITEM: '<li class="ml-6 list-decimal">$1</li>',
  ORDERED_LIST_WRAP: '<ol class="my-4">$&</ol>',

  LINE_BREAK: '<br />',
} as const
