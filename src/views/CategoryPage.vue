<template>
  <!-- 通用分类页面：参考产品中心风格布局 -->
  <div class="category-page">
    <!-- Banner 区域 -->
    <div class="page-banner">
      <div class="banner-inner">
        <h1 class="banner-title">{{ pageData?.label }}</h1>
        <p class="banner-desc">专业品质，值得信赖</p>
      </div>
    </div>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-bar">
      <div class="breadcrumb-inner">
        <span class="breadcrumb-item" @click="$router.push('/')">首页</span>
        <span class="breadcrumb-sep">&gt;</span>
        <span class="breadcrumb-item active">{{ pageData?.label }}</span>
      </div>
    </div>

    <!-- 主体内容区：左侧筛选 + 右侧产品网格 -->
    <div class="main-content">
      <div class="content-inner">
        <!-- 左侧筛选栏 -->
        <aside class="sidebar">
          <!-- 搜索功能做一个后期动态升级的预留功能 -->
          <!-- <div class="sidebar-search">
            <input
              type="text"
              placeholder="请输入关键词"
              v-model="searchKey"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">搜索</button>
          </div> -->

          <div v-for="col in pageData?.children" :key="col.title" class="sidebar-section">
            <h3 class="sidebar-title">{{ col.title }}</h3>
            <ul class="sidebar-list">
              <li
                v-for="item in col.items"
                :key="item"
                :class="{
                  active: activeTitle === col.title && activeItem === item,
                }"
                @click="selectItem(col.title, item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </aside>

        <!-- 右侧产品网格 -->
        <div class="product-main">
          <div class="product-grid">
            <div
              v-for="(item, idx) in paginatedItems"
              :key="itemName(item) + idx"
              class="product-card"
            >
              <div class="product-image">
                <img :src="getItemImage(item)" :alt="itemName(item)" />
              </div>
              <h4 class="product-name">{{ itemName(item) }}</h4>
              <p v-if="itemPrice(item)" class="product-price">
                {{ itemPrice(item) }}
              </p>
              <div class="product-actions">
                <span class="btn-detail" @click="toggleDetail(item)">
                  {{ isDetailOpen(item) ? '收起详情' : '查看详情' }}
                </span>
                <span class="btn-doc" @click="toggleDoc(item)">
                  {{ isDocOpen(item) ? '收起文档' : '产品文档' }}
                </span>
              </div>
              <div v-if="isDetailOpen(item)" class="product-detail">
                {{ itemDetail(item) || '详情内容预留' }}
              </div>
              <div v-if="isDocOpen(item)" class="product-doc">
                <p>产品文档预留内容</p>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="pagination-bar">
            <span
              v-for="p in totalPages"
              :key="p"
              class="page-num"
              :class="{ active: currentPage === p }"
              @click="currentPage = p"
            >
              {{ p }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 需要帮助 -->
    <div class="help-section">
      <div class="help-inner">
        <h2 class="help-title">需要帮助？</h2>
        <div class="help-cards">
          <div class="help-card">
            <div class="help-icon">💼</div>
            <h3>项目咨询</h3>
            <p>如果您想要购买产品，请联系我们，我们的团队非常乐意为您提供帮助。</p>
            <a href="#">我要咨询 →</a>
          </div>
          <div class="help-card">
            <div class="help-icon">🔧</div>
            <h3>选型产品</h3>
            <p>在此您可以可以在线选型产品，更快速精准地找到您想要的产品。</p>
            <a href="#">产品选型 →</a>
          </div>
          <div class="help-card">
            <div class="help-icon">🎧</div>
            <h3>联系客服</h3>
            <p>我们的客服团队可为您提供产品资料、技术支持、投诉帮助等服务，请联系他们。</p>
            <a href="#">获得支持 →</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚：复用 Section6 -->
    <Section6 />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Section6 from '../components/sections/Section6.vue'
import { pipeProducts } from '../data/管材类.js'
import { fireProducts } from '../data/消防系统.js'
import { electricProducts } from '../data/电气照明.js'
import { hardwareProducts } from '../data/五金工具.js'

const props = defineProps({
  pageData: { type: Object, required: true },
})

const route = useRoute()
const router = useRouter()

// 从 URL 查询参数中读取需要定位的 title 和 item
const activeTitle = ref(route.query.title || '')
const activeItem = ref(route.query.item || '')

// 搜索关键词
const searchKey = ref('')

// 详情展开状态
const openDetailSet = ref(new Set())
// 产品文档展开状态
const openDocSet = ref(new Set())

// 分页
const currentPage = ref(1)
const pageSize = 9

// 分类名称与对应数据文件的映射
const categoryMap = {
  管材类: pipeProducts,
  消防系统: fireProducts,
  电气照明: electricProducts,
  五金工具: hardwareProducts,
}

/**
 * 获取当前应展示的所有 items
 * 如果有 activeItem 是分类名称，加载对应数据文件
 * 如果有 activeTitle，只显示该 title 下的 items
 * 否则显示所有 title 下的 items（去重）
 */
const currentItems = computed(() => {
  // 如果当前选中的 item 是一个分类名称，加载对应数据文件中的产品列表
  if (activeItem.value && categoryMap[activeItem.value]) {
    let items = categoryMap[activeItem.value]
    if (searchKey.value.trim()) {
      const key = searchKey.value.trim().toLowerCase()
      items = items.filter((i) => i.name.toLowerCase().includes(key))
    }
    return items
  }

  // 如果是产品中心页面且没有选中具体分类，默认展示所有分类的产品
  if (props.pageData?.label === '产品中心' && !activeItem.value) {
    let items = []
    Object.values(categoryMap).forEach((list) => {
      items.push(...list)
    })
    if (searchKey.value.trim()) {
      const key = searchKey.value.trim().toLowerCase()
      items = items.filter((i) => i.name.toLowerCase().includes(key))
    }
    return items
  }

  let items = []
  if (activeTitle.value && props.pageData?.children) {
    const col = props.pageData.children.find((c) => c.title === activeTitle.value)
    if (col) items = [...col.items]
  } else {
    const seen = new Set()
    props.pageData?.children?.forEach((col) => {
      col.items.forEach((i) => {
        if (!seen.has(i)) {
          seen.add(i)
          items.push(i)
        }
      })
    })
  }
  // 搜索过滤（兼容字符串和对象）
  if (searchKey.value.trim()) {
    const key = searchKey.value.trim().toLowerCase()
    items = items.filter((i) => {
      const text = typeof i === 'object' ? i.name : i
      return text.toLowerCase().includes(key)
    })
  }
  return items
})

/**
 * 分页后的数据
 */
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return currentItems.value.slice(start, start + pageSize)
})

