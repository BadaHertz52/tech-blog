# 기술 블로그 프로젝트 - Claude Code 가이드

> Next.js 기반 개발자 기술 블로그

---

## 📋 프로젝트 개요

### 목표
개발자의 트러블슈팅과 기술적 성장을 담는 고품질 기술 블로그

### 타겟 사용자
- 주니어~시니어 개발자
- 기술 학습에 관심 있는 개발자
- 실전 경험과 문제 해결 과정을 원하는 개발자

### 핵심 가치
- **고품질 콘텐츠**: 실전 경험 기반의 깊이 있는 글
- **접근성**: 모든 사용자가 쉽게 접근 가능
- **성능**: 빠른 로딩과 쾌적한 UX
- **디자인**: 일관되고 아름다운 UI

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Runtime**: React 19.2.3
- **Styling**: Tailwind CSS
- **State**: Zustand (클라이언트 상태)
- **Data Fetching**: React Query (서버 상태)
- **UI Documentation**: Storybook 10

### Backend / CMS
- **Auth**: GitHub OAuth (사용자 인증)
- **Database**: Vercel KV (TBD - 조회 수, 좋아요, 공유 횟수 등)

### Development
- **Package Manager**: Yarn
- **Linting**: ESLint (with TypeScript, Next.js, Storybook plugins)
- **Formatting**: Prettier (with Tailwind CSS, import sort plugins)
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel
- **Build Tool**: Vite (Storybook)

---

## 📁 폴더 구조

```sh
tech-blog/
├── .claude/                    # Claude Code 환경
│   ├── skills/                 # Skills 정의 (10개 스킬)
│   └── memory/                 # Auto memory
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/          # 라우트 그룹
│   │   ├── api/               # API Routes
│   │   ├── globals.css        # 글로벌 스타일
│   │   └── layout.tsx
│   │
│   ├── components/            # 공통 컴포넌트
│   │   ├── Button/            # 복잡한 컴포넌트 (폴더 구조)
│   │   │   ├── index.tsx      # 메인 컴포넌트
│   │   │   ├── stories.tsx    # Storybook
│   │   │   ├── constants.ts   # 상수 (필요시)
│   │   │   ├── hooks/         # 훅 폴더 (필요시)
│   │   │   ├── utils.ts       # 유틸리티 (필요시)
│   │   │   └── components/    # 자식 컴포넌트 (필요시)
│   │   │       └── ButtonIcon/
│   │   │           └── index.tsx
│   │   ├── Card/              # 폴더 구조
│   │   │   ├── index.tsx
│   │   │   ├── stories.tsx
│   │   │   └── components/
│   │   │       ├── CardHeader/
│   │   │       ├── CardBody/
│   │   │       └── CardFooter/
│   │   ├── Avatar.tsx         # 간단한 컴포넌트 (단일 파일)
│   │   ├── Badge.tsx          # 단일 파일
│   │   └── Icon.tsx           # 단일 파일
│   │
│   ├── services/              # 서비스 레이어
│   │   ├── api/              # API 클라이언트
│   │   └── hooks/            # Custom hooks (React Query 등)
│   │
│   ├── stores/                # Zustand stores
│   ├── types/                 # TypeScript 타입 정의
│   ├── utils/                 # 유틸리티 함수
│   ├── constants/             # 상수
│   ├── images/                # UI 컴포넌트용 이미지
│   └── stories/               # Storybook 스토리
│
├── public/                    # 정적 파일
│   ├── articles/              # 아티클 + 미디어 (핵심)
│   │   ├── 2025-retrospective/
│   │   │   ├── index.mdx
│   │   │   └── images/
│   │   │       ├── hero.webp
│   │   │       └── ...
│   │   ├── nextjs-optimization/
│   │   │   ├── index.mdx
│   │   │   └── images/
│   │   │       └── ...
│   │   └── [article-slug]/
│   │       ├── index.mdx
│   │       └── images/        # 아티클별 미디어
│   ├── assets/                # UI 리소스 (비권장)
│   └── ...
├── .storybook/               # Storybook 설정
└── CLAUDE.md                  # 이 파일
```

