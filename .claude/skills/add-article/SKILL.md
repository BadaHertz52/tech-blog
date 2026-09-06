---
name: add-article
description: 아티클 생성부터 PR까지 전체 프로세스 안내 (yarn create:article → 로컬 확인 → 검증 → PR)
---
# 아티클 추가 프로세스 스킬

## 목적

새 아티클을 추가할 때 거쳐야 하는 단계를 순서대로 안내합니다. 각 단계는 기존 스크립트/스킬을 그대로 호출하며, 이 스킬은 재구현 없이 순서만 엮습니다.

## 단계

### 1. 아티클 생성

```bash
yarn create:article
```

- `scripts/create-article.js`가 slug/카테고리 등을 입력받아 `public/articles/[date-slug]/index.mdx`를 생성
- 브랜치는 스크립트가 만들어주지 않으므로, 생성 전후로 `article/yy-mm-title` 형식의 브랜치가 만들어져 있는지 직접 확인
  ```bash
  git checkout -b article/yy-mm-title
  ```

### 2. 로컬 확인

```bash
yarn dev
```

- 브라우저에서 새 아티클이 의도대로 렌더링되는지 확인

### 3. 검증

```bash
yarn validate:articles
```

- `scripts/validate-articles.ts`가 아티클 메타데이터/등록 여부를 검증
- 이어서 `/tech-blog-editor` 스킬을 호출해 맞춤법/문법/글 구조/어투 검수 진행

### 4. PR 생성

- `/pr` 스킬을 호출해 PR 초안 작성
- article 브랜치는 `.github/PULL_REQUEST_TEMPLATE/article.md` 템플릿을 사용하며 base는 main 

### 5. 배포 안내

- main -&gt; release pr 

- `release` 브랜치에 머지되면 Vercel production 배포가 자동으로 실행됨
- 별도의 수동 배포 조치 불필요

