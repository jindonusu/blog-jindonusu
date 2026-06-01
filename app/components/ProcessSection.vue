<script setup>
const steps = [
  { step: '01', icon: '#icon-phone', title: '상담 · 접수', desc: '전화·카톡으로 증상과 환경을 확인. 사진을 보내주시면 더 빠른 진단이 가능합니다.' },
  { step: '02', icon: '#icon-search', title: '현장 정밀 진단', desc: '음파탐지·열화상·압력 테스트로 누수 지점을 정확히 특정한 뒤 견적을 산출합니다.' },
  { step: '03', icon: '#icon-tool', title: '비파괴 우선 시공', desc: '특정된 지점만 최소 시공. 필요 시 부분 교체 또는 배면차수 약제를 적용합니다.' },
  { step: '04', icon: '#icon-check', title: '복원 · 사후', desc: '타일·도배·천장 등 피해층 복원까지 동일 팀이 진행. 보험 서류·사진도 함께 제공.' },
]
</script>

<template>
  <section id="process" class="process section-pad">
    <div class="container">
      <div class="section-head-center">
        <div class="section-tag">PROCESS</div>
        <h2 class="section-title">감으로 뜯지 않습니다.<br /><span class="primary">먼저 듣고 정확히 찾습니다.</span></h2>
        <p class="section-sub">위치를 정확히 특정하면 작업 범위가 줄고, 불필요한 파손 없이 빠르게 끝납니다.</p>
      </div>

      <div class="process-grid">
        <div v-for="p in steps" :key="p.step" class="process-card">
          <div class="process-step">STEP {{ p.step }}</div>
          <div class="process-icon"><svg style="width: 24px; height: 24px; fill: currentColor"><use :href="p.icon" /></svg></div>
          <h4>{{ p.title }}</h4>
          <p>{{ p.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
