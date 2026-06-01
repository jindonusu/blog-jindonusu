/* ============================================================
   GET /api/quotes — 견적 신청 내역 조회 (관리자 전용)
   ------------------------------------------------------------
   인증: x-admin-token 헤더(또는 ?token=) 가 runtimeConfig.adminToken 과 일치해야 함
        운영에서는 환경변수 NUXT_ADMIN_TOKEN 로 반드시 변경하세요.
============================================================ */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getHeader(event, 'x-admin-token') || getQuery(event).token

  if (!token || token !== config.adminToken) {
    setResponseStatus(event, 401)
    return { ok: false, error: 'unauthorized' }
  }

  try {
    const storage = useStorage('quotes')
    const keys = await storage.getKeys()
    const items = (await Promise.all(keys.map((k) => storage.getItem(k)))).filter(Boolean)
    // 최신순 정렬
    items.sort((a, b) => String(b?.createdAt || '').localeCompare(String(a?.createdAt || '')))
    return { ok: true, count: items.length, items }
  } catch (e) {
    return { ok: false, error: 'storage_unavailable', items: [] }
  }
})
