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
- **CMS**: Notion API (블로그 콘텐츠 관리)
- **Auth**: GitHub OAuth (사용자 인증)
- **Database**: (TBD - 댓글, 북마크 등)

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

```
tech-blog/
├── .claude/                    # Claude Code 환경
│   ├── skills/                 # Skills 정의 (9개 스킬)
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
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   └── layout/           # 레이아웃 컴포넌트
│   │
│   ├── services/              # 서비스 레이어
│   │   ├── api/              # API 클라이언트
│   │   └── hooks/            # Custom hooks (React Query 등)
│   │
│   ├── stores/                # Zustand stores
│   ├── types/                 # TypeScript 타입 정의
│   ├── utils/                 # 유틸리티 함수
│   ├── constants/             # 상수
│   ├── images/                # 이미지 리소스
│   └── stories/               # Storybook 스토리
│
├── public/                    # 정적 파일
├── .storybook/               # Storybook 설정
└── CLAUDE.md                  # 이 파일
```

### 폴더 역할 설명

- **`app/`**: Next.js App Router 기반 페이지 및 레이아웃
- **`components/`**: 재사용 가능한 UI 컴포넌트
- **`services/`**: 비즈니스 로직 및 데이터 처리
  - `api/`: API 클라이언트 및 엔드포인트
  - `hooks/`: React Query 등 데이터 페칭 hooks
- **`stores/`**: Zustand 전역 상태 관리
- **`types/`**: TypeScript 타입 및 인터페이스
- **`utils/`**: 순수 함수형 유틸리티
- **`constants/`**: 상수 및 설정값
- **`images/`**: 이미지 리소스
- **`stories/`**: Storybook 컴포넌트 스토리

---

## 🎨 코딩 컨벤션

### Naming Conventions

| 타입 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `BlogCard.tsx` |
| 함수/변수 | camelCase | `formatDate()`, `userName` |
| 상수 | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |
| 폴더 | kebab-case | `blog-post/` |
| 타입/인터페이스 | PascalCase | `BlogPost`, `UserProfile` |
| Props 인터페이스 | [Component]Props | `BlogCardProps` |

### Export 규칙

- **페이지 컴포넌트** (`app/page.tsx`, `app/layout.tsx`): `export default`
- **일반 컴포넌트**: `named export`
- **유틸 함수**: `named export`
- **타입/인터페이스**: `export type`, `export interface`

```typescript
// ✅ Good - 컴포넌트
export const BlogCard = ({ ... }) => { ... }

// ✅ Good - 페이지
export default function BlogPage() { ... }

// ✅ Good - 유틸
export const formatDate = (date: Date) => { ... }

// ❌ Bad - 컴포넌트
export default BlogCard
```

### TypeScript 규칙

- **strict mode 활성화** (`tsconfig.json`에서 설정)
- **any 타입 사용 금지** (ESLint에서 error로 설정)
- **명시적 타입 정의**
- **미사용 변수 금지** (단, `_`로 시작하는 변수는 허용)

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

- **함수형 컴포넌트** 사용
- **Hooks 규칙** 준수
- **Props 구조 분해**
- **displayName 설정** (Storybook용)

```typescript
// ✅ Good
export const BlogCard = ({ title, description }: BlogCardProps) => {
  return <div>{title}</div>
}

BlogCard.displayName = 'BlogCard'

// ❌ Bad
export const BlogCard = (props) => {
  return <div>{props.title}</div>
}
```

### Tailwind CSS 규칙

- **유틸리티 클래스 우선**
- **커스텀 CSS 최소화**
- **반응형 모바일 퍼스트**
- **className prop 제공**

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-white rounded-lg">

// ✅ Good - 반응형
<div className="text-sm md:text-base lg:text-lg">

// ✅ Good - className prop
export const Card = ({ className = '' }) => (
  <div className={`p-4 bg-white ${className}`}>
)
```

---

## 🚀 Claude Code Skills 사용법

### 전문가 검토 Skills (5개)

#### 1. PM Review
```
/pm-review

이 3개 기능 중 우선순위를 정해줘:
1. 댓글 시스템
2. 사용자 북마크
3. 추천 글 알고리즘
```

**용도**: 기능 우선순위, 비즈니스 가치 분석, 로드맵 수립

#### 2. UX Review
```
/ux-review

