# About Me 페이지 구현 명세

> 라우트: `/about-me`  
> 파일: `src/app/(routes)/about-me/page.tsx`  
> 현재 상태: `ComingSoon` 컴포넌트로 대체 중 → 실제 페이지로 교체 필요

---

## 섹션 구성 (상단 → 하단)

### 1. 히어로 섹션

- **"HI I'M BADA"** 대형 타이포그래피
  - `"HI I'M "` — 기본 텍스트 색상 (라이트: 흑, 다크: 백)
  - `"BADA"` — primary-blue 색상 강조
- 소셜 링크 아이콘 2개: GitHub, LinkedIn
  - 기존 `src/components/Icon/CustomIcon` 재사용
- 레이아웃: 중앙 정렬, 모바일/데스크톱 동일

---

### 2. 자기소개 카드 섹션 (DEVELOPER / GROWTH / FUNNY)

- 데스크톱: 3컬럼 그리드
- 모바일: 1컬럼 세로 스택

각 카드 구성:
- 아이콘 + 대문자 타이틀
- 불릿 리스트 형태 설명

| 카드 | 아이콘 | 설명 |
|---|---|---|
| DEVELOPER | 💻 | 세상과 사람을 잇는 개발을 꿈꾸는 개발자<br>서비스의 가치 실현, UX에 진심인 개발자 |
| GROWTH | 📈 | 어려운 과제에 도전하며, 성장을 즐기는 개발자<br>질문을 통해, 이유를 찾는 개발자<br>동료와 함께 하는 성장을 고민하는 개발자 |
| FUNNY | 😊 | 파워J 엄청난 몰입력과 추진력<br>열심히 안했다면, 열심히 할 것 |

---

### 3. JOURNEY 섹션

- 섹션 제목: `JOURNEY` (볼드, 대문자)
- 타임라인 형태

각 항목 구성:
- 왼쪽: 컬러 아이콘 + 날짜 범위 (예: `APRIL 2025 - PRESENT`)
- 제목 (회사명 또는 교육명)
- 부제목 (역할/과정명)
- 상세 설명 불릿 리스트: **데스크톱에서만 표시**, 모바일 숨김

**이력 데이터:**

| 기간 | 이름 | 역할 | 상세 설명 (데스크톱) |
|---|---|---|---|
| APRIL 2025 - PRESENT | 라렐랜드 파트너즈 | 웹 프론트엔드 개발자 | 서비스 소비자/마케터/어드민 서비스 개발 (ex: 프로모션, 배송 관련 프로젝트, 레포지토리 초기 환경 셋팅)<br>CreBorClub 멤버십/어드민 개발 |
| FEB 2024 - NOV 2024 | 우아한테크코스 6기 수료 | 웹 프론트엔드 전문 과정 | — |

---

### 4. SIDE PROJECTS 섹션

- 섹션 제목: `SIDE PROJECTS` (볼드, 대문자)
- 카드 그리드 형태

각 프로젝트 카드 구성:
- 썸네일 이미지 (없을 경우 회색 placeholder)
- 우상단 외부 링크 아이콘
- 프로젝트명 (볼드)
- 기간 (primary-blue 색상)
- 설명 텍스트
- 기술 스택 태그 — 기존 `src/components/Tag` 재사용

**프로젝트 데이터 (이미지 기준 예시, 실제 데이터 확인 필요):**

| 이름 | 기간 | 설명 | 태그 |
|---|---|---|---|
| Project Alpha | JAN 2024 - MAR 2024 | A high-performance interactive dashboard built for modern web applications focusing on data visualization. | TYPESCRIPT, REACT |

> 실제 사이드 프로젝트 데이터는 이슈 작성 전 확인 필요

---

## 컴포넌트 구조

```text
src/app/(routes)/about-me/
├── page.tsx
├── _constants/
│   └── index.ts                     # 이력, 프로젝트 정적 데이터
└── _components/
    ├── HeroSection/
    │   └── index.tsx
    ├── IntroCardSection/            # DEVELOPER / GROWTH / FUNNY
    │   └── index.tsx
    ├── JourneySection/
    │   ├── index.tsx
    │   └── components/
    │       └── JourneyItem/
    │           └── index.tsx
    └── SideProjectsSection/
        ├── index.tsx
        └── components/
            └── SideProjectCard/
                └── index.tsx
```

---

## 재사용 가능한 기존 컴포넌트

| 컴포넌트 | 경로 | 용도 |
|---|---|---|
| Icon (CustomIcon) | `src/components/Icon/CustomIcon` | GitHub, LinkedIn 아이콘 |
| Tag | `src/components/Tag` | 기술 스택 태그 |
| ButtonLink | `src/components/ButtonLink` | 외부 링크 버튼 |

---

## 반응형 분기점

| 구간 | 레이아웃 |
|---|---|
| 모바일 (`< 768px`) | 1컬럼, Journey 상세 설명 숨김 |
| 데스크톱 (`≥ 768px`) | 3컬럼 그리드, Journey 상세 표시 |

---

## 데이터 관리

- 이력/프로젝트 데이터는 **정적 상수 파일**로 관리
- 별도 API 호출 불필요 (RSC로 구현)
- 위치: `src/app/(routes)/about-me/_constants/index.ts`
