<template>
  <CategoryPage :pageData="pageData" />
</template>

<script setup>
import CategoryPage from './CategoryPage.vue'
import { navMenu } from '../data/navMenu.js'

// 从共享数据中读取"解决方案"页面配置
const pageData = navMenu.find((item) => item.name === 'solutions')
</script>
