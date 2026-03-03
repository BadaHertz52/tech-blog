"use client";

import type { Meta, StoryObj } from "@storybook/react";

import MDXContent from ".";

const meta = {
  title: "Components/MDXContent",
  component: MDXContent,
  tags: ["autodocs"],
} satisfies Meta<typeof MDXContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// 1. Typography (제목 & 문단)
// ============================================
const typographySource = `
## 섹션 제목 (h2)

이것은 일반 문단입니다. 어떤 기술적 개념을 설명하는 여러 문장으로 이루어진 문단입니다.
기술 블로그에서는 보통 이런 식으로 긴 문단이 나타납니다. 읽기 쉬운 길이의 문단을 작성하는 것이 좋습니다.

### 소제목 (h3)

더 세부적인 내용을 다룹니다. 이 섹션에서는 특정 주제를 깊이 있게 설명합니다.

#### 세부 제목 (h4)

매우 구체적인 내용입니다. 최하위 제목 레벨입니다.

또 다른 일반 문단입니다. 여러 문장으로 이루어진 본문 텍스트를 렌더링합니다.
`;

// ============================================
// 2. Inline Code (인라인 코드)
// ============================================
const inlineCodeSource = `
## 인라인 코드 테스트

이 문단에는 인라인 코드 \`const x = 1\`이 포함되어 있습니다.
더 많은 텍스트 \`function hello() {}\`와 함께 문장을 이루고 있습니다.

변수명 \`userName\`과 함수 \`fetchData()\`도 있습니다.
복잡한 표현식 \`array.map(item => item.id)\`도 렌더링될 수 있습니다.
`;

// ============================================
// 3. Code Blocks (모든 언어)
// ============================================
const codeBlocksSource = `
## TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};
\`\`\`

## JavaScript

\`\`\`javascript
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
\`\`\`

## JSX

\`\`\`jsx
export default function Button({ children, onClick }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
      {children}
    </button>
  );
}
\`\`\`

## HTML

\`\`\`html
<!-- HTML - 마크업 -->
<div class="container">
  <header class="header">
    <h1>My Blog</h1>
  </header>
  <main>Content here</main>
</div>
\`\`\`

## CSS

\`\`\`css
/* CSS - 스타일 */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    font-size: 14px;
  }
}
\`\`\`

## Bash

\`\`\`bash
# Bash - 커맨드
yarn install
yarn dev
git commit -m "feat: add new feature"
\`\`\`

## JSON

\`\`\`json
{
  "name": "tech-blog",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
\`\`\`

## Markdown

\`\`\`markdown
# Markdown - 문서

## 섹션

- 리스트 아이템 1
- 리스트 아이템 2

**굵은 텍스트** and *이탤릭*

[링크](https://example.com)
\`\`\`
`;

// ============================================
// 4. Lists (순서 있음/없음, 중첩)
// ============================================
const listsSource = `
## 순서 없는 리스트 (Unordered List)

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목
  - 중첩된 첫 번째
  - 중첩된 두 번째
    - 더 깊이 있는 항목
- 네 번째 항목

## 순서 있는 리스트 (Ordered List)

1. 첫 번째 단계
2. 두 번째 단계
3. 세 번째 단계
   1. 상세 단계 1
   2. 상세 단계 2
4. 네 번째 단계
`;

// ============================================
// 5. Blockquote (인용문)
// ============================================
const blockquoteSource = `
## 인용문 테스트

> 이것은 인용문입니다.
> 여러 줄로 이루어진 중요한 인용문입니다.

일반 문단이 있고 다시 인용문이 나올 수 있습니다.

> **중요한 팁**: 인용문은 강조하고 싶은 내용을 표현합니다.
> Props는 항상 명시적으로 타입을 정의하세요.

> 또 다른 인용문입니다.
`;

// ============================================
// 6. Table (테이블)
// ============================================
const tableSource = `
## 테이블 렌더링

| 언어 | 용도 | 복잡도 |
|------|------|--------|
| TypeScript | 타입 안전성 | 높음 |
| JavaScript | 동적 스크립팅 | 낮음 |
| CSS | 스타일링 | 중간 |
| HTML | 마크업 | 낮음 |

## 많은 컬럼을 가진 테이블

| 기능 | 상태 | 우선순위 | 담당자 | 기한 |
|------|------|---------|--------|------|
| 로그인 | 완료 | 높음 | Alice | 2024-01-15 |
| 댓글 | 진행중 | 중간 | Bob | 2024-02-01 |
| 검색 | 대기 | 낮음 | Charlie | 2024-02-15 |
`;

