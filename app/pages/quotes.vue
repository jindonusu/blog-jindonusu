<script setup>
useHead({
  title: '견적 신청 내역 — 진도누수 관리자',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const userId = ref('')
const token = ref('')
const items = ref([])
const loaded = ref(false)
const loading = ref(false)
const error = ref('')

function fmt(iso) {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso || ''
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

async function load() {
  if (!userId.value || !token.value) {
    error.value = '아이디와 비밀번호를 입력하세요.'
    return
  }
  error.value = ''
  loading.value = true
  try {
    const res = await $fetch('/api/quotes', {
      headers: { 'x-admin-user': userId.value, 'x-admin-token': token.value },
    })
    items.value = res.items || []
    loaded.value = true
    if (import.meta.client) {
      sessionStorage.setItem('jindo_admin_user', userId.value)
      sessionStorage.setItem('jindo_admin_token', token.value)
    }
  } catch (e) {
    if (e?.statusCode === 401 || e?.response?.status === 401) {
      error.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
    } else {
      error.value = '내역을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const u = sessionStorage.getItem('jindo_admin_user')
  const t = sessionStorage.getItem('jindo_admin_token')
  if (u && t) {
    userId.value = u
    token.value = t
    load()
  }
})
</script>

<template>
  <div class="admin-wrap">
    <div class="admin-card">
      <h1>견적 신청 내역</h1>
      <p class="sub">진도누수 관리자 전용 페이지</p>

      <form class="login-row" @submit.prevent="load">
        <input
          v-model="userId"
          type="text"
          placeholder="아이디"
          autocomplete="username"
        />
        <input
          v-model="token"
          type="password"
          placeholder="비밀번호"
          autocomplete="current-password"
        />
        <button type="submit" :disabled="loading">{{ loading ? '불러오는 중…' : '로그인' }}</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-if="loaded" class="admin-card">
      <div class="list-head">
        <strong>총 {{ items.length }}건</strong>
        <button class="ghost" :disabled="loading" @click="load">새로고침</button>
      </div>

      <p v-if="!items.length" class="empty">아직 접수된 견적 신청이 없습니다.</p>

      <div v-else class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>접수일시</th>
              <th>지역</th>
              <th>서비스</th>
              <th>성함</th>
              <th>연락처</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="q in items" :key="q.id">
              <td class="nowrap">{{ fmt(q.createdAt) }}</td>
              <td>{{ q.region }}</td>
              <td>{{ q.service }}</td>
              <td>{{ q.name }}</td>
              <td><a :href="`tel:${q.phone.replace(/[^0-9]/g, '')}`">{{ q.phone }}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-wrap {
  max-width: 880px;
  margin: 0 auto;
  padding: 48px 20px 80px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.admin-card {
  background: var(--bg-card, #fff);
  border: 1px solid var(--line, #e6e2da);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(30, 58, 95, 0.05);
}
.admin-card h1 {
  font-size: 24px;
  font-weight: 900;
  color: var(--ink, #2a2a2a);
  letter-spacing: -0.5px;
}
.admin-card .sub {
  color: var(--muted, #8b8b8b);
  font-size: 13px;
  margin: 6px 0 20px;
}
.login-row {
  display: flex;
  gap: 10px;
}
.login-row input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid var(--line, #e6e2da);
  border-radius: 8px;
  font-size: 15px;
  background: var(--bg, #fafaf7);
}
.login-row input:focus {
  outline: none;
  border-color: var(--primary, #1e3a5f);
  background: #fff;
}
.login-row button,
.list-head button {
  background: var(--primary, #1e3a5f);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}
.login-row button:disabled {
  opacity: 0.6;
  cursor: default;
}
.list-head button.ghost {
  background: transparent;
  color: var(--primary, #1e3a5f);
  border: 1px solid var(--line, #e6e2da);
  padding: 8px 16px;
}
.error {
  color: var(--accent, #b85042);
  font-size: 13px;
  font-weight: 700;
  margin-top: 12px;
}
.list-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.list-head strong {
  font-size: 16px;
  color: var(--ink, #2a2a2a);
}
.empty {
  color: var(--muted, #8b8b8b);
  text-align: center;
  padding: 30px 0;
}
.table-scroll {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th,
td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line, #e6e2da);
}
th {
  font-size: 12px;
  font-weight: 800;
  color: var(--muted, #8b8b8b);
  background: var(--bg-soft, #f2f0eb);
  white-space: nowrap;
}
td.nowrap {
  white-space: nowrap;
  color: var(--muted, #8b8b8b);
}
td a {
  color: var(--accent, #b85042);
  font-weight: 700;
  text-decoration: none;
}
</style>
