# UI Playground 🚀

React + TypeScript + Vite로 만든 모던 웹 애플리케이션 스타터 템플릿입니다.
확장 가능한 폴더 구조와 체계적인 코드 관리를 위한 베스트 프랙티스를 적용했습니다.

## ✨ 주요 기능

- ⚡ **Vite** - 빠른 개발 서버와 HMR (Hot Module Replacement)
- ⚛️ **React 19** - 최신 React 기능 지원
- 🎨 **Radix UI + Tailwind CSS** - 접근성과 디자인을 동시에
- 🔷 **TypeScript** - 타입 안정성
- 🛣️ **React Router** - SPA 라우팅
- 📏 **ESLint + Prettier** - 코드 품질 관리
- 🌓 **다크/라이트 테마** - 테마 전환 지원

## 🏗️ 프로젝트 구조

```
src/
├── views/                      # 페이지 (Next.js 스타일 라우팅)
│   ├── home/
│   │   └── index.tsx          # / 경로
│   └── blogs/
│       ├── index.tsx           # /blogs
│       ├── [id]/
│       │   └── index.tsx      # /blogs/:id (동적 라우트)
│       ├── components/         # blogs 도메인 컴포넌트
│       └── hooks/              # blogs 도메인 hooks
│
├── components/                 # 범용 UI 컴포넌트
│   ├── ui/                     # 디자인 시스템 컴포넌트
│   │   └── theme-toggle/       # 테마 토글 스위치
│   └── layout/                 # 레이아웃 컴포넌트
│       ├── header/
│       ├── app-layout/
│       └── index.ts
│
├── shared/                     # 공통 유틸리티
│   ├── hooks/                  # 공통 커스텀 hooks
│   ├── utils/                  # 공통 유틸 함수
│   ├── api/                    # API 호출 로직
│   └── lib/                    # 외부 라이브러리 설정
│
├── types/                      # TypeScript 타입 정의
│   ├── blog.ts
│   └── index.ts
│
├── constants/                  # 상수
├── routes.tsx                  # React Router 설정
└── main.tsx                    # 앱 엔트리 포인트
```

### 📁 폴더 구조 철학

#### 1. **views/** - 페이지 컴포넌트

- URL 경로와 파일 구조가 1:1 매칭
- Next.js 스타일: `index.tsx` 파일명, `[param]` 동적 라우트
- 도메인별로 `components/`, `hooks/` 포함 가능

```typescript
views/blogs/
├── index.tsx              # /blogs
├── [id]/
│   └── index.tsx         # /blogs/:id
├── components/            # blogs 전용 컴포넌트
└── hooks/                 # blogs 전용 hooks
```

#### 2. **components/** - 범용 UI