### 폴더 역할 설명

- **`app/`**: Next.js App Router 기반 페이지 및 레이아웃
- **`components/`**: 재사용 가능한 UI 컴포넌트
  - **폴더 구조** (복잡한 컴포넌트): Storybook, 테스트, 자식 컴포넌트, 훅, 유틸, 상수 등이 있을 때
    - `index.tsx`: 메인 컴포넌트
    - `stories.tsx`: Storybook 스토리
    - `constants.ts`: 컴포넌트 전용 상수
    - `hooks/`: 컴포넌트 전용 훅
    - `utils.ts`: 컴포넌트 전용 유틸리티
    - `components/`: 자식 컴포넌트들
  - **단일 파일** (간단한 컴포넌트): 위 조건들이 모두 해당되지 않을 때
    - `[ComponentName].tsx`: 순수 프레젠테이션 컴포넌트
- **`services/`**: 비즈니스 로직 및 데이터 처리
  - `api/`: API 클라이언트 및 엔드포인트
  - `hooks/`: React Query 등 데이터 페칭 hooks
- **`stores/`**: Zustand 전역 상태 관리
- **`types/`**: TypeScript 타입 및 인터페이스
- **`utils/`**: 순수 함수형 유틸리티
- **`constants/`**: 상수 및 설정값
- **`images/`**: UI 컴포넌트용 이미지 리소스
- **`stories/`**: Storybook 컴포넌트 스토리
- **`public/articles/`**: MDX 아티클 + 미디어 통합 관리 (**핵심 콘텐츠**)
  - 각 아티클 폴더 구조: `[slug]/index.mdx` + `[slug]/images/`
  - 한 곳에서만 관리하므로 중복 제거 및 유지보수 용이
  - Next.js가 자동으로 정적 파일 제공

---

## 🌐 페이지 라우트 경로

| 경로 | 설명 | 파일 위치 |
|---|---|---|
| `/` | 홈페이지 | `src/app/(routes)/page.tsx` |
| `/articles` | 포스트 리스트 (전체) | `src/app/(routes)/articles/page.tsx` |
| `/articles/[slug]` | 포스트 상세 페이지 | `src/app/(routes)/articles/[slug]/page.tsx` |
| `/articles?category=[category]` | 카테고리별 포스트 리스트 | `src/app/(routes)/articles/page.tsx` |

### 라우트 상수 관리
- **위치**: `src/constants/paths.ts`
- **사용**: 라우트 경로를 동적으로 생성하거나 참조할 때
- **예시**:
  ```typescript
  import { ROUTES } from '@/constants/paths'

  // 포스트 링크
  href={ROUTES.article('nextjs-optimization')}  // '/articles/nextjs-optimization'

  // 카테고리 페이지 (쿼리 파라미터)
  href={ROUTES.category('frontend')}            // '/articles?category=frontend'
  ```

---

## 🎨 코딩 컨벤션

### Naming Conventions

| 타입 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `BlogCard.tsx` |
| 함수/변수 | camelCase | `formatDate()`, `userName` |
| 상수 | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |
| 상수 객체 프로퍼티 | camelCase | `{ primary: "...", secondary: "..." }` |
| 폴더 | kebab-case | `blog-post/` |
| 타입/인터페이스 | PascalCase | `BlogPost`, `UserProfile` |
| Props 인터페이스 | [Component]Props | `BlogCardProps` |

### Export 규칙

- **모든 컴포넌트** (일반 컴포넌트, 페이지 포함): `export default function`
- **유틸 함수**: `named export` (`const fn = () => {}`)
- **타입/인터페이스**: `export type`, `export interface`

```typescript
// ✅ Good - 컴포넌트
export default function BlogCard({ ... }: BlogCardProps) { ... }

// ✅ Good - 페이지
export default function BlogPage() { ... }

// ✅ Good - 유틸
export const formatDate = (date: Date) => { ... }

// ❌ Bad - 컴포넌트
export const BlogCard = ({ ... }) => { ... }
```

