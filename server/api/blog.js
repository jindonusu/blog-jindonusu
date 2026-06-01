/* ============================================================
   /api/blog - 네이버 블로그 RSS 파싱 (Nitro 서버 라우트)
   ------------------------------------------------------------
   호출: /api/blog?id=nusussakjaba   또는   /api/blog?id=abbiok
   응답: { posts: [{title, link, date, desc, thumb}, ...] }
   캐시: Cloudflare 엣지에서 10분 캐시 (s-maxage)
   ※ Cloudflare Pages 배포 시 자동으로 _worker.js 안에서 실행됩니다.
============================================================ */

const ALLOWED = ['nusussakjaba', 'abbiok']

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
}

function pickTag(block, tag) {
  // CDATA 와 일반 텍스트 둘 다 지원
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i')
  const m = block.match(re)
  return m ? m[1].trim() : ''
}

function formatDate(pubDate) {
  if (!pubDate) return ''
  const d = new Date(pubDate)
  if (isNaN(d.getTime())) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

function parseRss(xml) {
  const posts = []
  const itemRe = /<item>([\s\S]*?)<\/item>/g
  let m
  while ((m = itemRe.exec(xml)) !== null && posts.length < 6) {
    const block = m[1]
    const title = pickTag(block, 'title')
    const link = pickTag(block, 'link')
    const pubDate = pickTag(block, 'pubDate')
    const descRaw = pickTag(block, 'description')

    const thumbMatch = descRaw.match(/<img[^>]+src=["']([^"']+)["']/i)
    // 네이버 썸네일 URL 정규화: http(또는 //)→https 로 강제해
    // HTTPS 페이지에서의 혼합콘텐츠 차단(이미지 엑박)을 방지한다.
    let thumb = thumbMatch ? thumbMatch[1] : ''
    if (thumb.startsWith('//')) thumb = 'https:' + thumb
    else if (thumb.startsWith('http://')) thumb = 'https://' + thumb.slice(7)

    let desc = decodeEntities(descRaw.replace(/<[^>]+>/g, ' '))
    desc = desc.replace(/\s+/g, ' ').trim()
    if (desc.length > 120) desc = desc.substring(0, 120) + '...'

    posts.push({
      title: decodeEntities(title),
      link,
      date: formatDate(pubDate),
      desc,
      thumb,
    })
  }
  return posts
}

export default defineEventHandler(async (event) => {
  const rawId = String(getQuery(event).id || '')
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

  setResponseHeader(event, 'Access-Control-Allow-Origin', '*')

  if (!ALLOWED.includes(id)) {
    setResponseStatus(event, 400)
    return { error: 'invalid blog id', posts: [] }
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    const rssResp = await fetch(`https://rss.blog.naver.com/${id}.xml`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteBlogFetcher/1.0)' },
      signal: controller.signal,
    })
    clearTimeout(timer)

    if (!rssResp.ok) throw new Error('upstream ' + rssResp.status)
    const xml = await rssResp.text()
    const posts = parseRss(xml)

    // Cloudflare CDN 엣지 캐시 (10분, stale 24시간)
    setResponseHeader(
      event,
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=86400',
    )
    return { posts }
  } catch (err) {
    return { posts: [], error: 'fetch_failed' }
  }
})
