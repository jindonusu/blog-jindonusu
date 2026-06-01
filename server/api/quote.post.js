/* ============================================================
   POST /api/quote — 견적 신청 접수 + 저장
   ------------------------------------------------------------
   저장소: Nitro useStorage('quotes')
     - 로컬 개발: 파일시스템(.data/quotes)  → 바로 동작
     - 운영(Cloudflare): KV 바인딩 'QUOTES' → wrangler.toml/대시보드에서 연결
   저장소가 아직 없어도 사이트·빌드는 정상 (접수만 실패 응답).
============================================================ */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const clean = (v, max) => String(v ?? '').trim().slice(0, max)
  const region = clean(body?.region, 50)
  const service = clean(body?.service, 60)
  const name = clean(body?.name, 50)
  const phone = clean(body?.phone, 30)

  if (!name || !phone) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'name_phone_required' }
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const record = {
    id,
    region: region || '(미선택)',
    service: service || '(미선택)',
    name,
    phone,
    createdAt: new Date().toISOString(),
  }

  try {
    await useStorage('quotes').setItem(id, record)
    return { ok: true }
  } catch (e) {
    // KV 미연결 등 저장 실패 — 사이트는 정상, 접수만 실패로 안내
    return { ok: false, error: 'storage_unavailable' }
  }
})
