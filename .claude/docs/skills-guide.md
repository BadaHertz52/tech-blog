# Claude Code Skills 사용법

> `CLAUDE.md`에서 참조되는 상세 참고 문서.

## 검토 Skills

### 1. PM Review
```bash
/pm-review

이 3개 기능 중 우선순위를 정해줘:
1. 댓글 시스템
2. 사용자 북마크
3. 추천 글 알고리즘
```

**용도**: 기능 우선순위, 비즈니스 가치 분석, 로드맵 수립

### 2. Code Review
```bash
/code-review

src/components/Button/index.tsx 코드를 리뷰해줘
```

**용도**: CodeRabbit 기반 코드 품질(타입, 네이밍, export 규칙), 구조(컴포넌트 분리), 스타일(Tailwind), 기능(엣지 케이스), 성능, 보안(XSS/CSRF) 검토
**⚠️ 접근성(WCAG)은 제외** → `/ux-review` 참고

### 3. UX Review
```bash
/ux-review

BlogCard 컴포넌트의 UX와 접근성을 검토해줘.
```

**용도**: 사용자 경험, WCAG 2.1 접근성, 모바일 UX

### 4. Design to Code
```bash
/design-to-code

Figma URL: [링크]
컴포넌트명: BlogCard
```

**용도**: Figma → React 컴포넌트 자동 생성

### 5. Tech Blog Editor
```bash
/tech-blog-editor

검토할 아티클:
[마크다운 아티클 전문]
```

**용도**: 아티클 맞춤법, 문법, 글 구조, 어투 검수 (국립국어원 표준 기준)

### 6. Create PR
```bash
/create-pr

# 현재 브랜치의 커밋 기반으로 PR 초안 자동 작성
```

**용도**: 커밋 내역 분석 → PR 제목/본문 자동 생성 (article/feature 브랜치 모두 지원)
- `article/*` 브랜치: `release` 를 target으로 PR 생성
- `feat/*`, `fix/*` 등: `main` 을 target으로 PR 생성

## 사용 팁

1. **기능 기획**: `/pm-review`로 우선순위와 비즈니스 가치 분석
2. **코드 리뷰**: `/code-review`로 CodeRabbit 규칙 기반 코드 품질 + 구조 + 성능 + 보안 검토
3. **UX/접근성**: `/ux-review`로 WCAG 준수 여부 검증
4. **Figma 구현**: `/design-to-code`로 컴포넌트 자동 생성
5. **아티클 검수**: `/tech-blog-editor`로 맞춤법, 문법, 글 구조 검증 (국립국어원 표준)
6. **PR 작성**: `/create-pr`로 커밋 기반 PR 자동 생성

## 주의사항
- Skills는 **도구**일 뿐, 최종 판단은 개발자 몫
- 자동 생성 코드는 **반드시 검토** 후 사용
- 보안 검토는 **정기적으로** 수행 (최소 월 1회)