- **ui/**: 디자인 시스템 컴포넌트 (ThemeToggle, Button 등)
- **layout/**: 레이아웃 컴포넌트 (Header, Footer 등)
- 도메인 무관한 재사용 가능한 컴포넌트
- 다른 프로젝트에 복사해도 동작

#### 3. **shared/** - 공통 유틸리티

- **hooks/**: 범용 커스텀 hooks (useDebounce 등)
- **utils/**: 순수 함수 (formatDate 등)
- **lib/**: 외부 라이브러리 설정
- **api/**: API 호출 로직

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.19+ 또는 22.12+
- pnpm (권장) 또는 npm/yarn

### 설치

```bash
# 패키지 설치
pnpm install

# 또는
npm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

### 코드 품질

```bash
# 린팅
pnpm lint

# 린팅 + 자동 수정
pnpm lint:fix

# 포맷팅
pnpm format

# 포맷팅 체크
pnpm format:check

# 타입 체크
pnpm typecheck
```

## 📝 개발 가이드

### 새 페이지 추가

```typescript
// src/views/about/index.tsx
export default function AboutPage() {
  return <div>About Page</div>
}
```

```typescript
// src/routes.tsx에 추가
{
  path: 'about',
  element: <AboutPage />
}
```

### 동적 라우트 추가

```typescript
// src/views/users/[id]/index.tsx
import { useParams } from 'react-router-dom'

export default function UserDetailPage() {
  const { id } = useParams()
  return <div>User ID: {id}</div>
}
```

### Import Path Alias

`@/`를 사용하여 깔끔하게 import:

```typescript
// ✅ Path alias 사용
import { formatDate } from '@/shared/utils'
import type { Blog } from '@/types/blog'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Header } from '@/components/layout'

// ✅ 상대 경로 (같은 도메인 내부)
import { BlogCard } from './components/BlogCard'
import { useBlogs } from './hooks/use-blogs'
```

## 🎯 의사결정 가이드

### "이 컴포넌트는 어디에 둬야 할까?"

```
다른 프로젝트에 복사해도 동작하나?
├─ YES
│  └─ 레이아웃 컴포넌트?
│     ├─ YES → components/layout/
│     └─ NO → components/ui/
└─ NO
   └─ 특정 도메인에만 사용?
      ├─ YES → views/[domain]/components/
      └─ NO → 다시 생각해보기
```

### "이 hook은 어디에 둬야 할까?"

```
React 기능만 확장? (도메인 로직 없음)
├─ YES → shared/hooks/
└─ NO
   └─ API 호출이나 도메인 로직 포함?
      ├─ YES → views/[domain]/hooks/
      └─ NO → 다시 생각해보기
```

### "이 함수는 어디에 둬야 할까?"

```
순수 함수? (React 의존성 없음)
├─ YES
│  └─ 도메인 무관?
│     ├─ YES → shared/utils/
│     └─ NO → views/[domain]/utils/
└─ NO → hook으로 만들기
```

## 🛠️ 기술 스택

### Core

- **React 19.1** - UI 라이브러리
- **TypeScript 5.9** - 타입 시스템
- **Vite 7.1** - 빌드 도구

### UI & Styling

- **Radix UI Themes 3.2** - 접근성 좋은 UI 컴포넌트
- **Tailwind CSS 3.4** - 유틸리티 CSS
- **PostCSS** - CSS 후처리

### Routing

- **React Router 7.9** - SPA 라우팅

### Code Quality

- **ESLint 9.36** - 린팅
- **Prettier 3.6** - 포맷팅
- **TypeScript ESLint 8.46** - TypeScript 린팅

### Utilities

- **clsx** - 조건부 클래스 처리
- **tailwind-merge** - Tailwind 클래스 충돌 해결

## 📚 주요 컨벤션

### 폴더명

- **kebab-case** 사용 (예: `theme-toggle/`, `app-layout/`)
- 동적 라우트: `[id]/`, `[slug]/` (Next.js 스타일)
- URL 친화적이고 OS 호환성 좋음

### 파일명

- 컴포넌트: `PascalCase.tsx` (예: `BlogCard.tsx`, `ThemeToggle.tsx`)
- 페이지: `index.tsx` (폴더명으로 구분)
- Hooks: `kebab-case.ts` (예: `use-blogs.ts`, `use-theme.ts`)
- Utils: `kebab-case.ts` (예: `format-date.ts`)
- Types: `kebab-case.ts` (예: `blog.ts`)

### 컴포넌트

```typescript
// ✅ Named export + default export
export default function HomePage() {
  return <div>Home</div>
}

// ✅ 도메인 컴포넌트는 named export만
export function BlogCard({ blog }: BlogCardProps) {
  return <div>{blog.title}</div>
}
```

### Import 순서

```typescript
// 1. React 관련
import { useState } from 'react'
import { Link } from 'react-router-dom'

// 2. 외부 라이브러리
import { Button, Card } from '@radix-ui/themes'

// 3. 내부 절대 경로 (@/)
import { formatDate } from '@/shared/utils'
import type { Blog } from '@/types/blog'

// 4. 상대 경로
import { BlogCard } from './components/BlogCard'
```

## 🎨 스타일링 가이드

### Tailwind + cn() 함수

```typescript
import { cn } from '@/shared/lib/cn'

function Component({ className, variant }) {
  return (
    <div className={cn(
      'base-classes',
      variant === 'primary' && 'bg-violet-500',
      variant === 'secondary' && 'bg-slate-500',
      className  // props로 받은 추가 클래스
    )}>
      Content
    </div>
  )
}
```

## 🔧 설정 파일

- **vite.config.ts** - Vite 설정, path alias
- **tsconfig.json** - TypeScript 설정
- **eslint.config.js** - ESLint 설정 (Flat Config)
- **.prettierrc** - Prettier 설정
- **tailwind.config.js** - Tailwind CSS 설정

## 📖 참고 자료

- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Radix UI](https://www.radix-ui.com/themes)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 📄 라이선스

MIT

---

**Happy Coding! 🎉**