### 함수 선언 방식

#### 컴포넌트 — `export default function`

- 파일 최상단에서 default export 대상을 즉시 식별 가능 (1 file = 1 component 원칙)
- `function` 키워드는 제네릭, 오버로드 등 TypeScript 타입 기능과의 호환성이 높음
- `displayName`이 함수명으로 자동 추론되어 React DevTools에서 디버깅 용이

#### 유틸 함수 — `const fn = () => {}`

- `const` 선언으로 의도치 않은 재할당 방지
- 화살표 함수는 반환 타입 추론이 명확하며, 타입 시그니처를 변수에 직접 주석처럼 붙일 수 있음
- 하나의 파일에 복수의 함수를 `named export`로 관리하는 유틸 파일 구조와 일관성 유지
- hoisting 불필요 — 유틸 함수는 선언 위치가 명확할수록 의존 관계 파악이 쉬움

### TypeScript 규칙

- **strict mode 활성화** (`tsconfig.json`에서 설정)
- **any 타입 사용 금지** (ESLint에서 error로 설정)
- **명시적 타입 정의**
- **미사용 변수 금지** (단, `_`로 시작하는 변수는 허용)
- **`interface`를 `type`보다 우선 사용** (유니온/교차 타입 등 `interface`로 표현 불가한 경우에만 `type` 사용)

#### React 타입 Import 규칙

React 타입을 사용할 때는 **직접 import**하여 번들 크기를 최적화합니다:

```typescript
// ✅ Good - 필요한 타입만 직접 import (tree-shaking 최적화)
import { KeyboardEvent, ChangeEvent, useEffect, useState } from "react"

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") searchArticles()
}

// ❌ Bad - 불필요한 React 네임스페이스 import (번들 크기 증가)
import React, { ChangeEvent, useEffect, useState } from "react"

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") searchArticles()
}

// ✅ Good - 타입만 필요한 경우 (layout.tsx 등)
import type React from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ...
}
```

**이유:**
- `React` 객체를 직접 import할 필요가 없음 (타입만 사용)
- 직접 import하면 tree-shaking이 더 효율적
- 코드도 더 간결해짐 (`React.KeyboardEvent` → `KeyboardEvent`)

```typescript
// ✅ Good
interface User {
  name: string
  age: number
  email?: string
}

const user: User = {
  name: 'John',
  age: 30
}

// ❌ Bad
const user: any = { ... }
```

### React 규칙

- **함수형 컴포넌트** 사용 (`export default function`)
- **Hooks 규칙** 준수
- **Props 구조 분해**
- **displayName 자동 추론** (`export default function ComponentName`으로 자동 설정)

```typescript
// ✅ Good
export default function BlogCard({ title, description }: BlogCardProps) {
  return <div>{title}</div>
}

// ❌ Bad
export const BlogCard = (props) => {
  return <div>{props.title}</div>
}
```

### Tailwind CSS 규칙 (스타일 분리)

- **@layer components**: 공통 스타일은 `globals.css`에 정의
- **variant 스타일**: 컴포넌트 내부 객체로 관리
- **반응형 모바일 퍼스트**: `sm:`, `md:`, `lg:` 사용
- **className prop (선택사항)**: 재사용성이 높거나 외부 스타일 주입이 필요한 경우에만 제공

#### 스타일 작성 방식

**1. 기본 스타일 - `src/app/globals.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply px-md py-sm rounded-xs font-medium transition-all duration-200;
  }

  .btn:hover {
    @apply opacity-90;
  }

  .card {
    @apply bg-bg-white rounded-md p-lg shadow-md;
  }
}
```

