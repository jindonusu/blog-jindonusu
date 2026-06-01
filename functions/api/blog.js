/* ============================================================
   /api/blog - 네이버 블로그 RSS 파싱 (Cloudflare Pages Function)
   ------------------------------------------------------------
   호출: /api/blog?id=nusussakjaba   또는   /api/blog?id=abbiok
   응답: { posts: [{title, link, date, desc, thumb}, ...] }
   캐시: Cloudflare Edge 에서 10분 캐시 + 업스트림 RSS 캐시
============================================================ */

const ALLOWED = ['nusussakjaba', 'abbiok'];

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function pickTag(block, tag) {
  // CDATA 와 일반 텍스트 둘 다 지원
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  const m = block.match(re);
  return m ? m[1].trim() : '';
}

function formatDate(pubDate) {
  if (!pubDate) return '';
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

function parseRss(xml) {
  const posts = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null && posts.length < 6) {
    const block = m[1];
    const title = pickTag(block, 'title');
    const link = pickTag(block, 'link');
    const pubDate = pickTag(block, 'pubDate');
    const descRaw = pickTag(block, 'description');

    const thumbMatch = descRaw.match(/<img[^>]+src=["']([^"']+)["']/i);
    const thumb = thumbMatch ? thumbMatch[1] : '';

    let desc = decodeEntities(descRaw.replace(/<[^>]+>/g, ' '));
    desc = desc.replace(/\s+/g, ' ').trim();
    if (desc.length > 120) desc = desc.substring(0, 120) + '...';

    posts.push({
      title: decodeEntities(title),
      link,
      date: formatDate(pubDate),
      desc,
      thumb,
    });
  }
  return posts;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const rawId = url.searchParams.get('id') || '';
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const baseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  };

  if (!ALLOWED.includes(id)) {
    return new Response(
      JSON.stringify({ error: 'invalid blog id', posts: [] }),
      { status: 400, headers: baseHeaders }
    );
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const rssResp = await fetch(`https://rss.blog.naver.com/${id}.xml`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteBlogFetcher/1.0)' },
      signal: controller.signal,
      // Cloudflare 업스트림 캐시 (10분)
      cf: { cacheTtl: 600, cacheEverything: true },
    });
    clearTimeout(timer);

    if (!rssResp.ok) throw new Error('upstream ' + rssResp.status);
    const xml = await rssResp.text();
    const posts = parseRss(xml);

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: {
        ...baseHeaders,
        // Cloudflare CDN 에서 엣지 캐시 (10분, stale 24시간)
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ posts: [], error: 'fetch_failed' }),
      { status: 200, headers: baseHeaders }
    );
  }
}
