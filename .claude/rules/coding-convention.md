# 코딩 컨벤션

> `CLAUDE.md`에서 참조되는 상세 규칙 문서. UI 디자인 관련 규칙은 `.claude/docs/design.md` 참고.

## Naming Conventions

| 타입 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `BlogCard.tsx` |
| 함수/변수 | camelCase | `formatDate()`, `userName` |
| 상수 | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |
| 상수 객체 프로퍼티 | camelCase | `{ primary: "...", secondary: "..." }` |
| 폴더 | kebab-case | `blog-post/` |
| 타입/인터페이스 | PascalCase | `BlogPost`, `UserProfile` |
| Props 인터페이스 | [Component]Props | `BlogCardProps` |

## Export 규칙

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

## 함수 선언 방식

### 컴포넌트 — `export default function`

- 파일 최상단에서 default export 대상을 즉시 식별 가능 (1 file = 1 component 원칙)
- `function` 키워드는 제네릭, 오버로드 등 TypeScript 타입 기능과의 호환성이 높음
- `displayName`이 함수명으로 자동 추론되어 React DevTools에서 디버깅 용이

### 유틸 함수 — `const fn = () => {}`

- `const` 선언으로 의도치 않은 재할당 방지
- 화살표 함수는 반환 타입 추론이 명확하며, 타입 시그니처를 변수에 직접 주석처럼 붙일 수 있음
- 하나의 파일에 복수의 함수를 `named export`로 관리하는 유틸 파일 구조와 일관성 유지
- hoisting 불필요 — 유틸 함수는 선언 위치가 명확할수록 의존 관계 파악이 쉬움

## TypeScript 규칙

- **strict mode 활성화** (`tsconfig.json`에서 설정)
- **any 타입 사용 금지** (ESLint에서 error로 설정)
- **명시적 타입 정의**
- **미사용 변수 금지** (단, `_`로 시작하는 변수는 허용)
- **`interface`를 `type`보다 우선 사용** (유니온/교차 타입 등 `interface`로 표현 불가한 경우에만 `type` 사용)

### React 타입 Import 규칙

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

## React 규칙

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

## Tailwind CSS 규칙 (스타일 분리)

- **@layer components**: 공통 스타일은 `globals.css`에 정의
- **variant 스타일**: 컴포넌트 내부 객체로 관리
- **반응형 모바일 퍼스트**: `sm:`, `md:`, `lg:` 사용
- **className prop (선택사항)**: 재사용성이 높거나 외부 스타일 주입이 필요한 경우에만 제공

### 스타일 작성 방식

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

## Props 확장 규칙

네이티브 HTML 태그의 props를 받을 때는 **`ComponentProps`**(react에서 직접 import)를 사용합니다:

```typescript
// ✅ Good - ComponentProps 직접 import
import type { ComponentProps } from "react"

interface SearchBarProps extends Omit<
  ComponentProps<"input">,
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

## setState를 Props로 전달하지 않기

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

## 상수 컨벤션

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

### 📋 예외: 공식 문서 및 일반적 관례 따르는 경우

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

## Tailwind 클래스 Props 네이밍 규칙

Props에 **Tailwind CSS 클래스명**을 전달할 때는 `TwClass` suffix를 사용합니다.
단, Props명이 CSS 속성명과 혼동될 가능성이 **없으면** 일반 `className`을 사용해도 됩니다:

### Suffix 사용 기준

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

// ✅ Good - ComponentProps 상속도 OK (직접 import)
import type { ComponentProps, ReactNode } from "react"

interface ButtonProps extends ComponentProps<"button"> {
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
