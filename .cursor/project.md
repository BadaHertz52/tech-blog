# 기술 블로그 프로젝트 - 기술 스택 및 코드 컨벤션

## 📚 기술 스택

### 프레임워크 & 빌드 도구

- **Next.js**: App Router 사용
- **Vite**: Storybook 빌드 도구
- **Vercel**: 배포 플랫폼

### 상태 관리

- **TanStack Query (React Query)**: 서버 상태 관리 및 데이터 페칭
- **Zustand**: 클라이언트 전역 상태 관리

### 스타일링

- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Figma → Tailwind CSS 플러그인**: 디자인을 Tailwind CSS로 변환

### 백엔드 & API

- **Notion API**: 콘텐츠 관리 및 데이터 소스

### 인증

- **GitHub OAuth**: 로그인 인증

### 개발 도구

- **ESLint**: 코드 린팅
- **Prettier**: 코드 포맷팅
- **Storybook**: 컴포넌트 테스트 및 문서화

---

## 🎯 코드 컨벤션

### 파일 및 폴더 구조

```
src/app/
  ├── layout.tsx                    # 루트 레이아웃
  ├── page.tsx                       # 홈 페이지
  ├── api/                           # API 라우트
  │   └── auth/
  │       └── [...nextauth]/
  ├── blog/
  │   ├── [slug]/
  │   │   ├── page.tsx               # 블로그 글 상세 페이지
  │   │   ├── _components/           # 페이지 전용 컴포넌트
  │   │   │   └── BlogPostContent.tsx
  │   │   ├── _hooks/                # 페이지 전용 훅
  │   │   │   └── useBlogPost.ts
  │   │   └── _utils/                # 페이지 전용 유틸
  │   │       └── formatContent.ts
  │   └── page.tsx                   # 블로그 목록 페이지 (선택사항)
  └── //....

src/
  ├── app/
  ├── components/                    # 공통 컴포넌트
  ├── constants/                     # 공통 상수
  ├── images/                        # 이미지 파일 관리
  ├── services/                      # API 및 데이터 페칭
  │   ├── api/                       # API 메서드
  │   │   ├── blog.ts                # 블로그 관련 API
  │   │   └── auth.ts                # 인증 관련 API
  │   ├── endpoints.ts               # API 엔드포인트 정의
  │   └── hooks/                     # React Query 커스텀 훅
  │       ├── useBlogPosts.ts
  │       └── useBlogPost.ts
  ├── stories/                        # Storybook 파일
  ├── stores/                        # Zustand 스토어
  │   ├── useAuthStore.ts
  │   └── useUIStore.ts
  ├── types/                         # TypeScript 타입 정의
  └── utils/                         # 공통 유틸리티 함수
```

**폴더 구조 규칙:**

1. **페이지별 컴포넌트/훅 관리**
   - 특정 페이지나 하위 페이지에서만 사용하는 컴포넌트, 훅, 유틸은 해당 페이지 폴더 내에서 관리
   - Next.js 라우터에 잡히지 않도록 폴더명 앞에 `_` 접두사 사용
   - 예: `_components/`, `_hooks/`, `_utils/`

2. **공통 리소스 관리**
   - `src/components/`: 여러 페이지에서 재사용되는 공통 컴포넌트 및 Storybook 스토리 파일
   - `src/constants/`: 애플리케이션 전역에서 사용하는 상수
   - `src/images/`: SVG 아이콘 및 이미지 파일
   - `src/services/`: API 메서드, 엔드포인트, React Query 커스텀 훅
   - `src/stories/`: Storybook 스토리 파일
   - `src/stores/`: Zustand 전역 상태 관리 스토어
   - `src/types/`: TypeScript 타입 정의
   - `src/utils/`: 공통 유틸리티 함수

3. **페이지 구성**
   - 홈 페이지: `app/page.tsx`
   - 블로그 글 상세 페이지: `app/blog/[slug]/page.tsx`
   - 내 개인 프로필 페이지: `app/profile/page.tsx`

### 네이밍 컨벤션

- **컴포넌트**: PascalCase (예: `BlogPost.tsx`, `UserProfile.tsx`)
- **파일명**: 컴포넌트는 PascalCase, 유틸리티는 camelCase
- **폴더명**: kebab-case (예: `blog-post/`, `user-profile/`)
- **변수/함수**: camelCase (예: `getBlogPosts`, `userData`)
- **상수**: UPPER_SNAKE_CASE (예: `API_BASE_URL`, `MAX_POSTS`)
- **타입/인터페이스**: PascalCase (예: `BlogPost`, `UserProfile`)

### React 컴포넌트

