import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 设备判断组合式函数
 * 基于 window.matchMedia 提供响应式的 isMobile 变量
 * 兼容不支持 matchMedia 的老旧浏览器（默认返回 false）
 */
export function useDevice() {
  const isMobile = ref(false)
  const isTablet = ref(false)

  let mediaQueryMobile = null
  let mediaQueryTablet = null

  const handleChangeMobile = (e) => {
    isMobile.value = e.matches
  }

  const handleChangeTablet = (e) => {
    isTablet.value = e.matches
  }

  onMounted(() => {
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        mediaQueryMobile = window.matchMedia('(max-width: 768px)')
        mediaQueryTablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)')

        isMobile.value = mediaQueryMobile.matches
        isTablet.value = mediaQueryTablet.matches

        mediaQueryMobile.addEventListener('change', handleChangeMobile)
        mediaQueryTablet.addEventListener('change', handleChangeTablet)
      }
    } catch {
      // 兼容不支持 matchMedia 的老旧浏览器
      isMobile.value = false
      isTablet.value = false
    }
  })

  onUnmounted(() => {
    try {
      if (mediaQueryMobile) {
        mediaQueryMobile.removeEventListener('change', handleChangeMobile)
      }
      if (mediaQueryTablet) {
        mediaQueryTablet.removeEventListener('change', handleChangeTablet)
      }
    } catch {
      // 静默处理清理错误
    }
  })

  return {
    isMobile,
    isTablet,
  }
}
