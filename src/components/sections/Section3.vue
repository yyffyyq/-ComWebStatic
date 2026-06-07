<template>
  <!-- 第三内容区域：合作公司 Logo 无限循环滚动展示 -->
  <section class="section section-3">
    <div class="section-header">
      <h2 class="section-title">合作公司</h2>
      <p class="section-desc">携手行业领军企业，共创建筑新未来</p>
    </div>

    <!-- Logo 无限循环滚动容器 -->
    <div class="logo-marquee" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
      <div class="marquee-track" :class="{ paused: isPaused }">
        <!-- 第一组 Logo -->
        <div v-for="logo in logoList" :key="'a-' + logo.id" class="logo-item">
          <div class="logo-card">
            <img :src="logo.image" :alt="logo.name" />
          </div>
          <span class="logo-label">{{ logo.label }}</span>
        </div>
        <!-- 复制一组实现无缝循环 -->
        <div v-for="logo in logoList" :key="'b-' + logo.id" class="logo-item">
          <div class="logo-card">
            <img :src="logo.image" :alt="logo.name" />
          </div>
          <span class="logo-label">{{ logo.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

/**
 * 合作公司 Logo 数据
 * image 路径指向 public/images/carousel/home/componylogos/ 目录
 */
const logoList = [
  { id: 1, image: '/images/carousel/home/componylogos/世达.jpg', label: '世达', name: '世达' },
  { id: 2, image: '/images/carousel/home/componylogos/东成.jpg', label: '东成', name: '东成' },
  {
    id: 3,
    image: '/images/carousel/home/componylogos/中策电缆.jpg',
    label: '中策电缆',
    name: '中策电缆',
  },
  {
    id: 4,
    image: '/images/carousel/home/componylogos/中财管道.jpg',
    label: '中财管道',
    name: '中财管道',
  },
  {
    id: 5,
    image: '/images/carousel/home/componylogos/伟星管业.jpg',
    label: '伟星管业',
    name: '伟星管业',
  },
  {
    id: 6,
    image: '/images/carousel/home/componylogos/公元管道.jpg',
    label: '公元管道',
    name: '公元管道',
  },
  {
    id: 7,
    image: '/images/carousel/home/componylogos/公牛插座.jpg',
    label: '公牛插座',
    name: '公牛插座',
  },
  {
    id: 8,
    image: '/images/carousel/home/componylogos/公牛装饰开关.jpg',
    label: '公牛装饰开关',
    name: '公牛装饰开关',
  },
  {
    id: 9,
    image: '/images/carousel/home/componylogos/史丹利.jpg',
    label: '史丹利',
    name: '史丹利',
  },
  {
    id: 10,
    image: '/images/carousel/home/componylogos/埃美柯.jpg',
    label: '埃美柯',
    name: '埃美柯',
  },
  {
    id: 11,
    image: '/images/carousel/home/componylogos/天正电气.jpg',
    label: '天正电气',
    name: '天正电气',
  },
  { id: 12, image: '/images/carousel/home/componylogos/康泰.jpg', label: '康泰', name: '康泰' },
  {
    id: 13,
    image: '/images/carousel/home/componylogos/新兴铸管.jpg',
    label: '新兴铸管',
    name: '新兴铸管',
  },
  {
    id: 14,
    image: '/images/carousel/home/componylogos/正大制管.jpg',
    label: '正大制管',
    name: '正大制管',
  },
  {
    id: 15,
    image: '/images/carousel/home/componylogos/正泰电器.jpg',
    label: '正泰电器',
    name: '正泰电器',
  },
  {
    id: 16,
    image: '/images/carousel/home/componylogos/海康威视.jpg',
    label: '海康威视',
    name: '海康威视',
  },
  {
    id: 17,
    image: '/images/carousel/home/componylogos/特变电工.jpg',
    label: '特变电工',
    name: '特变电工',
  },
  {
    id: 18,
    image: '/images/carousel/home/componylogos/立邦漆.jpg',
    label: '立邦漆',
    name: '立邦漆',
  },
  {
    id: 19,
    image: '/images/carousel/home/componylogos/绿灯行电缆.jpg',
    label: '绿灯行电缆',
    name: '绿灯行电缆',
  },
  { id: 20, image: '/images/carousel/home/componylogos/联塑.jpg', label: '联塑', name: '联塑' },
  {
    id: 21,
    image: '/images/carousel/home/componylogos/西蒙电气.jpg',
    label: '西蒙电气',
    name: '西蒙电气',
  },
  {
    id: 22,
    image: '/images/carousel/home/componylogos/金洲管道.jpg',
    label: '金洲管道',
    name: '金洲管道',
  },
  {
    id: 23,
    image: '/images/carousel/home/componylogos/雅洁五金.jpg',
    label: '雅洁五金',
    name: '雅洁五金',
  },
  {
    id: 24,
    image: '/images/carousel/home/componylogos/雷士照明.jpg',
    label: '雷士照明',
    name: '雷士照明',
  },
  {
    id: 25,
    image: '/images/carousel/home/componylogos/霍尼韦尔管道.jpg',
    label: '霍尼韦尔管道',
    name: '霍尼韦尔管道',
  },
]

// 鼠标悬停暂停状态
const isPaused = ref(false)
</script>

<style scoped lang="scss">
/* ==================== 区域基础样式 ==================== */
.section {
  width: 100%;
  padding: 100px 0;
  background-color: #fff;
  overflow: hidden;
}

.section-header {
  max-width: 1200px;
  margin: 0 auto 48px;
  padding: 0 20px;
  text-align: center;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.section-desc {
  font-size: 16px;
  color: #666;
}

/* ==================== Logo 无限循环滚动 ==================== */
.logo-marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* 滚动轨道：flex 横向排列，动画驱动 */
.marquee-track {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  width: max-content;
  animation: marquee-scroll 150s linear infinite;
}

/* 鼠标悬停时暂停滚动 */
.marquee-track.paused {
  animation-play-state: paused;
}

/* 无限循环滚动动画：从 0 移动到 -50%（即第一份内容的宽度） */
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 单个 Logo 项 */
.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  width: 180px;
}

/* Logo 卡片 */
.logo-card {
  width: 100%;
  height: 100px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.logo-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.logo-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 分类标签 */
.logo-label {
  font-size: 14px;
  color: #666;
  text-align: center;
  white-space: nowrap;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: $breakpoint-mobile) {
  .logo-item {
    width: 140px;
  }

  .logo-card {
    height: 80px;
    padding: 12px;
  }

  .section-title {
    font-size: 28px;
  }
}
</style>
