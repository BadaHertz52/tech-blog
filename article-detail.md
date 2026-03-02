# 작업 계획서: 블로그 상세 페이지 구현

## Context
`/articles/[slug]` 상세 페이지의 골격은 존재하나 스타일 없이 비어있음.
MDX 렌더링, TOC, 공유 버튼, 이전/다음 글 네비게이션을 추가 구현해야 함.

---

## 기존 코드 활용

| 재사용 대상 | 경로 |
|---|---|
| `getArticleBySlug()` | `src/utils/mdx.ts:105` |
| `getAdjacentArticles()` | `src/utils/mdx.ts:127` |
| `getAllArticles()` | `src/utils/mdx.ts:79` |
| `resolveArticleImagePath()` | `src/utils/article.ts` |
| `ROUTES.article()` | `src/constants/paths.ts` |
| `CATEGORY_LABELS` | `src/constants/article.ts` |
| `AdjacentPosts`, `ArticleCardData` 타입 | `src/types/article.ts` |

---

## 구현 범위

### 1. 패키지 설치
```bash
yarn add rehype-highlight highlight.js
```

### 2. MDX 렌더링 강화
- `src/app/(routes)/articles/[slug]/page.tsx` 수정
- `MDXRemote`에 `rehype-highlight` 플러그인 추가
- `globals.css`에 highlight.js 테마 import (github-dark 등)

### 3. TOC 컴포넌트 (폴더 구조)
**`src/components/TableOfContents/`**
- `index.tsx`: 클라이언트 컴포넌트 (`"use client"`)
  - Props: `headings: TocHeading[]`
  - `IntersectionObserver`로 현재 섹션 활성화
  - 좌측 sticky 고정 레이아웃
- `types.ts`: `TocHeading { id: string; text: string; level: 1 | 2 | 3 }`
- `hooks/useTocActiveId.ts`: IntersectionObserver 로직 분리

**헤딩 파싱 유틸 함수** (`src/utils/mdx.ts`에 추가):
```typescript
export const parseHeadings = (content: string): TocHeading[] => {
  // 정규식으로 h1~h3 파싱, id 생성 (slug화)
}
```

### 4. 공유 버튼
**`src/components/ShareButton/index.tsx`** (단일 파일, 클라이언트 컴포넌트)
- `navigator.clipboard.writeText(window.location.href)` 로 URL 복사
- 복사 완료 시 2초간 "복사됨!" 피드백 UI (아이콘 변경)
- `lucide-react`의 `Link2`, `Check` 아이콘 사용

### 5. 이전/다음 글 네비게이션
**`src/components/ArticleNavigation/index.tsx`** (단일 파일, 서버 컴포넌트)
- Props: `prev: ArticleCardData | null`, `next: ArticleCardData | null`
- 좌: 이전 글 (`← 이전 글` + 제목), 우: 다음 글 (`다음 글 →` + 제목)
- `ROUTES.article(slug)`로 링크

### 6. 상세 페이지 레이아웃 개편
**`src/app/(routes)/articles/[slug]/page.tsx` 전면 수정**

```
페이지 구조:
┌─────────────────────────────────────────┐
│          썸네일 (풀 너비)                │
├─────────────────────────────────────────┤
│  제목 + 메타(날짜, 카테고리, 읽기시간)  │
├────────────────┬────────────────────────┤
│ TOC (sticky)   │   MDX 본문              │
│ + 공유 버튼    │                        │
├────────────────┴────────────────────────┤
│         이전/다음 글 네비게이션          │
└─────────────────────────────────────────┘
```

- `generateStaticParams()`: `getAllArticles()` 재사용
- `notFound()` 로 없는 slug 처리
- 모바일: TOC 숨김, 본문만 표시

---

## 파일 변경 목록

| 작업 | 파일 |
|---|---|
| 수정 | `src/app/(routes)/articles/[slug]/page.tsx` |
| 수정 | `src/utils/mdx.ts` (parseHeadings 추가) |
| 수정 | `src/app/globals.css` (highlight.js 테마) |
| 신규 | `src/components/TableOfContents/index.tsx` |
| 신규 | `src/components/TableOfContents/types.ts` |
| 신규 | `src/components/TableOfContents/hooks/useTocActiveId.ts` |
| 신규 | `src/components/ShareButton/index.tsx` |
| 신규 | `src/components/ArticleNavigation/index.tsx` |

---

## 검증

1. `yarn dev` 실행 후 `/articles/[slug]` 접근
2. TOC가 좌측에 sticky로 표시되고 스크롤 시 현재 섹션 활성화 확인
3. 공유 버튼 클릭 시 URL 복사 + 피드백 UI 확인
4. 이전/다음 글 네비게이션 링크 정상 동작 확인
5. 코드 블록 하이라이팅 렌더링 확인
6. `yarn build` 로 빌드 오류 없음 확인

---
⏳ 미완료 작업
1. 상세 페이지 레이아웃 완성 (src/app/(routes)/articles/[slug]/page.tsx)

- [x] 썸네일 이미지 렌더링
- [x] 제목 + 메타정보 (날짜, 카테고리, 읽기시간, 조회수) 레이아웃
- [x] TOC + 공유 버튼 좌측 배치
- [x] MDX 본문 렌더링 (prose 클래스 적용)
- [] ArticleNavigation 하단 배치
- [] generateStaticParams() 구현
- [] notFound() 에러 처리
2. MDX 렌더링 강화


MDX 콘텐츠의 헤딩에 id 속성 추가 (TOC 링크용)
코드 블록 스타일링
1. 글로벌 스타일 추가 (src/app/globals.css)

highlight.js 테마 import
code 블록 스타일 추가
4. 빌드 및 테스트

yarn build 검증
로컬 테스트: /articles/[slug] 접근
TOC, 공유 버튼, 네비게이션 동작 확인
🎯 다음 세션 우선순위
상세 페이지 레이아웃 완성 (page.tsx 조립)
MDX 렌더링 강화 (rehype-highlight 연결, 헤딩 id 추가)
글로벌 스타일 추가 (highlight.js 테마)
빌드 및 테스트 검증