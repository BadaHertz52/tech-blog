# 브랜치 & 이슈 컨벤션

> `CLAUDE.md`에서 참조되는 상세 규칙 문서.

## 커밋/이슈 타입

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

## 커밋 시 지켜야하는 규칙
- 커밋 메세지에서 클로드를 협업자로 추가하지 않는다. (Co-Authored-By: Claude ~ 와 같은 내용을 추가하지 않는다. )

## 브랜치명 컨벤션

### Feature 브랜치
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

### Article 브랜치
```sh
article/yy-mm-title
```

```bash
# 예시
article/26-03-ai-techblog-responsibility-over-speed
article/26-02-nextjs-optimization-guide
article/26-01-react-performance-tips
```

## 이슈 제목 컨벤션

```sh
타입: 이슈 작업 내용
```

```sh
# 예시
feat: MDX 인프라 구축
feat: 블로그 리스트 페이지 구현
fix: BlogCard 썸네일 이미지 오류 수정
```

## 브랜치 전략

### 브랜치 구조

```text
main (기준점, 코드 변경 관리)
  ├── feature/* → main PR → release 머지 (코드/기능 변경)
  └── article/* → release PR 직접 (마크다운 아티클 추가)

release (배포 브랜치, Vercel production)
```

### 브랜치 역할

| 브랜치 | 역할 | PR 방향 | 설명 |
|--------|------|--------|------|
| `main` | 기준점 | feature/* → main | 코드 변경 관리, 배포 전 최종 검증 |
| `release` | 배포 브랜치 | main → release / article/* → release | Vercel production 배포 |
| `feature/*` | 기능 개발 | → main | 기능 추가, 버그 수정, 리팩토링 |
| `article/*` | 콘텐츠 추가 | → release 직접 | 마크다운 아티클만 추가 (코드 변경 금지) |

### article 브랜치 전략

- **브랜치 생성**: `main`에서 브랜치 생성 → 최신 코드 상태 기준 보장
- **PR 대상**: `release`로 직접 PR (코드 변경 없이 콘텐츠만 반영)
- **허용 파일**: 마크다운 파일만 추가 (코드 변경 시 `feature/*` 사용)
- **브랜치 관리**: 짧게 유지하여 충돌 방지

### 워크플로우 예시

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