**2. Variant 스타일 - 컴포넌트 로직**
```typescript
// ✅ Good - Variant를 객체로 관리
export default function Button({
  variant = 'primary',
  className = '',  // 재사용성 높음: className 제공
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-primary-blue text-white hover:bg-blue-600',
    secondary: 'bg-gray-light text-text-primary hover:bg-gray-medium',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button className={`btn ${variantStyles[variant]} ${className}`} {...props} />
  )
}

// ✅ Good - 내부 전용 컴포넌트: className 불필요
export default function LoadingUI() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.1s' }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.2s' }} />
    </div>
  )
}

// ❌ Bad - 인라인 Tailwind 클래스 나열
export default function Button() {
  return <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600" />
}
```

**3. className prop 제공 기준**

| 상황 | className 제공 | 예시 |
|---|---|---|
| **재사용성 높음** | ✅ 제공 | Button, Card, Input |
| **구성 가능한 컴포넌트** | ✅ 제공 | Layout, Container, Wrapper |
| **내부 전용 컴포넌트** | ❌ 불필요 | LoadingUI, Badge, Icon |
| **고정된 스타일** | ❌ 불필요 | Alert, Spinner (고정 디자인) |

**4. 폴더 구조**
```sh
components/
├── Button/
│   ├── index.tsx        # 컴포넌트 + variant
│   └── stories.tsx      # Storybook
```

### Props 확장 규칙

네이티브 HTML 태그의 props를 받을 때는 **`React.ComponentProps`**를 사용합니다:

```typescript
// ✅ Good - React.ComponentProps 사용
interface SearchBarProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "className" | "type"  // 필요시 제외
> {
  customProp?: string;
  value: string;
}

// ❌ Bad - 명시적 props 나열만
interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  // ... 계속 추가해야함
}
```

**이유:**
- `ref` 등 React 시스템 props 지원
- HTML 속성이 추가되어도 자동 반영
- 타입 안전성 확보
- 사용자가 모든 native props 활용 가능

**제외 규칙:**
- 컴포넌트에서 관리하는 props (`value`, `onChange` 등): `Omit`으로 제외
- 고정된 props (`type="text"` 등): 제외 고려
- 대체되는 props (`className` → `customClassName` 등): 제외

### setState를 Props로 전달하지 않기

**원칙**: `setState` 함수를 props로 넘기거나 반환하지 않습니다. 상태 변경 책임을 명확히 합니다.

```typescript
// ❌ Bad - setState를 props로 전달
interface DropdownProps {
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// ❌ Bad - setState를 반환값으로 노출
const useMyHook = () => {
  const [count, setCount] = useState(0);
  return { count, setCount };  // setCount 노출 금지
};

// ✅ Good - 핸들러 함수로 상태 변경 캡슐화
interface DropdownProps {
  onOpenWithFocus: () => void;  // 의도를 명확히 하는 핸들러
  onClose: () => void;
}

// ✅ Good - 상태 변경 로직을 훅 내부에서 관리
const useMyHook = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };  // 행동만 노출
};
```

**이유:**
- **캡슐화**: 상태 변경 로직이 훅/컴포넌트 내부에 숨겨짐
- **의도 명확성**: `onOpenWithFocus()`는 "포커스와 함께 열기"를 명확히 표현
- **책임 분리**: 어디서 상태가 변경되는지 추적하기 쉬움
- **재사용성**: 다양한 상황에 맞게 핸들러를 구성 가능

### 상수 컨벤션

**기본 규칙**: `UPPER_SNAKE_CASE`
**객체 프로퍼티**: `camelCase`

객체 프로퍼티는 **소비자 API의 관례를 우선**합니다. Props 값으로 직접 사용되는 경우 camelCase를 유지하여 React 컴포넌트 생태계의 일반적인 관례(`variant="primary"`)와 일치시킵니다:

