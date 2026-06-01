<script setup>
import { BLOGS } from '~/utils/blogData'

const tabKeys = ['nusussakjaba', 'abbiok']
const activeKey = ref('nusussakjaba')
const posts = ref([])
const loading = ref(true)

const fullLink = computed(() => BLOGS[activeKey.value].url)
const blogLabel = computed(() => BLOGS[activeKey.value].label)

// 네이버 썸네일이 차단(403)되거나 비어 있을 때 보여줄 로컬 시공사진 (카드마다 다르게)
function localImg(i) {
  return `/images/work-${String((i % 10) + 1).padStart(2, '0')}.jpg`
}
function onImgError(e, i) {
  e.target.onerror = null
  e.target.src = localImg(i)
}

async function load(key) {
  activeKey.value = key
  loading.value = true
  try {
    // Nitro 서버 라우트 호출 (서버에서 RSS 파싱 후 JSON 반환)
    const data = await $fetch('/api/blog', { query: { id: key }, timeout: 8000 })
    if (!data?.posts?.length) throw new Error('empty')
    posts.value = data.posts.slice(0, 6)
  } catch {
    // 서버 다운 / RSS 차단 시 정적 더미 데이터로 fallback
    posts.value = BLOGS[key].fallback.slice(0, 6)
  } finally {
    loading.value = false
  }
}

onMounted(() => load('nusussakjaba'))
</script>

<template>
  <section id="blog" class="blog-section section-pad">
    <div class="container">
      <div class="section-head-center">
        <div class="section-tag">FIELD BLOG</div>
        <h2 class="section-title">현장에서 매일 올라오는 <span class="accent">시공 기록</span></h2>
        <p class="section-sub">진도누수의 네이버 블로그 글을 사이트 안에서 바로 확인하세요. 더 많은 사례는 블로그 원문에서 보실 수 있습니다.</p>
      </div>

      <div class="blog-tabs">
        <button
          v-for="key in tabKeys"
          :key="key"
          class="blog-tab"
          :class="{ active: key === activeKey }"
          @click="load(key)"
        >
          <span class="blog-tab-n">N</span> {{ BLOGS[key].tabLabel }}
        </button>
      </div>

      <div class="blog-feed">
        <div v-if="loading" class="blog-loading">
          <svg class="icon"><use href="#icon-news" /></svg> 블로그 글을 불러오는 중입니다...
        </div>
        <template v-else>
          <a
            v-for="(p, i) in posts"
            :key="p.link + '-' + i"
            :href="p.link"
            target="_blank"
            rel="noopener"
            class="post-card"
          >
            <div class="post-thumb">
              <span class="post-blog-label">{{ blogLabel }}</span>
              <img
                :src="p.thumb || localImg(i)"
                alt=""
                loading="lazy"
                referrerpolicy="no-referrer"
                @error="onImgError($event, i)"
              />
            </div>
            <div class="post-body">
              <div class="post-meta"><svg class="icon" style="color: var(--accent)"><use href="#icon-calendar" /></svg> {{ p.date }}</div>
              <h4>{{ p.title }}</h4>
              <p>{{ p.desc }}</p>
              <span class="post-link">원문 보기 →</span>
            </div>
          </a>
        </template>
      </div>

      <div class="blog-cta">
        <a :href="fullLink" target="_blank" rel="noopener">
          <span class="naver-icon">N</span> 블로그에서 전체 글 보기 →
        </a>
      </div>
    </div>
  </section>
</template>
