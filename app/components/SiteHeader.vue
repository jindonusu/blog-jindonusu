<script setup>
const { isOpen, toggle } = useMenu()
</script>

<template>
  <!-- ============ TOP BAR ============ -->
  <div class="topbar">
    <div class="topbar-inner">
      <div class="topbar-left">
        <strong>
          <svg class="icon" style="color: var(--gold); width: 0.7em; height: 0.7em"><use href="#icon-dot" /></svg>
          24시간 365일 긴급출동
        </strong>
        새벽·주말·공휴일 상관없이 즉시 상담
      </div>
      <div class="topbar-right">
        <a href="#blog">블로그</a>
        <a href="#works">시공사례</a>
        <a href="tel:01039455566">상담문의</a>
      </div>
    </div>
  </div>

  <!-- ============ HEADER ============ -->
  <header class="header">
    <div class="header-inner">
      <a href="#top" class="logo">
        <svg class="logo-svg"><use href="#jindo-logo" /></svg>
        <div>
          <div class="logo-text-main">진도누수</div>
          <div class="logo-text-sub">JINDO LEAK SOLUTION</div>
        </div>
      </a>
      <nav class="nav-main">
        <a href="#services">서비스</a>
        <a href="#process">진단·시공</a>
        <a href="#works">시공사례</a>
        <a href="#blog">현장블로그</a>
        <a href="#reviews">고객후기</a>
        <a href="#contact">상담문의</a>
      </nav>
      <div class="header-cta">
        <div class="phone-block">
          <div class="label">24시간 전화상담</div>
          <a href="tel:01039455566" class="num">010-3945-5566</a>
        </div>
        <a href="#contact" class="kakao-btn">
          <svg class="icon"><use href="#icon-chat" /></svg> 카톡상담
        </a>
        <button class="hamburger" :class="{ open: isOpen }" aria-label="메뉴 열기" @click="toggle">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>