/**
 * 总页数
 */
const totalPages = computed(() => {
  return Math.ceil(currentItems.value.length / pageSize)
})

/**
 * 点击侧边栏 item：更新查询参数并过滤
 */
function selectItem(title, item) {
  activeTitle.value = title
  activeItem.value = item
  currentPage.value = 1
  router.replace({
    path: route.path,
    query: { title, item },
  })
}

/**
 * 搜索
 */
function handleSearch() {
  currentPage.value = 1
}

/**
 * 每个 item 对应的产品图片（默认占位图）
 * 后续可根据 item 名称映射到具体图片
 */
function getItemImage(item) {
  if (typeof item === 'object' && item.image) return item.image
  return '/images/logo.png'
}

function itemName(item) {
  return typeof item === 'object' ? item.name : item
}

function itemPrice(item) {
  return typeof item === 'object' ? item.price : ''
}

function itemDetail(item) {
  return typeof item === 'object' ? item.detail : ''
}

function toggleDetail(item) {
  const key = itemName(item)
  if (openDetailSet.value.has(key)) {
    openDetailSet.value.delete(key)
  } else {
    openDetailSet.value.add(key)
  }
}

function isDetailOpen(item) {
  return openDetailSet.value.has(itemName(item))
}

function toggleDoc(item) {
  const key = itemName(item)
  if (openDocSet.value.has(key)) {
    openDocSet.value.delete(key)
  } else {
    openDocSet.value.add(key)
  }
}

