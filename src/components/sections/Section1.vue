<template>
  <!-- 第一内容区域：参考图1风格的企业实力展示 -->
  <section ref="sectionRef" class="section section-1">
    <div class="section-inner">
      <!-- 左侧文字内容区 -->
      <div class="content-left">
        <!-- 主标题：滚动进入时从左侧滑入 -->
        <h2 class="main-title" :class="{ visible: isVisible }">以质为基 链接建筑全产业链一体化</h2>

        <!-- 彩色装饰线条 + 副标题 -->
        <div class="color-line" :class="{ visible: isVisible }">
          <div class="line-segment line-blue"></div>
          <div class="line-segment line-green"></div>
          <div class="line-segment line-yellow"></div>
          <span class="line-text">一站式价值提供，一站式满足需求</span>
          <div class="line-segment line-cyan"></div>
        </div>

        <!-- 描述文字 -->
        <p class="desc-text" :class="{ visible: isVisible }">
          构建"设计、施工、建材、安装、维护、运营"<br />
          全产业链一体化发展新生态
        </p>

        <!-- 数据统计区：带数字滚动动画 -->
        <div class="stats-row" :class="{ visible: isVisible }">
          <div class="stat-item">
            <div class="stat-number">
              <span class="num">{{ count1 }}</span>
              <span class="unit">+</span>
            </div>
            <div class="stat-label">业务遍及国家和地区</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              <span class="num">{{ count2 }}</span>
              <span class="unit">亿</span>
            </div>
            <div class="stat-label">2025年集团营业收入</div>
          </div>
        </div>
      </div>

      <!-- 右侧视频展示区：产业链循环视频 -->
      <div class="content-right" :class="{ visible: isVisible }">
        <div class="video-wrapper">
          <video
            ref="videoRef"
            class="industry-video"
            src="/images/videos/symode1.mp4"
            muted
            playsinline
            @loadedmetadata="onVideoReady"
            @ended="onVideoEnded"
          ></video>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useScrollReveal } from '../../kaotn/useScrollReveal.js'
import { useCountUp } from '../../kaotn/useCountUp.js'
import { useDevice } from '../../composables/useDevice.js'

// 设备判断
const { isMobile } = useDevice()

// 滚动显示动画：监听元素是否进入视口
// 移动端降低阈值，更容易触发显示
const { targetRef: sectionRef, isVisible } = useScrollReveal({
  threshold: isMobile.value ? 0.05 : 0.15,
})

// 数字滚动动画：两个统计数据
const { current: count1, start: start1 } = useCountUp(140, 1800)
const { current: count2, start: start2 } = useCountUp(1850, 2000)

// 视频元素引用
const videoRef = ref(null)
// 控制视频循环间隔的计时器
let videoTimer = null

/**
 * 监听视频元数据加载完成
 * 设置慢速播放（0.6倍速）并自动开始播放
 */
function onVideoReady() {
  if (videoRef.value) {
    videoRef.value.playbackRate = 0.6
    videoRef.value.play()
  }
}

/**
 * 监听视频播放结束
 * 等待 3 秒后重新播放，实现循环间隔效果
 */
function onVideoEnded() {
  if (videoTimer) clearTimeout(videoTimer)
  videoTimer = setTimeout(() => {
    if (videoRef.value) {
      videoRef.value.currentTime = 0
      videoRef.value.play()
    }
  }, 3000)
}

/**
 * 监听元素进入视口状态
 * 当 isVisible 变为 true 时，启动数字滚动动画
 */
watch(isVisible, (val) => {
  if (val) {
    // 延迟启动数字动画，让前面的入场动画先执行一部分
    setTimeout(() => start1(), 400)
    setTimeout(() => start2(), 600)
  }
})
</script>

<style scoped lang="scss">
/* ==================== 区域基础样式 ==================== */
.section {
  width: 100%;
  padding: 120px 0;
  background-color: #fff;
  overflow: hidden;
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 80px;
}

/* ==================== 左侧内容区 ==================== */
.content-left {
  flex: 1;
  min-width: 0;
}

/* 主标题：默认隐藏，滚动进入后从左侧滑入 */
.main-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateX(-60px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.main-title.visible {
  opacity: 1;
  transform: translateX(0);
}

/* ==================== 彩色装饰线条 ==================== */
.color-line {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.8s ease 0.2s;
}

.color-line.visible {
  opacity: 1;
  transform: translateX(0);
}

/* 彩色线段：默认宽度为 0，进入视口后展开 */
.line-segment {
  height: 3px;
  width: 0;
  border-radius: 2px;
  transition: width 0.8s ease;
}

.line-blue {
  background: #409eff;
}
.line-green {
  background: #67c23a;
}
.line-yellow {
  background: #e6a23c;
}
.line-cyan {
  background: #36cfc9;
}

/* 线条进入视口后的展开宽度 */
.color-line.visible .line-blue {
  width: 40px;
}
.color-line.visible .line-green {
  width: 30px;
  transition-delay: 0.1s;
}
.color-line.visible .line-yellow {
  width: 25px;
  transition-delay: 0.2s;
}
.color-line.visible .line-cyan {
  width: 40px;
  transition-delay: 0.3s;
}

/* 副标题文字 */
.line-text {
  font-size: 15px;
  color: #409eff;
  margin: 0 12px;
  white-space: nowrap;
}

/* ==================== 描述文字 ==================== */
.desc-text {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.4s;
}

.desc-text.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ==================== 数据统计区 ==================== */
.stats-row {
  display: flex;
  gap: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.5s;
}

.stats-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-item {
  text-align: left;
}

.stat-number {
  font-size: 48px;
  font-weight: 800;
  color: #005bac;
  line-height: 1;
  margin-bottom: 10px;
  font-family: 'Segoe UI', 'PingFang SC', sans-serif;
}

.stat-number .unit {
  font-size: 24px;
  font-weight: 600;
  margin-left: 2px;
}

.stat-label {
  font-size: 14px;
  color: #888;
}

/* ==================== 右侧图形区 ==================== */
/* 左侧占 1/3，右侧占 2/3 */
.content-left {
  flex: 1;
  min-width: 0;
}

.content-right {
  flex: 2;
  min-width: 0;
  height: 600px;
  opacity: 0;
  transform: translateX(60px);
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}

.content-right.visible {
  opacity: 1;
  transform: translateX(0);
}

/* 视频容器：背景与页面一致，无边框限制 */
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
}

/* 产业视频样式：object-fit: contain 确保视频完整显示 */
.industry-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: $breakpoint-tablet) {
  .section-inner {
    flex-direction: column;
    gap: 40px;
  }

  .content-right {
    width: 100%;
    height: 420px;
  }

  .main-title {
    font-size: 28px;
  }

  .stat-number {
    font-size: 36px;
  }
}
</style>
