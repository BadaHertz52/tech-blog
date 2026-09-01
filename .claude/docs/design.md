# 디자인 시스템 — Tactile Clay

> Stitch에서 정리된 'Tactile Clay' 디자인 컨셉을 프로젝트 톤에 맞게 반영한 실사용 스펙.
> Claude Code는 UI 관련 작업(컴포넌트 구현, 스타일링, 리뷰) 시 이 문서를 최우선 참고한다.

## 컨셉

모던 + 키치 + 귀여움. 부드러운 입체감의 3D 클레이모피즘(Claymorphism)과 미니멀 레이아웃의 조화.
회색 고양이 마스코트, 비눗방울 인터랙션 요소가 브랜드 아이덴티티.

## 컬러 (`tailwind.config.ts` 토큰과 1:1 매핑)

| 이름 | Hex | 용도 | Tailwind 토큰 |
|---|---|---|---|
| Primary Blue | `#056FE8` | 메인 CTA, 브랜딩 | `primary.blue` |
| Primary Blue 700 | `#186BCB` | Primary 호버 | `primary.blue700` |
| Sky Blue | `#87CEEB` | 하이라이트, 강조 | `secondary.sky-blue` |
| Dark Charcoal | `#1A1A1B` | 본문/헤딩 텍스트 | `gray.charcoal` / `text.primary` |
| Muted Grey | `#6C757D` | 캡션, 메타데이터 | `gray.dark` / `text.secondary` |
| Athens Gray | `#F1F5F9` | 캡션 배경 | `gray.light` |
| Background (White Anti Gray) | `#F8F9FA` | 앱/페이지 캔버스 | `bg.pale-blue` |
| Surface Card | `#FFFFFF` | 컴포넌트 컨테이너 | `white` / `bg.white` |

새 색상이 필요하면 먼저 이 표에서 대체 가능한 토큰이 있는지 확인 — 없을 때만 `tailwind.config.ts`에 추가.

## 타이포그래피

- **Display (헤딩)**: Space Grotesk — `fontFamily.display`. h1/h2/h3에 적용.
- **Body**: Pretendard — `fontFamily.pretendard`. 본문, 캡션에 적용.
- 크기 스케일은 기존 `fontSize` 토큰(`h1-mobile/desktop` 등) 그대로 사용.

## 클레이모피즘 규칙

1. **Soft Shadow**: blur 20px~60px의 큰 블러 반경 → `boxShadow.clay` (`0 20px 40px -8px rgba(5,111,232,0.15)`), 약한 버전은 `boxShadow.clay-sm`.
2. **Generous Radii**: 카드 최소 24px → 기존 `rounded-card`(24px) 그대로 사용. 버튼은 `rounded-button`(12px) 유지.
3. **Subtle Insets**: 인터랙티브 상태(눌림, 포커스)나 폼 필드는 inner shadow 고려. 필요 시 `shadow-inner` + 커스텀 값으로 처리, 별도 토큰은 실제 사용처 생기기 전까지 추가하지 않음.
4. **Vibrant Glow**: 강조가 필요한 아이콘/버튼에 `shadow-clay` + `primary.blue` 조합.

## 아이콘 & 마스코트

- 아이콘은 outline 스타일, 24px 그리드 기준 (GitHub, LinkedIn, Menu, Search, Comments, Home 등 기존 세트 재사용).
- 고양이 마스코트 로고는 `BADA.DEV` 워드마크와 항상 함께 노출 (헤더/푸터).
- 새 아이콘 추가 시 기존 세트와 동일한 stroke width·grid 유지.

## 컴포넌트 적용 기준

- **Button**: 기존 `btn-primary`/`btn-secondary`/`btn-black` 변형 유지. Primary 호버 색상만 `primary.blue700`로 교체.
- **Card**: `rounded-card` + `shadow-clay` 조합이 기본값.
- 새 컴포넌트를 만들기 전 `src/components/`에 재사용 가능한 게 있는지 먼저 확인 (ponytail 원칙).

## 원본 레퍼런스

- Figma: `https://www.figma.com/design/SKXPlcuQzSQ4H34JfslH7j/...` (node: Color Palette Section, Typography Section, icon assets)
