<template>
  <!-- 第二内容区域：案例中心 -->
  <section ref="sectionRef" class="section section-2">
    <div class="section-inner">
      <!-- 大标题 -->
      <h2 class="section-title" :class="{ visible: isVisible }">案例中心</h2>
      <p class="section-subtitle" :class="{ visible: isVisible }">
        专注工程建材一站式供应<br />服务水电、消防、照明及工程配套领域
      </p>

      <!-- 分类标签栏 -->
      <div class="category-tabs" :class="{ visible: isVisible }">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="tab-btn"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- 卡片展示：超过一行时启用轮播 -->
      <div class="cards-wrapper" :class="{ visible: isVisible }">
        <!-- 轮播模式 -->
        <div v-if="needCarousel" ref="viewportRef" class="cards-viewport">
          <div
            class="cards-track"
            :class="{ dragging: isDragging }"
            :style="{ transform: `translateX(${-currentIndex * cardWidth + dragOffset}px)` }"
          >
            <div
              v-for="card in filteredCards"
              :key="card.id"
              class="card-slide"
              :style="{ width: cardWidth + 'px' }"
              @click="openModal(card)"
            >
              <div class="card-inner">
                <div class="card-header">
                  <div class="card-header-left">
                    <span class="card-title">{{ card.title }}</span>
                    <span class="card-subtitle">{{ card.subtitle }}</span>
                  </div>
                  <span class="card-action">{{ card.action }}</span>
                </div>
                <div class="card-image">
                  <img v-lazy="card.image" :alt="card.title" />
                </div>
                <div class="card-body">
                  <p class="card-summary">{{ card.summary }}</p>
                  <p class="card-content">{{ card.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 网格模式（卡片数量不超过一行时） -->
        <div v-else class="cards-grid">
          <div
            v-for="card in filteredCards"
            :key="card.id"
            class="card-grid-item"
            @click="openModal(card)"
          >
            <div class="card-inner">
              <div class="card-header">
                <div class="card-header-left">
                  <span class="card-title">{{ card.title }}</span>
                  <span class="card-subtitle">{{ card.subtitle }}</span>
                </div>
                <span class="card-action">{{ card.action }}</span>
              </div>
              <div class="card-image">
                <img v-lazy="card.image" :alt="card.title" />
              </div>
              <div class="card-body">
                <p class="card-summary">{{ card.summary }}</p>
                <p class="card-content">{{ card.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 进度条（仅在轮播时显示） -->
      <div v-if="needCarousel" class="carousel-progress">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 案例详情弹窗 -->
    <transition name="modal">
      <div v-if="showModal" class="modal-mask" @click.self="closeModal">
        <div class="modal-wrapper">
          <div class="modal-container">
            <!-- 关闭按钮 -->
            <button class="modal-close" @click="closeModal">×</button>

            <!-- 弹窗内容 -->
            <div class="modal-content">
              <h3 class="modal-title">{{ selectedCard?.detail?.title }}</h3>
              <p class="modal-desc">{{ selectedCard?.detail?.description }}</p>

              <!-- 展示图片 -->
              <div class="modal-images">
                <img
                  v-for="(img, idx) in selectedCard?.detail?.images"
                  :key="idx"
                  :src="img"
                  alt="案例图片"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { categories, cardList } from '../../cords/cardData.js'
import { useScrollReveal } from '../../kaotn/useScrollReveal.js'

// 滚动显示动画：监听整个区域是否进入视口
const { targetRef: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 })

// 当前选中的分类，默认显示全部
const activeCategory = ref('all')

/**
 * 根据当前分类过滤卡片
 */
const filteredCards = computed(() => {
  if (activeCategory.value === 'all') {
    return cardList
  }
  return cardList.filter((card) => card.category === activeCategory.value)
})

// 视口 DOM 引用
const viewportRef = ref(null)
// 单张卡片宽度
const cardWidth = ref(280)
// 当前可视卡片数量（一行显示几张）
const visibleCount = ref(3)
// 当前滚动索引
const currentIndex = ref(0)
// 自动播放计时器
let autoTimer = null

// 拖拽相关
const isDragging = ref(false)
const dragOffset = ref(0)
const startX = ref(0)
const dragThreshold = 50 // 拖拽超过此阈值即切换

/**
 * 判断是否需要轮播：当卡片数量超过一行显示数量时启用
 */
const needCarousel = computed(() => {
  return filteredCards.value.length > visibleCount.value
})

/**
 * 计算最大可滚动索引
 */
const maxIndex = computed(() => {
  if (!needCarousel.value) return 0
  return Math.max(0, filteredCards.value.length - visibleCount.value)
})

/**
 * 计算指示器圆点数量
 */
const dotCount = computed(() => {
  return maxIndex.value + 1
})

/**
 * 进度条百分比
 */
const progressPercent = computed(() => {
  if (maxIndex.value === 0) return 100
  return (currentIndex.value / maxIndex.value) * 100
})

/**
 * 响应式布局：根据窗口宽度调整显示数量与卡片宽度
 */
function updateLayout() {
  const width = window.innerWidth
  if (width >= 1200) {
    visibleCount.value = 3
  } else if (width >= 768) {
    visibleCount.value = 2
  } else {
    visibleCount.value = 1
  }

  if (viewportRef.value) {
    const containerWidth = viewportRef.value.offsetWidth
    cardWidth.value = containerWidth / visibleCount.value
  }

  // 防止窗口缩小后当前索引超出范围
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value
  }
}

/**
 * 切换分类时重置轮播位置
 */
watch(activeCategory, () => {
  currentIndex.value = 0
})

/**
 * 切换到下一张
 */
function nextSlide() {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

/**
 * 切换到上一张
 */
function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = maxIndex.value
  }
}

/**
 * 跳转到指定索引
 */
function goToSlide(index) {
  currentIndex.value = index
}

/* ---------- 拖拽/滑动手势 ---------- */

function onDragStart(clientX) {
  isDragging.value = true
  startX.value = clientX
  dragOffset.value = 0
  stopAutoPlay()
}

function onDragMove(clientX) {
  if (!isDragging.value) return
  dragOffset.value = clientX - startX.value
}

function onDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false

  if (dragOffset.value > dragThreshold) {
    prevSlide()
  } else if (dragOffset.value < -dragThreshold) {
    nextSlide()
  }

  dragOffset.value = 0
  startAutoPlay()
}

