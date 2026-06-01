<script setup>
const regions = [
  { name: '천안', desc: '아파트·빌라 화장실·아랫집 천장누수 다수 시공' },
  { name: '아산', desc: '신축·구축 아파트 욕실 누수 / 보일러 분배기' },
  { name: '당진·서산', desc: '단독주택 옥상 방수 · 외벽 균열 차수 시공' },
  { name: '보령·홍성·예산·태안', desc: '충남 서부권 욕실누수·배관누수 출동 가능' },
  { name: '청양·논산', desc: '충남 동남부 정밀 누수탐지 · 비파괴 시공' },
  { name: '세종·대전', desc: '아파트 화장실·천장누수 보험처리 전문' },
]
</script>

<template>
  <section class="coverage section-pad">
    <div class="container">
      <div class="coverage-inner">
        <div class="coverage-content">
          <div class="section-tag">COVERAGE AREA</div>
          <h2 class="section-title">충청권 12개 지역<br /><span class="primary">즉시 출동합니다.</span></h2>
          <p class="section-sub">천안·아산·당진·서산·보령·홍성·예산·태안·청양·논산·세종·대전 — 충남·대전·세종 권역에 한해 빠른 출동과 책임 시공을 약속합니다.</p>

          <ul class="region-list">
            <li v-for="r in regions" :key="r.name">
              <div class="check"><svg style="width: 14px; height: 14px; fill: currentColor"><use href="#icon-dot" /></svg></div>
              <div>
                <div class="name">{{ r.name }}</div>
                <div class="desc">{{ r.desc }}</div>
              </div>
            </li>
          </ul>
        </div>

        <div class="coverage-map">
          <iframe
            src="https://maps.google.com/maps?q=%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84&amp;t=&amp;z=8&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            title="진도누수 출동 가능 지역 — 충청남도·세종·대전"
          ></iframe>
          <div class="coverage-region-label">CHUNGCHEONG · 12 CITIES — 충남 · 세종 · 대전</div>
          <div class="coverage-stats">
            <div class="stat"><div class="v">12<small style="font-size: 14px">개</small></div><div class="l">출동 가능 지역</div></div>
            <div class="stat"><div class="v">24<small style="font-size: 14px">H</small></div><div class="l">긴급출동 대기</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
