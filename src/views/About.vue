<template>
  <div>测试</div>
</template>

<script setup>
import CategoryPage from './CategoryPage.vue'
import { navMenu } from '../data/navMenu.js'

// 从共享数据中读取"关于公司"页面配置
const pageData = navMenu.find((item) => item.name === 'about')
</script>