function onTouchStart(e) {
  onDragStart(e.touches[0].clientX)
}

function onTouchMove(e) {
  onDragMove(e.touches[0].clientX)
}

function onTouchEnd() {
  onDragEnd()
}

function onMouseDown(e) {
  onDragStart(e.clientX)
}

function onMouseMove(e) {
  onDragMove(e.clientX)
}

function onMouseUp() {
  onDragEnd()
}

/**
 * 启动自动轮播
 */
function startAutoPlay() {
  stopAutoPlay()
  if (!needCarousel.value) return
  autoTimer = setInterval(() => {
    nextSlide()
  }, 4000)
}

/**
 * 停止自动轮播
 */
function stopAutoPlay() {
  if (autoTimer) {
    clearInterval(autoTimer)
    autoTimer = null
  }
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
  startAutoPlay()

  const viewport = viewportRef.value
  if (viewport) {
    viewport.addEventListener('touchstart', onTouchStart, { passive: true })
    viewport.addEventListener('touchmove', onTouchMove, { passive: true })
    viewport.addEventListener('touchend', onTouchEnd)
    viewport.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
  stopAutoPlay()

  const viewport = viewportRef.value
  if (viewport) {
    viewport.removeEventListener('touchstart', onTouchStart)
    viewport.removeEventListener('touchmove', onTouchMove)
    viewport.removeEventListener('touchend', onTouchEnd)
    viewport.removeEventListener('mousedown', onMouseDown)
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

// 弹窗显示状态
const showModal = ref(false)
// 当前选中的卡片详情
const selectedCard = ref(null)

/**
 * 打开弹窗，显示案例详情
 * 同时禁止背景页面滚动
 */
function openModal(card) {
  selectedCard.value = card
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

/**
 * 关闭弹窗
 * 恢复背景页面滚动
 */
function closeModal() {
  showModal.value = false
  selectedCard.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped lang="scss">
/* ==================== 区域基础样式 ==================== */
.section {
  width: 100%;
  padding: 120px 0;
}

.section-2 {
  background-color: #eaf4fa;
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* 大标题：参考图中的艺术字效果 */
.section-title {
  font-size: 48px;
  font-weight: 300;
  color: #333;
  margin-bottom: 40px;
  letter-spacing: 8px;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s ease;
}

.section-title.visible {
  opacity: 1;
  transform: translateX(0);
}

.section-subtitle {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s ease 0.1s;
}

.section-subtitle.visible {
  opacity: 1;
  transform: translateX(0);
}

/* ==================== 分类标签栏 ==================== */
.category-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 48px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s ease 0.15s;
}

.category-tabs.visible {
  opacity: 1;
  transform: translateX(0);
}

.tab-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  border-radius: 6px;
}

.tab-btn:hover {
  color: #333;
}

.tab-btn.active {
  background: #fff;
  color: #1a1a1a;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* ==================== 卡片展示容器 ==================== */
.cards-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.8s ease 0.3s;
}

.cards-wrapper.visible {
  opacity: 1;
  transform: translateX(0);
}

/* 轮播视口 */
.cards-viewport {
  overflow: hidden;
  width: 100%;
}

.cards-track {
  display: flex;
  transition: transform 0.5s ease;
}

.cards-track.dragging {
  transition: none;
}

.card-slide {
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 12px;
  cursor: pointer;
}

/* 进度条 */
.carousel-progress {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.progress-track {
  width: 200px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #005bac;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* 网格模式（非轮播时） */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}

.card-grid-item {
  cursor: pointer;
}

.card-inner {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  text-align: left;
}

.card-inner:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f5;
}

.card-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.card-subtitle {
  font-size: 13px;
  color: #999;
}

.card-action {
  font-size: 13px;
  color: #005bac;
  cursor: pointer;
}

/* 卡片图片 */
.card-image {
  width: 100%;
  height: 200px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 卡片内容 */
.card-body {
  padding: 20px;
}

.card-summary {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.6;
}

.card-content {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
}

/* ==================== 弹窗样式 ==================== */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-wrapper {
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
}

.modal-container {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.12);
  color: #333;
}

.modal-content {
  padding: 40px;
  overflow-y: auto;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.modal-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 24px;
}

.modal-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.modal-images img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

/* 弹窗进入/离开动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: $breakpoint-tablet) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-images {
    grid-template-columns: 1fr;
  }
}

@media (max-width: $breakpoint-mobile) {
  .section-inner {
    padding: 0 15px;
  }
}

@media (max-width: $breakpoint-small-mobile) {
  .section-title {
    font-size: 36px;
  }

  .category-tabs {
    flex-wrap: wrap;
    background: none;
  }

  .tab-btn {
    flex: none;
    padding: 8px 16px;
    background: #f0f0f0;
    border-radius: 4px;
    margin: 4px;
  }

  .tab-btn.active {
    box-shadow: none;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 24px;
  }
}
</style>
