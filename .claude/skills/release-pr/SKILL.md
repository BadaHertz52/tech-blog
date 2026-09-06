---
name: release-pr
description: >
  main 브랜치를 release 브랜치로 배포하는 PR을 생성하고 일반 머지(--merge)한 뒤,
  release 브랜치 기준으로 SemVer 태그를 만들고 GitHub Release를 발행한다.
  머지되면 Vercel이 release 브랜치를 자동 배포한다. 사용자가 "release로 머지해줘",
  "배포 PR 만들어줘", "release PR", "릴리즈 발행해줘", "태그 만들고 릴리즈 올려줘",
  "/release-pr" 이라고 할 때 트리거된다.
---

# Release PR (기술 블로그 전용)

`main → release` 배포 PR을 생성·머지하고, 이어서 태그 + GitHub Release를 발행하는
스킬. release 브랜치는 배포 히스토리 보존이 목적이므로 **일반 머지(--merge)만
사용**한다 (스쿼시 아님).

## 절차

### 1. 사전 확인

```bash
git fetch origin
git status
git log origin/release..origin/main --oneline
```

- `main`과 `release`의 차이가 없으면 "배포할 변경 사항 없음"을 알리고 중단한다.
- working tree에 uncommitted 변경이 있으면 사용자에게 알리고 진행 여부를 확인한다.

### 2. 버전 결정 및 `package.json` 갱신

```bash
git fetch --tags
gh release list --limit 1
```

- 마지막 태그를 확인하고, 이번 변경 성격(버그 수정=PATCH, 기능 추가=MINOR, 0.x.x
  단계에서는 MAJOR 올리지 않음)에 맞는 다음 버전을 사용자에게 제안한다.
- 사용자가 버전을 직접 지정하면 그것을 따른다.
- `package.json`의 `version` 필드를 결정된 버전으로 갱신하고, `main`에 커밋한다
  (예: `chore: package.json 버전 X.Y.Z로 업데이트`). 이미 갱신되어 있으면 건너뛴다.

### 3. PR 생성

```bash
gh pr create --base release --head main \
  --title "release: vX.Y.Z — <핵심 변경 요약>" \
  --body "$(cat <<'EOF'
## 🔗 관련 이슈 (Related Issue)

Closes #<이슈 번호>

---

## 💡 어떤 것, 어떻게 해결했는가? (What & How)

main → release 반영 (#<이 PR 번호>)

### 포함된 변경사항
- <origin/release..origin/main 커밋 로그 기반으로 요약>

---

## 📚 구현하면서 학습한 내용 (What I Learned)

-

---

## 😊 코멘트 (Comment)

-
EOF
)"
```

- 제목/본문은 1단계에서 확인한 커밋 로그를 기반으로 직접 요약해서 채운다.
- 이 레포의 `default.md` PR 템플릿 구조를 따른다.

### 4. 사용자 확인 후 머지

- PR 링크를 사용자에게 보여주고 머지해도 되는지 확인한다 (배포를 트리거하는
  행위이므로 반드시 확인 후 진행).
- 승인되면:
  ```bash
  gh pr merge --merge
  ```
  - `--squash`나 `--rebase`는 사용하지 않는다 (release 브랜치는 배포 히스토리
    보존 목적).

### 5. 태그 생성 및 GitHub Release 발행

- 어떤 태그를 어떤 커밋에 생성할지 보여주고 확인받는다.

```bash
git checkout release
git pull origin release
git tag -a vX.Y.Z -m "vX.Y.Z: <핵심 변경 요약>"
git push origin vX.Y.Z
```

- release 대상 기간의 커밋 로그(`git log <이전 태그>..vX.Y.Z --oneline`)를 바탕으로
  릴리즈 노트를 직접 요약해 작성한다.

```bash
gh release create vX.Y.Z \
  --title "vX.Y.Z - <한 줄 요약>" \
  --target release \
  --notes "$(cat <<'EOF'
## 이번 릴리즈 변경 사항
- ...
EOF
)"
```

### 6. 완료 보고

- 머지 완료, Vercel 자동 배포가 시작됨을 안내한다.
- 발행된 Release는 `gh release list`로 확인 방법을 안내한다.
