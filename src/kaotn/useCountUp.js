import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 数字滚动动画 Composable
 * @param {number} target - 目标数值
 * @param {number} duration - 动画持续时间（毫秒）
 * @returns {Object} { current, start, reset }
 */
export function useCountUp(target, duration = 2000) {
  const current = ref(0)
  let rafId = null
  let startTime = null

  /**
   * 启动数字滚动
   */
  function start() {
    // 如果已有动画在运行，先取消
    if (rafId) cancelAnimationFrame(rafId)
    startTime = null
    current.value = 0

    /**
     * 动画帧回调
     * @param {number} timestamp - requestAnimationFrame 时间戳
     */
    function step(timestamp) {
      if (!startTime) startTime = timestamp
      // 计算已过去的时间占比（0 ~ 1）
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // 使用 easeOutQuart 缓动函数，让动画先快后慢
      const ease = 1 - Math.pow(1 - progress, 4)
      current.value = Math.floor(ease * target)

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        current.value = target // 确保最终值精确
      }
    }

    rafId = requestAnimationFrame(step)
  }

  /**
   * 重置数字为 0
   */
  function reset() {
    if (rafId) cancelAnimationFrame(rafId)
    current.value = 0
  }

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { current, start, reset }
}
