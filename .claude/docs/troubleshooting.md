# 문제 해결

> `CLAUDE.md`에서 참조되는 상세 참고 문서.

## Claude Code 관련
- Skills가 작동하지 않으면: `.claude/skills/` 폴더 확인
- Skill 파일은 마크다운 형식 (`.md`)
- `/skill-name` 형식으로 호출

## 개발 환경
- TypeScript 에러: `yarn build` (타입 체크 포함)
- ESLint 에러: `yarn lint`
- Prettier 포맷팅: `yarn format`
- Prettier 검사: `yarn format:check`
