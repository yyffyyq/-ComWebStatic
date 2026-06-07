<template>
  <div class="home-page">
    <!-- 轮播图 Banner -->
    <BannerCarousel />

    <!-- 预留内容区域 -->
    <Section1 />
    <Section2 />
    <Section3 />
    <!-- <Section4 />
    <Section5 /> -->
    <Section6 />
  </div>
</template>

<script setup>
import BannerCarousel from '../components/BannerCarousel.vue'
import Section1 from '../components/sections/Section1.vue'
import Section2 from '../components/sections/Section2.vue'
import Section3 from '../components/sections/Section3.vue'
import Section4 from '../components/sections/Section4.vue'
import Section5 from '../components/sections/Section5.vue'
import Section6 from '../components/sections/Section6.vue'
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>
