<script setup>
const form = reactive({ region: '', service: '', name: '', phone: '' })
const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

async function submitQuote() {
  errorMsg.value = ''
  if (!form.name || !form.phone) {
    errorMsg.value = '성함과 연락처를 입력해 주세요.'
    return
  }
  submitting.value = true
  try {
    const res = await $fetch('/api/quote', { method: 'POST', body: { ...form } })
    if (res?.ok) {
      submitted.value = true
    } else {
      errorMsg.value = '접수 중 문제가 발생했습니다. 전화로 문의해 주세요.'
    }
  } catch {
    errorMsg.value = '접수 중 문제가 발생했습니다. 전화로 문의해 주세요.'
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.region = ''
  form.service = ''
  form.name = ''
  form.phone = ''
  submitted.value = false
  errorMsg.value = ''
}
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-inner">
      <div>
        <div class="hero-badge"><span class="dot"></span> 24시간 365일 긴급출동 가능</div>
        <h1 class="hero-title">
          타업체도 못 잡은 누수,<br />
          <span class="underline">진도누수</span>가<br />
          <span class="gold">확실하게</span> 잡습니다.
        </h1>
        <p class="hero-sub">
          정밀 음파탐지 장비와 10년 이상의 현장 경험으로<br />
          원인부터 찾고, 최소 파손으로 마무리합니다.
        </p>
        <div class="hero-tags">
          <span class="hero-tag"><svg class="icon" style="color: var(--gold)"><use href="#icon-check" /></svg> 욕실누수</span>
          <span class="hero-tag"><svg class="icon" style="color: var(--gold)"><use href="#icon-check" /></svg> 화장실누수</span>
          <span class="hero-tag"><svg class="icon" style="color: var(--gold)"><use href="#icon-check" /></svg> 아랫집 천장누수</span>
          <span class="hero-tag"><svg class="icon" style="color: var(--gold)"><use href="#icon-check" /></svg> 비파괴 방수시공</span>
          <span class="hero-tag"><svg class="icon" style="color: var(--gold)"><use href="#icon-check" /></svg> 누수보험처리</span>
        </div>
        <div class="hero-actions">
          <a href="tel:01039455566" class="btn-accent"><svg class="icon"><use href="#icon-phone" /></svg> 지금 바로 전화상담 →</a>
          <a href="#contact" class="btn-white">무료 견적문의</a>
        </div>
      </div>

      <div class="quote-card">
        <h3><svg class="icon" style="color: var(--accent)"><use href="#icon-bolt" /></svg> 빠른 <span class="accent">무료 견적</span> 신청</h3>
        <div class="quote-sub">3초 안에 신청 · 1분 이내 회신</div>

        <template v-if="!submitted">
          <label>지역 선택</label>
          <select v-model="form.region">
            <option value="">지역을 선택하세요</option>
            <option>천안</option><option>아산</option><option>당진</option>
            <option>서산</option><option>보령</option><option>홍성</option>
            <option>예산</option><option>태안</option><option>청양</option>
            <option>논산</option><option>세종</option><option>대전</option>
          </select>
          <label>서비스 종류</label>
          <select v-model="form.service">
            <option value="">서비스를 선택하세요</option>
            <option>욕실 / 화장실 누수</option>
            <option>아랫집 천장누수</option>
            <option>배관누수 / 특수미세누수</option>
            <option>비파괴 방수시공</option>
            <option>배면차수 시공</option>
            <option>누수보험처리</option>
            <option>피해층 복원공사</option>
          </select>
          <div class="row">
            <div><label>성함</label><input v-model="form.name" type="text" placeholder="홍길동" /></div>
            <div><label>연락처</label><input v-model="form.phone" type="tel" placeholder="010-0000-0000" /></div>
          </div>
          <button class="submit" :disabled="submitting" @click="submitQuote">
            {{ submitting ? '접수 중…' : '실시간 견적 신청하기 →' }}
          </button>
          <div v-if="errorMsg" class="note" style="color: var(--accent)">{{ errorMsg }}</div>
          <div v-else class="note"><svg class="icon" style="color: var(--accent)"><use href="#icon-clock" /></svg> <strong>오늘 신청 시 최우선 출동</strong></div>
        </template>

        <div v-else class="quote-done">
          <svg class="quote-done-ico"><use href="#icon-check-circle" /></svg>
          <div class="quote-done-title">견적 신청이 접수되었습니다</div>
          <p class="quote-done-desc"><strong>{{ form.name }}</strong> 님, 입력해 주신 연락처로<br />빠르게 연락드리겠습니다. 감사합니다.</p>
          <button class="quote-done-again" @click="resetForm">새 견적 신청하기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote-done {
  text-align: center;
  padding: 18px 6px 8px;
}
.quote-done-ico {
  width: 56px;
  height: 56px;
  fill: #2e7d52;
  margin-bottom: 14px;
}
.quote-done-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -0.5px;
  margin-bottom: 10px;
}
.quote-done-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 22px;
}
.quote-done-desc strong {
  color: var(--accent);
}
.quote-done-again {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--primary);
  border-radius: 8px;
  padding: 11px 22px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
}
.quote-done-again:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
</style>
