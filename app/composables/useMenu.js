// 모바일 햄버거 메뉴 열림 상태를 헤더·메뉴 패널이 공유 (SSR-safe useState)
export function useMenu() {
  const isOpen = useState('menuOpen', () => false)
  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }
  const toggle = () => { isOpen.value = !isOpen.value }
  return { isOpen, open, close, toggle }
}
