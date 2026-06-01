// 스크롤 시 카드가 부드럽게 나타나는 reveal 애니메이션 (클라이언트 전용)
// 정적 마크업에는 reveal 클래스를 넣지 않고 마운트 후 주입 → JS 미동작 시에도 콘텐츠는 항상 보임
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const selector = '.commit-card, .service-card, .process-card, .pf-card, .review-card'
    const els = Array.from(document.querySelectorAll(selector))
    if (!els.length) return

    els.forEach((el) => el.classList.add('reveal'))

    // 이미 화면에 보이는 요소는 즉시 표시 (깜빡임 방지)
    const inView = (el) => el.getBoundingClientRect().top < window.innerHeight * 0.9
    els.forEach((el) => { if (inView(el)) el.classList.add('in') })

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => { if (!el.classList.contains('in')) io.observe(el) })
  })
})
