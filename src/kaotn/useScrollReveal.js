import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 滚动显示动画 Composable
 * 当元素进入视口时触发显示，用于实现元素渐入、滑入等效果
 * @param {Object} options - 配置项
 * @param {number} options.threshold - 交叉比例阈值（0~1）
 * @param {string} options.rootMargin - 根边距
 * @returns {Object} { targetRef, isVisible }
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.2, rootMargin = '0px 0px -50px 0px' } = options
  const targetRef = ref(null)
  const isVisible = ref(false)
  let observer = null

  onMounted(() => {
    if (!targetRef.value) return

    /**
     * 创建 IntersectionObserver 实例
     * 监听目标元素与视口的交叉状态
     */
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当元素进入视口且未显示过时，触发显示
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
      observer.disconnect()
    }
  })

  return { targetRef, isVisible }
}
