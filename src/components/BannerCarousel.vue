<template>
  <div class="banner-carousel">
    <div class="carousel-track" :style="trackStyle">
      <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
        <img :src="slide.image" :alt="slide.title" />
      </div>
    </div>
    <button class="carousel-arrow carousel-prev" @click="prevSlide">❮</button>
    <button class="carousel-arrow carousel-next" @click="nextSlide">❯</button>
    <div class="carousel-dots">
      <span v-for="(slide, index) in slides" :key="index" :class="['dot', { active: currentIndex === index }]" @click="goToSlide(index)"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
const slides = [
  { image: '/images/carousel/home/banner1/1.jpg', title: '公司大楼' },
  { image: '/images/carousel/home/banner1/2.jpg', title: '公司大楼2' },
  { image: '/images/carousel/home/banner1/3.jpg', title: '公司大楼3' },
  { image: '/images/carousel/home/banner1/4.jpg', title: '公司大楼4' },
  { image: '/images/carousel/home/banner1/5.jpg', title: '公司大楼5' },
  { image: '/images/carousel/home/banner1/6.jpg', title: '公司大楼6' },
  { image: '/images/carousel/home/banner1/7.jpg', title: '公司大楼7' },
  { image: '/images/carousel/home/banner1/8.jpg', title: '公司大楼8' },
  { image: '/images/carousel/home/banner1/9.jpg', title: '公司大楼9' },
  { image: '/images/carousel/home/banner1/10.jpg', title: '公司大楼10' },
  { image: '/images/carousel/home/banner1/11.jpg', title: '公司大楼11' },
  { image: '/images/carousel/home/banner1/12.jpg', title: '公司大楼12' },
  { image: '/images/carousel/home/banner1/13.jpg', title: '公司大楼13' }
]
const currentIndex = ref(0)
const autoplayInterval = ref(null)
const trackStyle = computed(() => ({ transform: `translateX(-${currentIndex.value * 100}%)`, transition: 'transform 0.6s ease-in-out' }))
function nextSlide() { currentIndex.value = (currentIndex.value + 1) % slides.length }
function prevSlide() { currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length }
function goToSlide(index) { currentIndex.value = index }
function startAutoplay() { autoplayInterval.value = setInterval(nextSlide, 5000) }
function stopAutoplay() { if (autoplayInterval.value) { clearInterval(autoplayInterval.value); autoplayInterval.value = null } }
onMounted(() => startAutoplay())
onUnmounted(() => stopAutoplay())
</script>

<style scoped>
.banner-carousel { 
    position: relative; width: 100%; height: 100vh; overflow: hidden; background-color: #000; 
}
.carousel-track { 
    display: flex; height: 100%; width: 100%; 
}
.carousel-slide { 
    width: 100%; height: 100%; flex: 0 0 100%; overflow: hidden; 
}
.carousel-slide img {
    width: 100%; height: 100%; object-fit: cover; 
}
.carousel-arrow { 
    position: absolute; top: 50%; transform: translateY(-50%); 
    background: rgba(0,0,0,0.3); color: #fff;
     border: none; 
    width: 48px; height: 48px; 
    font-size: 20px; 
    cursor: pointer; display: flex; 
    align-items: center; 
    justify-content: center; 
    border-radius: 50%; 
    transition: background 0.3s; 
    z-index: 10;
 }
.carousel-arrow:hover { background: rgba(0,0,0,0.6); }
.carousel-prev { left: 24px; }
.carousel-next { right: 24px; }
.carousel-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 10; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
.dot.active { background: #fff; width: 28px; border-radius: 5px; }
@media (max-width: 768px) { .banner-carousel { height: 100vh; } .carousel-arrow { width: 36px; height: 36px; font-size: 16px; } }
</style>