```typescript
// ✅ Good - 상수명 대문자, 프로퍼티는 camelCase
const VARIANT_CLASSES = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
} as const;

const RESPONSIVE_STYLES = {
  base: { size: 25, radius: 6 },
  "425px": { size: 30, radius: 7 },
  "600px": { size: 40, radius: 9 },
} as const;

const SOCIAL_LINKS: SocialLink[] = [
  { name: "github", href: "https://...", label: "GitHub 프로필" },
  { name: "linkedin", href: "https://...", label: "LinkedIn 프로필" },
];

// 컴포넌트에서 사용 (Props 값)
<Button variant="primary" />  // ✅ camelCase 유지
```

**이유:**
- React UI 컴포넌트 생태계의 일반적 관례 준수 (Material-UI, shadcn/ui 등)
- Props 값으로 직접 사용될 때 일관성 있는 API 제공
- 상수 식별자는 대문자로 명확히 구분

#### 📋 예외: 공식 문서 및 일반적 관례 따르는 경우

**공식 문서나 생태계의 일반적인 관례를 따르는 경우는 해당 관례를 우선합니다:**

```typescript
// ✅ Good - Storybook Meta 객체 (공식 문서 패턴)
import type { Meta } from "@storybook/react";

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;

// ✅ Good - Storybook 스토리 export (관례)
export const Default = { args: { ... } }
export const WithSearch = { args: { ... } }

// ✅ Good - Mock 데이터 (테스트 관례)
const mockArticles = [
  { id: 1, title: "Article 1", slug: "article-1" },
  { id: 2, title: "Article 2", slug: "article-2" },
]

// ✅ Good - React Query queryKey (TanStack 공식 권장)
const queryKey = ["articles", { category, sort }]

// ❌ Bad - 불필요한 대문자화
const META = { ... }              // 공식 문서에서 const meta 사용
const MOCK_ARTICLES = [...]       // Mock 데이터는 camelCase 관례
const QUERY_KEY = [...]           // React Query는 배열 변수명 camelCase
```

**기준:**
- 공식 문서(Storybook, React Query 등)에서 제시하는 예제 형식 따르기
- 생태계에서 널리 사용하는 관례를 존중하기
- "상수"라는 이유만으로 무조건 대문자화하지 않기

**예외 적용 영역:**
- Storybook 메타 데이터 및 스토리 export
- React Query queryKey, useMutation key 등
- Test framework에서 권장하는 패턴
- 라이브러리 공식 예제를 그대로 따르는 경우
- Mock 데이터, 테스트 픽처(fixtures)

---

### Tailwind 클래스 Props 네이밍 규칙

Props에 **Tailwind CSS 클래스명**을 전달할 때는 `TwClass` suffix를 사용합니다.
단, Props명이 CSS 속성명과 혼동될 가능성이 **없으면** 일반 `className`을 사용해도 됩니다:

#### Suffix 사용 기준

**🔴 `TwClass` suffix 필수** — Props명이 CSS 속성명과 혼동 가능한 경우:

```typescript
// ❌ Bad - CSS 속성명으로 혼동 가능
interface Props {
  height: string;        // CSS height 속성인가?
  width: string;         // CSS width 속성인가?
  className: string;     // className 속성인가?
}

// ✅ Good - TwClass suffix로 명확히
interface LoadingFallbackProps {
  heightTwClass: string;      // "h-96", "h-80" 등 (명확함)
  widthTwClass?: string;      // "w-full", "w-96" 등 (명확함)
  customTwClass?: string;     // 커스텀 Tailwind 클래스 (명확함)
}

export default function LoadingFallback({
  heightTwClass = "h-96",
  widthTwClass = "w-full",
  customTwClass,
}: LoadingFallbackProps) {
  return (
    <div className={`relative ${heightTwClass} ${widthTwClass} ${customTwClass ?? ''} flex items-center justify-center`}>
      {/* ... */}
    </div>
  )
}
```

**🟢 일반 `className` 사용 가능** — Props명이 명확한 경우:

```typescript
// ✅ Good - Props명이 명확하면 className으로 충분
interface ArticleCardProps {
  article: ArticleCardData;
  className?: string;    // 컴포넌트 wrapper의 추가 스타일
}

export default function ArticleCard({
  article,
  className = "",
}: ArticleCardProps) {
  return (
    <div className={`card-container ${className}`}>
      {/* ... */}
    </div>
  )
}

// ✅ Good - React.ComponentProps 상속도 OK
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",  // native button prop
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
```