function isDocOpen(item) {
  return openDocSet.value.has(itemName(item))
}

// 页面挂载后处理
onMounted(() => {
  // 如果 URL 带有参数，默认只显示该 title 下的内容
})

// 监听查询参数变化
watch(
  () => route.query,
  () => {
    activeTitle.value = route.query.title || ''
    activeItem.value = route.query.item || ''
  },
)
</script>

<style scoped lang="scss">
/* ==================== Banner ==================== */
.page-banner {
  background: linear-gradient(135deg, #005bac 0%, #003d7a 100%);
  padding: 60px 0;
  color: #fff;
}

.banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.banner-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.banner-desc {
  font-size: 15px;
  opacity: 0.9;
}

/* ==================== 面包屑 ==================== */
.breadcrumb-bar {
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}

.breadcrumb-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 13px;
  color: #666;
}

.breadcrumb-item {
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #005bac;
}

.breadcrumb-item.active {
  color: #333;
  font-weight: 500;
}

.breadcrumb-sep {
  margin: 0 8px;
  color: #ccc;
}

/* ==================== 主体内容 ==================== */
.main-content {
  background: #f8f9fa;
  padding: 40px 0 60px;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 24px;
}

/* ==================== 左侧筛选栏 ==================== */
.sidebar {
  width: 260px;
  flex-shrink: 0;
}

.sidebar-search {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.sidebar-search input {
  flex: 1;
  border: none;
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
}

.sidebar-search .search-btn {
  border: none;
  background: #f5f5f5;
  padding: 0 16px;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  transition: all 0.3s;
}

.sidebar-search .search-btn:hover {
  background: #e8f4ff;
  color: #005bac;
}

.sidebar-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.sidebar-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-list li {
  padding: 10px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  margin-bottom: 4px;
}

.sidebar-list li:hover {
  background: #f0f7ff;
  color: #005bac;
}

.sidebar-list li.active {
  background: #005bac;
  color: #fff;
}

/* ==================== 右侧产品网格 ==================== */
.product-main {
  flex: 1;
  min-width: 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s;
  padding: 20px;
  text-align: center;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 160px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;
}

.product-image img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.product-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.product-price {
  font-size: 14px;
  color: #e74c3c;
  font-weight: 600;
  margin-bottom: 12px;
}

.product-detail,
.product-doc {
  margin-top: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  text-align: left;
}

.product-doc p {
  margin: 0;
}

.product-actions {
  display: flex;
  border-top: 1px solid #f0f0f0;
  margin-top: 12px;
}

.btn-detail,
.btn-doc {
  flex: 1;
  text-align: center;
  font-size: 13px;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-detail {
  color: #005bac;
  border-right: 1px solid #f0f0f0;
}

.btn-detail:hover {
  background: #f0f7ff;
}

.btn-doc {
  color: #666;
}

.btn-doc:hover {
  background: #f5f5f5;
  color: #005bac;
}

/* ==================== 分页 ==================== */
.pagination-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.page-num {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.page-num:hover {
  background: #f0f0f0;
}

.page-num.active {
  background: #005bac;
  color: #fff;
}

/* ==================== 需要帮助 ==================== */
.help-section {
  background: #fff;
  padding: 60px 0;
}

.help-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.help-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
}

.help-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.help-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

.help-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.help-card h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
}

.help-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}

.help-card a {
  font-size: 13px;
  color: #005bac;
  text-decoration: none;
  font-weight: 500;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: $breakpoint-tablet) {
  .content-inner {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .help-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: $breakpoint-small-mobile) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .banner-title {
    font-size: 24px;
  }
}
</style>