```typescript
// ✅ 좋은 예시
interface BlogPostProps {
  title: string;
  content: string;
  publishedAt: Date;
}

export function BlogPost({ title, content, publishedAt }: BlogPostProps) {
  return (
    <article className="rounded-lg border p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 text-gray-600">{content}</p>
      <time className="mt-2 text-sm text-gray-400">
        {publishedAt.toLocaleDateString()}
      </time>
    </article>
  );
}
```

**컴포넌트 작성 규칙:**

- 함수형 컴포넌트 사용
- Props는 인터페이스로 타입 정의

**Export 규칙:**

- Next.js의 export 규칙을 적용받는 컴포넌트(`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` 등)는 `export default` 사용
- 그 외의 일반 React 컴포넌트는 **named export** 방식 사용

```typescript
// ✅ Next.js 특수 파일 - export default 필수
// app/page.tsx
export default function HomePage() {
  return <div>Home</div>;
}

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// ✅ 일반 컴포넌트 - named export 사용
// src/components/BlogPost.tsx
export function BlogPost({ title }: { title: string }) {
  return <article>{title}</article>;
}

// 사용
import { BlogPost } from "@/components/BlogPost";
```

### Zustand 스토어

**Zustand 규칙:**

- 스토어는 `src/stores/` 디렉토리에 위치
- 파일명은 `use[StoreName]Store.ts` 형식
- 필요한 경우 미들웨어 사용
- 타입은 인터페이스로 명확히 정의

### Tailwind CSS 스타일링

**Tailwind CSS 규칙:**

- 반복되는 스타일은 컴포넌트로 추출
- 커스텀 색상/스페이싱은 `tailwind.config.js`에서 정의
- 반응형 디자인은 모바일 퍼스트 접근

### TypeScript

**TypeScript 규칙:**

- 모든 타입은 명시적으로 정의
- `any` 타입 사용 금지, `unknown` 사용 권장
- 인터페이스는 `src/types/` 디렉토리에 모음
- 유틸리티 타입 적극 활용 (`Pick`, `Omit`, `Partial` 등)

**타입 정의:**

- `interface`를 `type`보다 우선적으로 사용
- 객체 타입, 확장 가능한 타입은 `interface` 사용
- 유니온 타입, 교차 타입 등 복잡한 타입만 `type` 사용

```typescript
// ✅ 좋은 예시 - interface 우선 사용
interface BlogPost {
  id: string;
  title: string;
  content: string;
}

interface BlogPostWithAuthor extends BlogPost {
  author: Author;
}

// ✅ type은 복잡한 타입에만 사용
type BlogPostStatus = "draft" | "published" | "archived";
type BlogPostWithStatus = BlogPost & { status: BlogPostStatus };
```

**초기값 처리:**

- 상태나 변수의 초기값이 없을 경우 `undefined`를 명시적으로 사용
- `null`과 `undefined`를 구분하여 사용

```typescript
// ✅ 좋은 예시 - undefined 명시
const [user, setUser] = useState<User | undefined>(undefined);
let selectedPost: BlogPost | undefined = undefined;

// ❌ 나쁜 예시 - 초기값 생략
const [user, setUser] = useState<User>(); // 타입이 명확하지 않음
let selectedPost: BlogPost; // 초기화되지 않은 변수
```

### 테스트 (Storybook)

**Storybook 규칙:**

- 모든 재사용 가능한 컴포넌트는 Storybook 스토리 작성
- 다양한 상태와 props 조합 테스트
- 스토리 파일은 컴포넌트와 같은 디렉토리에 위치 (예: `Button.tsx`와 `Button.stories.tsx`)
- 공통 컴포넌트는 `src/components/` 디렉토리에 위치

### 코드 포맷팅 및 린팅

- **Prettier**: 자동 포맷팅 적용
- **ESLint**: 코드 품질 검사
- 커밋 전 자동 포맷팅 및 린트 검사 권장

**코드 정렬 규칙:**

- Import 문은 일관된 순서로 정렬 (외부 라이브러리 → 내부 모듈 → 타입)
- CSS 속성(Tailwind 클래스)은 일관된 순서로 정렬 (레이아웃 → 스타일 → 상태)
- Prettier 설정을 통해 자동 정렬 적용 권장

```typescript
// ✅ 좋은 예시 - Import 정렬
// 1. 외부 라이브러리
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. 내부 모듈
import { BlogPost } from "@/components/BlogPost";
import { getBlogPosts } from "@/services/api/blog";

// 3. 타입
import type { BlogPost as BlogPostType } from "@/types/blog";
```

```typescript
// ✅ 좋은 예시 - Tailwind 클래스 정렬
// 레이아웃 → 스타일 → 상태 순서
<div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">제목</h2>
</div>
```

### Git 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
ci: 프로젝트 환경 설정, 빌드 업무 수정, 패키지 매니저 설정 등
chore: 기타 업무

```

---
