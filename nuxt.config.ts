// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  // 기존 디자인을 100% 보존하기 위해 전역 CSS 로 로드
  css: ['~/assets/css/main.css'],

  // Cloudflare Pages 배포 (Nitro 프리셋)
  nitro: {
    preset: 'cloudflare-pages',
    // 견적 신청 저장소 — 운영: Cloudflare KV 바인딩 'QUOTES'
    storage: {
      quotes: { driver: 'cloudflareKVBinding', binding: 'QUOTES' },
    },
    // 로컬 개발: 파일시스템(.data/quotes) — KV 없이 바로 동작
    devStorage: {
      quotes: { driver: 'fs', base: './.data/quotes' },
    },
  },

  // 관리자 로그인 (견적 문의확인 페이지 /quotes)
  // 운영에서 바꾸려면 환경변수 NUXT_ADMIN_USER / NUXT_ADMIN_TOKEN 설정
  runtimeConfig: {
    adminUser: 'admin',
    adminToken: 'admin1234',
  },

  routeRules: {
    // 랜딩 페이지(/)는 빌드 시 정적 프리렌더 — 블로그 피드만 클라이언트에서 동적 로드
    '/': { prerender: true },
    // 관리자 페이지는 런타임 렌더 + 검색 비노출
    '/quotes': { prerender: false, robots: false },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title:
        '진도누수 | 천안·아산·대전 누수탐지 · 욕실누수 · 화장실누수 · 아랫집 천장누수 전문',
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content:
            '진도누수 24시간 365일 긴급출동. 충남·대전·세종 12개 지역 (천안·아산·당진·서산·보령·홍성·예산·태안·청양·논산·세종·대전) 욕실누수·화장실누수·아랫집 천장누수·배관누수·비파괴 방수시공 전문.',
        },
        {
          name: 'keywords',
          content:
            '천안 누수, 아산 누수, 대전 누수, 세종 누수, 당진 누수, 서산 누수, 욕실누수, 화장실누수, 아랫집 천장누수, 특수미세누수, 배관누수, 비파괴방수시공, 배면차수시공, 누수보험처리, 피해층복원공사, 진도누수',
        },
        { property: 'og:title', content: '진도누수 | 천안·아산·대전 누수탐지 전문 업체' },
        {
          property: 'og:description',
          content:
            '정밀 탐지부터 비파괴 시공, 보험처리, 복원까지 원스톱. 24시간 365일 긴급출동.',
        },
        { property: 'og:type', content: 'website' },
        // 네이버 서치어드바이저 사이트 소유확인
        { name: 'naver-site-verification', content: '88db0bce2ca987b9f7734955cbdb2e1a7e91f288' },
      ],
      link: [
        {
          rel: 'stylesheet',
          as: 'style',
          crossorigin: '',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
        },
      ],
    },
  },
})
