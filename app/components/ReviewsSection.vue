<script setup>
const reviews = [
  { title: '윗집 누수 깔끔하게 해결', body: '윗집 누수 때문에 천장에 곰팡이가 심하게 생겼는데, 진도누수에서 정확히 위치 찾아주시고 보험처리 서류까지 챙겨주셔서 윗집과도 깔끔하게 해결됐습니다.', prefix: '2026년 · 충남 천안 · ', name: '김○○ 고객님' },
  { title: '미세누수도 정확하게 잡아주셨어요', body: '바닥이 미세하게 울렁거리는데 다른 업체는 못 찾는다고 그러더라구요. 진도누수에서 음파장비로 정확한 위치 찾아서 작은 부분만 타공해서 시공해주셨네요.', prefix: '2026년 · 충남 아산 · ', name: '박○○ 고객님' },
  { title: '새벽 출동에 감사드립니다', body: '새벽에 갑자기 물이 새서 정신이 없었는데 전화 한 통에 한 시간 만에 와주셨어요. 응급 처치부터 다음날 본 시공까지 빠르게 진행해주셔서 큰 피해 없이 끝났습니다.', prefix: '2026년 · 충남 당진 · ', name: '이○○ 고객님' },
  { title: '공장 외벽 차수 만족스럽습니다', body: '공장 외벽으로 우수가 유입돼서 골치였는데 배면차수 시공으로 해결해주셨습니다. 생산라인 안 멈추게 야간에 맞춰 작업해주신 점도 좋았습니다.', prefix: '2025년 · 충남 서산 · ', name: '최○○ 고객님' },
  { title: '복원까지 한 번에 끝났어요', body: '누수 잡고 천장 도배·페인트까지 한 팀에서 다 해주셔서 정말 편했습니다. 다른 업체 따로 부를 필요가 없어서 시간도 절약되고, 마감 품질도 깔끔했네요.', prefix: '2025년 · 대전 유성구 · ', name: '정○○ 고객님' },
  { title: '보험처리 서류 완벽했어요', body: '손해보험 청구하려면 진단보고서가 필요한데 진도누수에서 작업 전후 사진, 견적, 진단서까지 보험사 양식에 맞춰 다 챙겨주셨습니다. 청구도 한 번에 통과했어요.', prefix: '2025년 · 세종시 · ', name: '한○○ 고객님' },
]
</script>

<template>
  <section id="reviews" class="reviews section-pad">
    <div class="container">
      <div class="section-head-center">
        <div class="section-tag">REVIEWS</div>
        <h2 class="section-title">고객들이 말하는 <span class="accent">진도누수 후기</span></h2>
        <p class="section-sub">진도누수를 선택한 이유, 후기에서 확인하세요.</p>
      </div>

      <div class="reviews-grid">
        <div v-for="r in reviews" :key="r.title" class="review-card">
          <div class="quote">"</div>
          <div class="review-stars">★★★★★</div>
          <h4 class="review-title">{{ r.title }}</h4>
          <p class="review-body">{{ r.body }}</p>
          <div class="review-author">{{ r.prefix }}<strong>{{ r.name }}</strong></div>
        </div>
      </div>
    </div>
  </section>
</template>
