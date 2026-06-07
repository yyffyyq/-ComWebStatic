/**
 * v-lazy 图片懒加载自定义指令
 *
 * 使用方式：
 *   <img v-lazy="imageUrl" />          -- 默认懒加载
 *   <img v-lazy.eager="imageUrl" />    -- 立即加载（用于首屏关键图片）
 *
 * 原理：
 *   1. 初始渲染时将真实 src 保存到 data-src，img 显示占位背景
 *   2. 通过 IntersectionObserver 监听元素是否进入视口
 *   3. 进入视口后替换为真实 src 并移除监听
 */

// 透明 1x1 占位图（避免 img 无 src 时的 broken icon）
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// 共享的 IntersectionObserver 实例（提升性能）
let observer = null
const observedElements = new Map()

/**
 * 获取或创建全局 IntersectionObserver
 */
function getObserver() {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const realSrc = el.getAttribute('data-src')
          if (realSrc) {
            el.src = realSrc
            el.removeAttribute('data-src')
            el.classList.add('lazy-loaded')
          }
          observer.unobserve(el)
          observedElements.delete(el)
        }
      })
    },
    {
      // 提前 200px 开始加载，用户滚动时更流畅
      rootMargin: '200px 0px',
      threshold: 0.01,
    },
  )

  return observer
}

export const vLazy = {
  mounted(el, binding) {
    // 仅对 img 元素生效
    if (el.tagName !== 'IMG') return

    const { value: realSrc, modifiers } = binding

    // eager 模式：立即加载，不做懒加载处理
    if (modifiers.eager) {
      el.src = realSrc
      return
    }

    // 保存真实 src，设置占位图
    el.setAttribute('data-src', realSrc)
    el.src = PLACEHOLDER
    el.classList.add('lazy-pending')

    // 添加过渡样式类
    el.style.transition = 'opacity 0.3s ease'
    el.style.opacity = '0'

    // 注册到 Observer
    const obs = getObserver()
    obs.observe(el)
    observedElements.set(el, true)

    // 图片加载完成后显示
    const onLoad = () => {
      el.style.opacity = '1'
      el.classList.remove('lazy-pending')
      el.removeEventListener('load', onLoad)
    }
    el.addEventListener('load', onLoad)
  },

  // 支持动态更新 src
  updated(el, binding) {
    if (el.tagName !== 'IMG') return
    const { value: newSrc, modifiers } = binding

    if (modifiers.eager) {
      el.src = newSrc
      return
    }

    // 如果已加载完成且 src 变化，直接更新
    if (el.classList.contains('lazy-loaded')) {
      el.src = newSrc
      return
    }

    // 否则更新 data-src
    el.setAttribute('data-src', newSrc)
  },

  // 卸载时清理
  unmounted(el) {
    if (observer && observedElements.has(el)) {
      observer.unobserve(el)
      observedElements.delete(el)
    }
  },
}