// ============================================
// 7. Links (링크)
// ============================================
const linksSource = `
## 링크 테스트

이것은 [외부 링크](https://example.com)와 [GitHub 링크](https://github.com)를 포함한 문단입니다.

또한 [긴 링크 텍스트를 가진 링크](https://www.example.com/very/long/path/to/a/resource)도 있습니다.

문장 중간에 [링크](https://example.com)가 있을 수 있고, 문장 끝에도 있을 수 있습니다.

여러 개의 [링크1](https://example.com), [링크2](https://github.com), [링크3](https://example.com)를 한 문장에 포함할 수 있습니다.
`;

// ============================================
// 8. Long Code Block (수평 스크롤)
// ============================================
const longCodeSource = `
## 장문의 코드 블록 (수평 스크롤 테스트)

\`\`\`typescript
// 매우 긴 코드 블록 - 수평 스크롤 확인용
interface ComplexDataStructure {
  id: string;
  name: string;
  description: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    author: string;
    tags: string[];
  };
  configuration: {
    isActive: boolean;
    settings: Record<string, unknown>;
    permissions: string[];
  };
}

const processLargeDataset = async (
  data: ComplexDataStructure[],
  options: { filter?: boolean; sort?: string; limit?: number } = {}
): Promise<ComplexDataStructure[]> => {
  let result = data;

  if (options.filter) {
    result = result.filter((item) => item.metadata.author !== '');
  }

  if (options.sort) {
    result = result.sort((a, b) =>
      a.metadata.createdAt.getTime() - b.metadata.createdAt.getTime()
    );
  }

  if (options.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
};
\`\`\`
`;

// ============================================
// 9. Invalid Language (하이라이팅 실패 처리)
// ============================================
const invalidLanguageSource = `
## 존재하지 않는 언어 (Fallback 테스트)

아래 코드 블록은 존재하지 않는 언어이므로 하이라이팅이 실패하고 원본 텍스트로 렌더링됩니다.

\`\`\`unknownlanguage
This is code in an unknown language format.
highlight.js will not recognize it and will show plaintext.
const x = 1;
function hello() {}
\`\`\`

하이라이팅 실패 후에도 정상적으로 다른 컨텐츠가 렌더링되는지 확인합니다.
`;

// ============================================
// 10. Mixed Content (실제 글처럼 혼합)
// ============================================
const mixedContentSource = `
## React 컴포넌트 개발 가이드

React 컴포넌트를 효율적으로 개발하기 위해 다음 단계를 따르세요:

### 개발 프로세스

1. 컴포넌트 구조 설계
2. Props 인터페이스 정의
3. 상태 관리 설계
4. UI 구현
5. 테스트 작성

### 기본 컴포넌트 예제

다음은 버튼 컴포넌트의 기본 구현입니다:

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button onClick={onClick} className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}
\`\`\`

### 주요 포인트

> **팁**: Props는 항상 명시적으로 타입을 정의하세요.

핵심 개념:

- Props를 구조 분해로 받기
- 기본값 설정하기
- Tailwind 클래스 조합하기

### 상태 관리

상태를 효율적으로 관리하는 방법:

\`\`\`typescript
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

더 복잡한 상태는 \`useReducer\` 또는 \`Zustand\`를 사용합니다.

| 상태 라이브러리 | 용도 | 복잡도 |
|----------------|------|--------|
| useState | 간단한 상태 | 낮음 |
| useReducer | 복잡한 상태 로직 | 중간 |
| Zustand | 전역 상태 | 중간 |
| Context API | 테마 등 전역 값 | 낮음 |

이제 [공식 문서](https://react.dev)를 참고하여 더 깊이 있게 학습하세요.
`;

// ============================================
// Stories
// ============================================

export const Typography: Story = {
  args: {
    source: typographySource,
    headings: [],
  },
};

export const InlineCode: Story = {
  args: {
    source: inlineCodeSource,
    headings: [],
  },
};

export const CodeBlocks: Story = {
  args: {
    source: codeBlocksSource,
    headings: [],
  },
};

export const Lists: Story = {
  args: {
    source: listsSource,
    headings: [],
  },
};

export const Blockquote: Story = {
  args: {
    source: blockquoteSource,
    headings: [],
  },
};

export const Table: Story = {
  args: {
    source: tableSource,
    headings: [],
  },
};

export const Links: Story = {
  args: {
    source: linksSource,
    headings: [],
  },
};

export const LongCodeBlock: Story = {
  args: {
    source: longCodeSource,
    headings: [],
  },
};

export const InvalidLanguage: Story = {
  args: {
    source: invalidLanguageSource,
    headings: [],
  },
};

export const MixedContent: Story = {
  args: {
    source: mixedContentSource,
    headings: [],
  },
};