**이유:**
- `TwClass` suffix로 "이건 Tailwind 클래스다"를 명시적으로 표현
- CSS `style` prop의 속성명(`height`, `width` 등)과의 혼동 방지
- Props명이 이미 명확하면 굳이 suffix를 붙일 필요 없음
- 항상 유효한 Tailwind 클래스명만 전달되도록 강제

---

## 🚀 Claude Code Skills 사용법

### 검토 Skills 
### 검토 Skills 

#### 1. PM Review
```bash
/pm-review

이 3개 기능 중 우선순위를 정해줘:
1. 댓글 시스템
2. 사용자 북마크
3. 추천 글 알고리즘
```

**용도**: 기능 우선순위, 비즈니스 가치 분석, 로드맵 수립

#### 2. Code Review
#### 2. Code Review
```bash
/code-review
/code-review

src/components/Button/index.tsx 코드를 리뷰해줘
src/components/Button/index.tsx 코드를 리뷰해줘
```

**용도**: CodeRabbit 기반 코드 품질(타입, 네이밍, export 규칙), 구조(컴포넌트 분리), 스타일(Tailwind), 기능(엣지 케이스), 성능, 보안(XSS/CSRF) 검토
**⚠️ 접근성(WCAG)은 제외** → `/ux-review` 참고
**용도**: CodeRabbit 기반 코드 품질(타입, 네이밍, export 규칙), 구조(컴포넌트 분리), 스타일(Tailwind), 기능(엣지 케이스), 성능, 보안(XSS/CSRF) 검토
**⚠️ 접근성(WCAG)은 제외** → `/ux-review` 참고

#### 3. UX Review
#### 3. UX Review
```bash
/ux-review
/ux-review

BlogCard 컴포넌트의 UX와 접근성을 검토해줘.
BlogCard 컴포넌트의 UX와 접근성을 검토해줘.
```

**용도**: 사용자 경험, WCAG 2.1 접근성, 모바일 UX
**용도**: 사용자 경험, WCAG 2.1 접근성, 모바일 UX

---

### 자동화 Skills
### 자동화 Skills

#### 4. Create PR (PR 본문 작성)
#### 4. Create PR (PR 본문 작성)
```bash
/create-pr
```

**용도**: 브랜치명에서 이슈 번호 추출 + 커밋 내역 기반 PR 제목·본문 작성 후 출력

#### 5. Design to Code
#### 5. Design to Code
```bash
/design-to-code

Figma URL: [링크]
컴포넌트명: BlogCard
```

**용도**: Figma → React 컴포넌트 자동 생성

---

## 🌿 브랜치 & 이슈 컨벤션

### 커밋/이슈 타입

| 타입 | 설명 |
|---|---|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README, CLAUDE.md 등) |
| `style` | 코드 포맷팅, 스타일 변경 (기능 변경 없음) |
| `refactor` | 코드 리팩토링 (기능 변경 없음) |
| `ci` | CI/CD, 빌드, 설정 파일 변경 |
| `chore` | 패키지 설치, 기타 잡무 |
| `test` | 테스트 코드 추가/수정 |

### 커밋 시 지켜야하는 규칙
- 커밋 메세지에서 클로드를 협업자로 추가하지 않는다. (Co-Authored-By: Claude ~ 와 같은 내용을 추가하지 않는다. )


### 브랜치명 컨벤션

#### Feature 브랜치
```sh
타입/이슈번호-작업-설명
```

```bash
# 예시
feat/6-mdx-infra
feat/7-blog-list-page
fix/12-card-thumbnail-error
docs/3-claude-code-design-setting
```

#### Article 브랜치
```sh
article/yy-mm-title
```

