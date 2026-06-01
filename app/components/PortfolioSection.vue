<script setup>
const tabs = ['전체', '아파트 누수', '배관 누수', '비파괴 시공', '배면차수', '복원공사']
const activeTab = ref(0)

// 시공사례 카드 (탭은 시각적 표시 전용 — 원본과 동일하게 필터링은 하지 않음)
const works = [
  { label: '배관누수', area: 'CASE 001 · 단독주택', title: '지중 온수배관 미세누수 정밀탐지', img: '/images/work-01.jpg' },
  { label: '욕실누수', area: 'CASE 002 · 아파트', title: '보일러 분배기 누수 진단 및 교체', img: '/images/work-02.jpg' },
  { label: '비파괴', area: 'CASE 003 · 주방', title: '주방 벽체 분배기 핀포인트 타공', img: '/images/work-03.jpg' },
  { label: '배면차수', area: 'CASE 004 · 단독주택', title: '외벽 균열 우레탄 차수 시공', img: '/images/work-04.jpg' },
  { label: '아파트누수', area: 'CASE 005 · 아파트 화장실', title: '윗집 욕실 천장 누수 정밀 진단', img: '/images/work-05.jpg' },
  { label: '복원공사', area: 'CASE 006 · 빌라 천장', title: '피해층 천장 개구 점검 및 복원', img: '/images/work-06.jpg' },
  { label: '배관누수', area: 'CASE 007 · 옥외', title: '지중 배수관 연결부 부분 교체', img: '/images/work-07.jpg' },
  { label: '정밀장비', area: 'CASE 008 · 바닥누수', title: 'DS-9000 음파탐지 정밀진단', img: '/images/work-08.jpg' },
]
</script>

<template>
  <section id="works" class="portfolio section-pad">
    <div class="container">
      <div class="section-head-center">
        <div class="section-tag">PORTFOLIO</div>
        <h2 class="section-title">전문가의 손길로 해결된 <span class="accent">실제 시공현장</span></h2>
        <p class="section-sub">아파트 욕실 미세누수부터 공장 외벽 차수까지 — 실제 작업 기록입니다.</p>
      </div>

      <div class="portfolio-tabs">
        <button
          v-for="(tab, i) in tabs"
          :key="tab"
          class="pf-tab"
          :class="{ active: i === activeTab }"
          @click="activeTab = i"
        >
          {{ tab }}
        </button>
      </div>

      <div class="portfolio-grid">
        <div v-for="w in works" :key="w.title" class="pf-card">
          <div class="pf-img">
            <span class="pf-label">{{ w.label }}</span>
            <img :src="w.img" alt="" loading="lazy" />
          </div>
          <div class="pf-body">
            <div class="area">{{ w.area }}</div>
            <h4>{{ w.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
