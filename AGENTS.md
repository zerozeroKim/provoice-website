# AGENTS.md — 이 저장소에서 작업할 때 지켜야 할 것

이 문서는 Codex를 포함한 모든 코딩 에이전트가 이 저장소에서 작업하기 전에 읽어야 하는 프로젝트 규칙입니다.

## 프로젝트 개요

- Vite + React + TypeScript. 라우터 라이브러리 없이 `src/app/App.tsx`에서 `window.location.hash`로 직접 라우팅합니다.
- CSS는 전부 CSS Modules(`*.module.css`)만 사용합니다. Tailwind는 안 씀 (관련 의존성 있으면 삭제 대상).
- 디자인 시스템 계층 구조: `src/design-system/tokens` → `primitives` → `components` → `patterns`(주로 `LandingSections/` 폴더) → `src/pages/*`(실제 페이지).
- 고객이 보는 실제 사이트는 `src/pages/Layout/LayoutPage.tsx` 하나이고, 나머지 페이지(Portfolio/VoiceSearch/AI 등)는 각자 독립된 라우트입니다. **새 기능을 밑바닥부터 새로 만들지 말고, 이미 있는 디자인 시스템 컴포넌트/패턴을 조합해서 완성하세요.** 이게 이 프로젝트의 핵심 작업 방식입니다.

## 배포 구조 — 반드시 이대로 유지할 것

- GitHub 저장소: `zerozeroKim/provoice-website` (개인 계정, private). Vercel 프로젝트 `provoice-website`(팀 `123412`)가 이 저장소에 Git 연동되어 있습니다.
- **`main` 브랜치 = 고객용.** push하면 자동으로 Production 배포되고 `https://provoice-website.vercel.app`에 반영됩니다. 이 배포에는 `VITE_SITE_MODE=customer` 환경변수가 Vercel Production 환경에 설정되어 있어서, 디자인 시스템 문서(Typography/Colors/Components/Templates/Layout 탭)가 절대 노출되지 않고 완성된 고객 화면만 보입니다. **이 브랜치는 명시적으로 지시받았을 때만 push하세요.**
- **`dev` 브랜치 = 개발/디자인 시스템용.** push하면 자동으로 `https://provoice-website-git-dev-123412.vercel.app`에 배포되고, 상단에 디자인 시스템 메타 내비(Typography/Colors/Components/Templates/Layout)가 항상 보입니다. 이 값은 `VITE_SITE_MODE` 환경변수가 없을 때의 기본 동작이므로, 이 분기 로직(`src/app/App.tsx`의 `isCustomerHost`)을 절대 호스트 이름 기반으로 되돌리지 마세요.
- 배포는 **`git push`만 하면 자동**입니다. `vercel deploy`나 `vercel alias set`을 수동으로 칠 필요가 전혀 없습니다 (예전에는 그렇게 했지만 지금은 Git 연동으로 대체됨).
- **주의**: 커밋 작성자 이메일이 GitHub 계정과 매칭되지 않으면 Vercel이 배포를 조용히 `BLOCKED` 상태로 막습니다(빌드가 아예 시작 안 됨). 로컬 git 설정(`git config user.email`)이 `zerozeroKim` GitHub 계정과 연결된 이메일(노리플라이 이메일 포함)로 되어 있는지 확인하세요. 임의의 로컬 이메일(`someone@local` 같은 것)로 커밋하지 마세요.
- 두 브랜치를 계속 동기화하려면 보통 `git checkout dev && git merge main --ff-only && git push origin dev`로 처리합니다.

## 아키텍처 컨벤션

- **컴포넌트는 폴더 하나당 파일 하나 + CSS 모듈 하나 + `index.ts`** 구조를 지킵니다 (`src/design-system/components/*`를 참고). 여러 섹션/컴포넌트를 하나의 거대한 파일에 몰아넣지 마세요 — 예전에 `LandingSections.tsx` 하나에 9개 섹션이 다 들어있고 한 줄이 1200자가 넘는 코드가 있었는데, 이건 디자인을 수정하기 어렵게 만드는 명백한 안티패턴입니다. 섹션 하나당 파일 하나, CSS도 그 섹션 것만 담습니다. 여러 섹션이 CSS 클래스를 진짜로 공유한다면(예: Hero/AI의 카피 레이아웃) 작은 공유 CSS 모듈을 따로 만드세요.
- **재사용 가능한 UI는 `design-system/components/`로 승격**하세요. 특정 패턴 파일 안에 로컬 함수로 숨겨둔 범용 컴포넌트(예: 커스텀 드롭다운)는 다른 곳에서 재사용도 안 되고 `ComponentsPage`에 문서화도 안 됩니다. 진짜 그 섹션 전용 로직이 아니라면 컴포넌트로 빼고 `src/pages/Components/ComponentsPage.tsx`에 탭을 추가해 문서화하세요.
- **죽은 코드/CSS를 남기지 마세요.** 클래스를 정의해놓고 아무 데서도 `className`으로 안 쓰는 CSS 규칙, 아무 데서도 import 안 되는 파일, `package.json`에만 있고 실제로 안 쓰는 의존성 — 전부 이 저장소에서 실제로 발견됐던 문제들입니다. 기능을 리팩터링하거나 컴포넌트를 교체할 때는 이전 버전의 죽은 흔적을 반드시 지우세요.
- CSS 모듈 간 클래스 공유 시 주의: Vite/CSS Modules는 클래스명과 `@keyframes` 이름을 파일 단위로 해시합니다. `.parent .child` 형태로 다른 파일의 클래스를 오버라이드하려는 코드는 컴파일된 클래스명이 달라서 매칭되지 않습니다. 공유 스타일에 로컬 오버라이드를 얹을 때는 JSX에서 두 모듈의 클래스를 같이 합성하세요: `` className={`${shared.kicker} ${styles.kicker}`} ``.
- CSS 변수는 실제로 어딘가 적용된 전역 토큰(`--neutral-*`, `--purple-*`, `--radius-*` 등)만 쓰세요. `.page`처럼 아무 데도 적용 안 된 셀렉터에만 커스텀 프로퍼티를 정의해두는 식(예전 `--provoice-*` 변수들)은 값이 항상 fallback/초기값으로 조용히 깨지는 버그를 만듭니다.
- 새 페이지/섹션을 만들 때는 항상 기존 톤(보라색 그라디언트 브랜드 컬러, `SectionHeader`/`Button`/`Chip` 등 기존 컴포넌트)을 우선 재사용하고, 정말 없는 경우에만 새 컴포넌트를 추가하세요.

## 작업 후 체크리스트

1. `npm run build` (내부에서 `tsc -b`도 실행되어 타입 에러도 잡힘) — 반드시 통과해야 함.
2. 가능하면 `npx vite preview`로 로컬 서빙 후 실제로 바뀐 화면을 확인하세요. 특히 CSS를 옮기거나 나눴을 때는 빌드만으로는 시각적 회귀를 못 잡습니다.
3. 커밋 메시지는 "무엇을 왜 바꿨는지" 중심으로 간결하게. `main`/`dev`에 실제로 push하는 건(=배포 트리거) 사용자가 명시적으로 요청했을 때만 하세요.
