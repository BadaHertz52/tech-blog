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

### 🎨 디자인 시스템
UI 구현/스타일링/리뷰 시 `.claude/docs/design.md` (Tactile Clay 디자인 시스템)를 우선 참고한다.
- **디자인**: 일관되고 아름다운 UI

### 📚 상세 문서
자세한 규칙/참고 자료는 아래 문서를 확인한다. 이 파일은 요약본이다.

**규칙 (`.claude/rules/`) — 작업 시 반드시 준수**
- [`coding-convention.md`](.claude/rules/coding-convention.md) — 네이밍, export, TypeScript, React, Tailwind 스타일링, Props, 상수 컨벤션
- [`git-convention.md`](.claude/rules/git-convention.md) — 커밋/이슈 타입, 브랜치 전략
- [`collaboration.md`](.claude/rules/collaboration.md) — 수정 전 승인 프로세스

**참고 문서 (`.claude/docs/`) — 필요 시 조회**
- [`design.md`](.claude/docs/design.md) — Tactile Clay 디자인 시스템
- [`skills-guide.md`](.claude/docs/skills-guide.md) — Claude Code Skills 사용법
- [`troubleshooting.md`](.claude/docs/troubleshooting.md) — 문제 해결

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

> 자세한 규칙은 [`.claude/rules/coding-convention.md`](.claude/rules/coding-convention.md) 참고.
---

## 🚀 Claude Code Skills 사용법

> 각 스킬의 사용 예시와 팁은 [`.claude/docs/skills-guide.md`](.claude/docs/skills-guide.md) 참고.
---

## 🌿 브랜치 & 이슈 컨벤션

> 자세한 규칙은 [`.claude/rules/git-convention.md`](.claude/rules/git-convention.md) 참고.

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

## ✅ Claude Code 협업 원칙

> 수정 전 승인 프로세스는 [`.claude/rules/collaboration.md`](.claude/rules/collaboration.md) 참고.

---

## 🚨 문제 해결

> [`.claude/docs/troubleshooting.md`](.claude/docs/troubleshooting.md) 참고.

---

**Last Updated**: 2026-08-31
**Version**: 1.2.0