```bash
# 예시
article/26-03-ai-techblog-responsibility-over-speed
article/26-02-nextjs-optimization-guide
article/26-01-react-performance-tips
```

### 이슈 제목 컨벤션

```sh
타입: 이슈 작업 내용
```

```sh
# 예시
feat: MDX 인프라 구축
feat: 블로그 리스트 페이지 구현
fix: BlogCard 썸네일 이미지 오류 수정
```

### 브랜치 전략

#### 브랜치 구조

```
main (기준점, 코드 변경 관리)
  ├── feature/* → main PR → release 머지 (코드/기능 변경)
  └── article/* → release PR 직접 (마크다운 아티클 추가)

release (배포 브랜치, Vercel production)
```

#### 브랜치 역할

| 브랜치 | 역할 | PR 방향 | 설명 |
|--------|------|--------|------|
| `main` | 기준점 | feature/* → main | 코드 변경 관리, 배포 전 최종 검증 |
| `release` | 배포 브랜치 | main → release / article/* → release | Vercel production 배포 |
| `feature/*` | 기능 개발 | → main | 기능 추가, 버그 수정, 리팩토링 |
| `article/*` | 콘텐츠 추가 | → release 직접 | 마크다운 아티클만 추가 (코드 변경 금지) |

#### article 브랜치 전략

- **브랜치 생성**: `main`에서 브랜치 생성 → 최신 코드 상태 기준 보장
- **PR 대상**: `release`로 직접 PR (코드 변경 없이 콘텐츠만 반영)
- **허용 파일**: 마크다운 파일만 추가 (코드 변경 시 `feature/*` 사용)
- **브랜치 관리**: 짧게 유지하여 충돌 방지

#### 워크플로우 예시

**코드 변경 (feature 브랜치):**
```bash
git checkout -b feature/8-article-detail-page
# 기능 구현...
git push origin feature/8-article-detail-page
# → main으로 PR
# → main 머지 후 release로 자동 배포
```

**아티클 추가 (article 브랜치):**
```bash
git checkout -b article/nextjs-optimization
# 마크다운 파일만 추가
git push origin article/nextjs-optimization
# → release로 직접 PR (코드 리뷰 불필요)
# → release 머지 후 즉시 배포
```

## 🎯 개발 원칙

### 1. 사용자 우선
- 모든 기능은 사용자 가치를 먼저 고려
- 접근성(WCAG 2.1 AA) 필수 준수
- 모바일 퍼스트 반응형 디자인

### 2. 성능 최적화
- Next.js Image 컴포넌트 사용
- 코드 스플리팅 (동적 import)
- React.memo, useMemo, useCallback 적절히 사용
- 번들 크기 모니터링

### 3. 코드 품질
- TypeScript strict mode 활성화
- any 타입 사용 금지 (ESLint error 설정)
- ESLint 규칙 100% 준수
- Prettier 자동 포맷팅 (import 정렬 포함)

### 4. 보안
- 환경 변수로 민감 정보 관리
- XSS, CSRF 방지
- HTTPS 강제
- 정기 보안 검토

### 5. 유지보수성
- 명확한 네이밍
- 적절한 주석 (복잡한 로직만)
- 컴포넌트 재사용성
- 문서화 (Storybook)

---

## 🔧 자주 사용하는 명령어

### 개발
```bash
yarn dev              # 개발 서버
yarn build            # 프로덕션 빌드
yarn start            # 프로덕션 서버
yarn storybook        # Storybook 개발 서버
yarn build-storybook  # Storybook 빌드
```

### 코드 품질
```bash
yarn lint            # ESLint 검사 (Next.js)
yarn format          # Prettier 포맷팅
yarn format:check    # Prettier 검사
```

### TypeScript
```bash
# TypeScript 타입 체크는 빌드 시 자동 실행
yarn build           # 프로덕션 빌드 (타입 체크 포함)
```

---

## 📚 참고 문서

### 공식 문서
- [Next.js](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

### 접근성
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### 보안
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

---

## 🔧 ESLint & Prettier 설정

### ESLint 플러그인
- `@typescript-eslint` - TypeScript 린팅
- `next/core-web-vitals` - Next.js 권장 규칙
- `plugin:storybook/recommended` - Storybook 규칙
- `@typescript-eslint/no-explicit-any: error` - any 타입 사용 금지

### Prettier 플러그인
- `@ianvs/prettier-plugin-sort-imports` - import 자동 정렬
- `prettier-plugin-tailwindcss` - Tailwind 클래스 자동 정렬

---

## 💡 Tips

### Skill 사용 팁
1. **기능 기획**: `/pm-review`로 우선순위와 비즈니스 가치 분석
2. **코드 리뷰**: `/code-review`로 CodeRabbit 규칙 기반 코드 품질 + 구조 + 성능 + 보안 검토
3. **UX/접근성**: `/ux-review`로 WCAG 준수 여부 검증
4. **Figma 구현**: `/design-to-code`로 컴포넌트 자동 생성
5. **PR 작성**: `/create-pr`로 커밋 기반 PR 자동 생성

1. **기능 기획**: `/pm-review`로 우선순위와 비즈니스 가치 분석
2. **코드 리뷰**: `/code-review`로 CodeRabbit 규칙 기반 코드 품질 + 구조 + 성능 + 보안 검토
3. **UX/접근성**: `/ux-review`로 WCAG 준수 여부 검증
4. **Figma 구현**: `/design-to-code`로 컴포넌트 자동 생성
5. **PR 작성**: `/create-pr`로 커밋 기반 PR 자동 생성


### 주의사항
- Skills는 **도구**일 뿐, 최종 판단은 개발자 몫
- 자동 생성 코드는 **반드시 검토** 후 사용
- 보안 검토는 **정기적으로** 수행 (최소 월 1회)

---

## ✅ Claude Code 협업 원칙

### 수정 전 승인 프로세스
Claude Code는 **파일 수정이 필요한 경우**, 다음 프로세스를 반드시 거칩니다:

1. **변경 사항 요약**: 수정할 파일, 위치, 변경 내용을 **간단히 채팅창에 먼저 설명**
   - 파일명 명시
   - 변경 전/후 주요 내용
   - 한두 문장으로 간결하게
2. **이유 설명**: 왜 이렇게 수정하는 것이 필요한지 근거 제시
3. **승인 대기**: 사용자의 명시적 승인(동의) 없이 수정하지 않음
4. **수정 실행**: 승인 후에만 파일 수정 진행

**예시:**
```markdown
❌ 좋지 않은 예:
- 사용자의 명시적 승인 없이 파일 자동 수정

✅ 좋은 예:
1. ".coderabbit.yaml의 high_level_summary_instructions 섹션을
   더 간결하게 수정하고 싶습니다.
   현재 10가지 항목을 9가지 핵심 항목으로 단축하고,
   포맷을 불릿 리스트로 변경합니다."
2. "이유는 리뷰가 더 빠르고 명확해지기 위함입니다"
3. 사용자가 "적용해줘" 등으로 승인
4. 그 후 파일 수정 진행
```

### 예외 상황
**승인 없이 즉시 수정 가능한 경우:**
- 사용자가 명시적으로 지시한 작업 (예: "이 파일 수정해줘")
- 자동 수정 도구 실행 (yarn format, yarn lint --fix)
- 긴급 버그 수정 (보안 취약점 등)
- 명백한 오타/문법 오류

---

## 🚨 문제 해결

### Claude Code 관련
- Skills가 작동하지 않으면: `.claude/skills/` 폴더 확인
- Skill 파일은 마크다운 형식 (`.md`)
- `/skill-name` 형식으로 호출

### 개발 환경
- TypeScript 에러: `yarn build` (타입 체크 포함)
- ESLint 에러: `yarn lint`
- Prettier 포맷팅: `yarn format`
- Prettier 검사: `yarn format:check`

---

**Last Updated**: 2026-02-18
**Version**: 1.1.0
