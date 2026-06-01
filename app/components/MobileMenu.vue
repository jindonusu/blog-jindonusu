<script setup>
const { isOpen, close } = useMenu()

// 메뉴 열림 시 body 스크롤 잠금
watch(isOpen, (open) => {
  if (import.meta.client) document.body.classList.toggle('menu-open', open)
})

function onKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) close()
}
function onResize() {
  if (window.innerWidth > 1024 && isOpen.value) close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <div class="mobile-menu" :class="{ open: isOpen }" :aria-hidden="!isOpen">
    <div class="mobile-menu-header">
      <div class="mobile-menu-brand">
        <svg style="width: 36px; height: 36px"><use href="#jindo-logo" /></svg>
        <span>진도누수</span>
      </div>
      <button class="mobile-menu-close" aria-label="메뉴 닫기" @click="close">
        <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
    <nav class="mobile-menu-nav" @click="close">
      <a href="#services">서비스</a>
      <a href="#process">진단·시공 절차</a>
      <a href="#works">시공사례</a>
      <a href="#blog">현장블로그</a>
      <a href="#reviews">고객후기</a>
      <a href="#contact">상담문의</a>
    </nav>
    <div class="mobile-menu-foot">
      <div class="mobile-menu-coverage">📍 충남 · 대전 · 세종 12개 지역</div>
      <a href="tel:01039455566" class="mobile-cta-phone">
        <svg class="icon"><use href="#icon-phone" /></svg> 010-3945-5566
      </a>
      <a href="#contact" class="mobile-cta-chat" @click="close">
        <svg class="icon"><use href="#icon-chat" /></svg> 카카오톡 상담
      </a>
    </div>
  </div>
  <div class="mobile-menu-overlay" :class="{ open: isOpen }" @click="close"></div>
</template>