BlogCard 컴포넌트의 UX와 접근성을 검토해줘.
```

**용도**: 사용자 경험, WCAG 2.1 접근성, 모바일 UX

#### 3. Design Review
```
/design-review

Figma 디자인을 분석해줘:
[Figma URL]

현재 코드와 일치하는지 확인해줘.
```

**용도**: Figma ↔ 코드 일관성, 디자인 시스템, 색상/타이포그래피

#### 4. Security Review
```
/security-review

댓글 API의 보안을 검토해줘:
POST /api/comments
```

**용도**: OWASP Top 10, API 보안, 취약점 분석

#### 5. Refactor Review
```
/refactor-review

전체 프로젝트의 코드 구조를 평가해줘.
앞으로 기능이 많이 추가될 예정이야.
```

**용도**: 코드 구조, 성능 최적화, 확장성, 기술 부채

---

### 자동화 Skills (4개)

#### 6. Team Review (통합 검토)
```
/team-review

새로 만든 댓글 기능을 전체적으로 검토해줘.
```

**용도**: 5명의 전문가가 동시에 종합 검토

#### 7. Design to Code
```
/design-to-code

Figma URL: [링크]
컴포넌트명: BlogCard
```

**용도**: Figma → React 컴포넌트 자동 생성

#### 8. Validate
```
/validate

전체 코드를 검증하고 자동으로 수정해줘.
```

**용도**: TypeScript, ESLint, Prettier 검증 및 자동 수정

#### 9. Generate Component
```
/generate-component

컴포넌트명: BlogCard
Props: title, description, date, imageUrl, href
```

**용도**: React 컴포넌트 템플릿 자동 생성

---

## 🔄 개발 워크플로우

### 새 기능 개발 프로세스

```mermaid
1. PM Review       → 기능 기획 및 우선순위
2. UX Review       → UX/접근성 설계
3. Design Review   → 디자인 일관성 확인
4. 개발 진행       → 코드 작성
5. Security Review → 보안 검토
6. Refactor Review → 코드 구조 검토
7. Team Review     → 최종 종합 검토
```

### Figma → 코드 구현 프로세스

```mermaid
1. Design Review     → Figma 분석
2. Design to Code    → 컴포넌트 자동 생성
3. UX Review         → UX/접근성 검증
4. Validate          → 코드 품질 검증
```

### 일일 개발 루틴

**개발 시작 전, 데일리 스크럼**
```
/pm-review
오늘 뭘 할까?
```

**개발 중**
- 필요시 각 전문가 Skill 호출
- `/generate-component`로 빠른 템플릿 생성
- `/design-to-code`로 Figma 구현

**작업 종료 전**
```
/validate
전체 코드를 검증하고 수정해줘.

yarn format
코드 포맷팅 적용

/refactor-review
오늘 작성한 코드 리뷰해줘.
```

**주간 리뷰**
```
/team-review
이번 주 작업 전체를 검토해줘.
```

---

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
1. **간단한 검토**: 개별 Skill (`/pm-review`, `/ux-review` 등)
2. **종합 검토**: `/team-review` (중요한 시점에만)
3. **자동화**: `/validate`, `/generate-component` 적극 활용
4. **Figma 구현**: `/design-review` → `/design-to-code` 순서

### 개발 효율화
1. **컴포넌트 생성**: `/generate-component` 먼저 사용
2. **코드 검증**: 작업 종료 시 `/validate` 후 `yarn format`
3. **정기 리뷰**: 주간 `/team-review`로 기술 부채 관리
4. **Storybook**: 컴포넌트는 항상 스토리와 함께 개발
5. **Import 정렬**: Prettier가 자동으로 import 순서 정렬

### 주의사항
- Skills는 **도구**일 뿐, 최종 판단은 개발자 몫
- `/team-review`는 리소스가 많이 들므로 신중히 사용
- 자동 생성 코드는 **반드시 검토** 후 사용
- 보안 검토는 **정기적으로** 수행

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

**Last Updated**: 2026-02-15
**Version**: 1.1.0
