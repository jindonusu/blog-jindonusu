<script setup>
const services = [
  { no: '01', title: '욕실 누수', desc: '욕실 바닥·벽체·배수관 누수의 원인을 정밀 진단하고 비파괴 우선으로 시공합니다.' },
  { no: '02', title: '화장실 누수', desc: '변기·세면대·타일 줄눈 누수까지 위치를 특정해 최소 파손으로 마무리합니다.' },
  { no: '03', title: '아랫집 천장누수', desc: '윗집 원인 누수를 정확히 찾아내 분쟁 없이 해결하고 보험처리까지 지원합니다.' },
  { no: '04', title: '특수미세누수', desc: '원인을 알 수 없는 미세 누수까지 음파장비로 정밀 추적해 잡아냅니다.' },
  { no: '05', title: '배관누수', desc: 'PB·동관·CD관·PVC 등 자재 특성에 맞춘 진단과 부분 교체로 해결.' },
  { no: '06', title: '비파괴 방수시공', desc: '타일·바닥 철거 없이 침투형 약제로 누수를 차단하는 시공.' },
  { no: '07', title: '배면차수 시공', desc: '지하·옹벽·외부 유입수의 경로를 벽체 배면에서 직접 차단합니다.' },
  { no: '08', title: '아파트·공장·빌딩·야외', desc: '환경별 누수 양상에 맞춘 진단 프로토콜로 어떤 현장이든 대응합니다.' },
  { no: '09', title: '누수보험처리 전문', desc: '손해사정 절차에 맞춘 진단보고서·견적·증빙사진을 제공합니다.' },
  { no: '10', title: '피해층 복원공사', desc: '천장·벽·바닥의 변색·곰팡이·타일까지 동일 팀이 마감합니다.' },
]
</script>

<template>
  <section id="services" class="services section-pad">
    <div class="container">
      <div class="section-head-center">
        <div class="section-tag">SERVICES</div>
        <h2 class="section-title">진도누수의 <span class="accent">10가지 전문분야</span></h2>
        <p class="section-sub">탐지부터 시공·보험처리·복원까지 — 한 팀이 일관된 기준으로 책임집니다.</p>
      </div>

      <div class="services-grid">
        <a v-for="s in services" :key="s.no" href="#contact" class="service-card">
          <div class="icon-circle">{{ s.no }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <span class="service-link">자세히 보기 →</span>
        </a>
      </div>
    </div>
  </section>
</template>
