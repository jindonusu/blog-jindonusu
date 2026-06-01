# 진도누수 (jindonusu) — Nuxt 4 사이트

천안·아산·대전 누수탐지 전문 **진도누수**의 랜딩 사이트입니다.
기존 단일 `index.html` 정적 사이트를 **Nuxt 4 + Vue 3** 프로젝트로 마이그레이션했습니다.

## 기술 스택

- **Nuxt 4** (Vue 3) — 컴포넌트 기반 SSG(정적 프리렌더)
- **Nitro 서버 라우트** — 네이버 블로그 RSS 프록시 (`/api/blog`)
- **Cloudflare Pages** 배포 (`cloudflare-pages` 프리셋)

## 로컬 개발

```bash
npm install      # 의존성 설치
npm run dev      # http://localhost:3000 개발 서버 (블로그 API 포함 — 로컬에서 바로 테스트 가능)
```

## 빌드 / 미리보기

```bash
npm run build    # Cloudflare Pages 용 빌드 → dist/ 생성
npm run preview  # 빌드 결과 로컬 미리보기
```

## Cloudflare Pages 배포 설정

GitHub 저장소를 Cloudflare Pages에 연결한 뒤 아래로 설정하세요.

| 항목 | 값 |
| --- | --- |
| **Framework preset** | Nuxt (또는 None) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node version** | `20` (환경변수 `NODE_VERSION=20`) |

> 랜딩 페이지(`/`)는 빌드 시 정적 HTML로 프리렌더되고, `/api/blog` 만
> Cloudflare 워커(`_worker.js`)로 실행됩니다.

## 프로젝트 구조

```
app/
  app.vue                  진입점 — 섹션 컴포넌트 조립
  assets/css/main.css      전역 스타일 (기존 디자인 100% 보존)
  components/              섹션별 Vue 컴포넌트 (Hero, Services, BlogSection ...)
  composables/useMenu.js   모바일 메뉴 열림 상태 공유
  plugins/reveal.client.js 스크롤 reveal 애니메이션
  utils/blogData.js        블로그 탭 + fallback 데이터
server/
  api/blog.js              네이버 RSS 파싱 (Nitro 서버 라우트)
public/
  images/                  시공 사진 (work-01 ~ work-10)
nuxt.config.ts             Nuxt 설정 (SEO 메타, CSS, Cloudflare 프리셋)
```

## 견적 신청 / 관리자 조회

- 메인 히어로의 **빠른 무료 견적 신청** 폼 → `POST /api/quote` 로 접수되어 저장됩니다.
- **관리자 조회 페이지: `/quotes`** (검색 비노출, 네비게이션에 링크 없음)
  - 비밀번호 입력 후 접수된 신청 목록(접수일시·지역·서비스·성함·연락처)을 확인
  - 기본 비밀번호 `admin1234` → **운영에서는 환경변수 `NUXT_ADMIN_TOKEN` 로 반드시 변경**
    (Cloudflare Pages → Settings → Environment variables)
- 저장소
  - **로컬 개발**: 파일시스템 `.data/quotes` 에 저장 — 설정 없이 바로 동작
  - **운영(Cloudflare)**: KV 바인딩 `QUOTES` (아래 1회 설정)
  - ⚠️ KV 미설정이어도 **사이트·빌드는 정상** — 견적 "저장"만 비활성 상태가 됩니다

### 운영에서 견적 저장 켜기 (선택, 1회)

```bash
npx wrangler kv namespace create QUOTES   # 네임스페이스 id 발급
```

발급된 id 를 `wrangler.toml` 의 `[[kv_namespaces]]` 주석을 풀어 입력하거나,
Pages 대시보드 → Settings → Functions → **KV namespace bindings** 에 `QUOTES` 로 연결하세요.

## 블로그 연동

- 두 개의 네이버 블로그(`nusussakjaba`, `abbiok`) RSS 를 `/api/blog?id=...` 가 파싱해 JSON 반환
- 허용 블로그 ID 는 `server/api/blog.js` 상단 `ALLOWED` 배열에서 관리
- 네이버 썸네일은 핫링크(Referer) 차단을 받으므로, 카드 이미지에 `referrerpolicy="no-referrer"`
  적용 + 실패 시 로컬 시공사진으로 자동 대체(`onerror`) + 서버에서 `https` 강제로 엑박을 방지
- API 실패 시 `app/utils/blogData.js` 의 정적 fallback 글로 자동 대체
