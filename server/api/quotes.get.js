/* ============================================================
   GET /api/quotes — 견적 신청 내역 조회 (관리자 전용)
   ------------------------------------------------------------
   인증: x-admin-user / x-admin-token 헤더가 runtimeConfig 값과 일치해야 함
        (기본 admin / admin1234, 운영에서 NUXT_ADMIN_USER·NUXT_ADMIN_TOKEN 로 변경 가능)
============================================================ */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const user = getHeader(event, 'x-admin-user')
  const token = getHeader(event, 'x-admin-token')

  if (user !== config.adminUser || token !== config.adminToken) {
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
