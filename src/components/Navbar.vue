<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="logo-area">
        <img src="/images/logo.png" alt="公司logo" class="logo-img" />
        <img src="/images/logoname.png" alt="温州中利建筑工程有限公司" class="logo-name" />
      </div>
      <nav class="nav-menu">
        <div
          v-for="item in menuItems"
          :key="item.name"
          class="nav-item"
          @mouseenter="showDropdown(item.name)"
          @mouseleave="hideDropdown"
        >
          <span class="nav-link" @click="handleMenuClick(item)">
            {{ item.label }}
            <span v-if="item.children" class="arrow">▼</span>
          </span>
          <transition name="dropdown">
            <div
              v-if="item.children && activeDropdown === item.name"
              class="dropdown-panel"
            >
              <div class="dropdown-content">
                <div class="dropdown-cols">
                  <div class="dropdown-col" v-for="(col, idx) in item.children" :key="idx">
                    <h4 class="col-title">{{ col.title }}</h4>
                    <ul class="col-list">
                      <li
                        v-for="sub in col.items"
                        :key="sub"
                        @click="handleItemClick(item, col, sub)"
                      >
                        {{ sub }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </nav>
      <div class="nav-right">
        <div class="icon-links">
          <a href="https://www.tmall.com/" target="_blank" class="icon-link">
            <img src="/images/comicon2.png" alt="天猫" />
          </a>
          <a href="https://www.jd.com/" target="_blank" class="icon-link">
            <img src="/images/comicon3.png" alt="京东" />
          </a>
        </div>
        <div class="search-box">
          <input type="text" placeholder="请输入关键词" />
          <button class="search-btn">搜索</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { navMenu } from '../data/navMenu.js'

const router = useRouter()
const activeDropdown = ref('')
let dropdownTimer = null

// 导航菜单数据从外部配置文件读取
const menuItems = navMenu

/**
 * 显示下拉菜单
 */
function showDropdown(name) {
  if (dropdownTimer) clearTimeout(dropdownTimer)
  activeDropdown.value = name
}

/**
 * 隐藏下拉菜单（延迟处理，避免鼠标快速移出时闪烁）
 */
function hideDropdown() {
  dropdownTimer = setTimeout(() => {
    activeDropdown.value = ''
  }, 150)
}

/**
 * 点击一级菜单 label：跳转到对应页面
 */
function handleMenuClick(menuItem) {
  router.push(menuItem.route)
}

/**
 * 点击下拉菜单中的 item：跳转到对应页面并携带 title 和 item 查询参数
 * 目标页面接收参数后会自动滚动定位到对应区块
 */
function handleItemClick(menuItem, col, subItem) {
  router.push({
    path: menuItem.route,
    query: { title: col.title, item: subItem }
  })
}
</script>

<style scoped>
.navbar { position: relative; z-index: 1000; background-color: #fff; border-bottom: 1px solid #e5e5e5; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.navbar-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; padding: 0 24px; height: 80px; position: relative; }
.logo-area { display: flex; align-items: center; gap: 12px; flex-shrink: 0; transform: translateX(-50px); }
.logo-img { height: 56px; width: auto; }
.logo-name { height: 44px; width: auto; }
.nav-menu { display: flex; align-items: center; gap: 16px; flex: 1; justify-content: flex-start; margin: 0 24px 0 0; }
.nav-item { position: relative; padding: 0 16px; cursor: pointer; }
.nav-link { display: flex; align-items: center; gap: 4px; font-size: 15px; color: #333; line-height: 80px; transition: color 0.3s; }
.nav-item:hover .nav-link { color: #005bac; }
.arrow { font-size: 10px; color: #999; transition: transform 0.3s; }
.nav-item:hover .arrow { transform: rotate(180deg); color: #005bac; }
.dropdown-panel { position: absolute; top: 80px; left: 50%; transform: translateX(-50%); background: #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-radius: 0 0 8px 8px; min-width: 600px; padding: 24px; }
.dropdown-content { max-width: 1200px; margin: 0 auto; }
.dropdown-cols { display: flex; gap: 40px; }
.dropdown-col { flex: 1; min-width: 160px; }
.col-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #eee; }
.col-list { list-style: none; padding: 0; margin: 0; }
.col-list li { font-size: 14px; color: #666; line-height: 2.2; cursor: pointer; transition: color 0.2s; }
.col-list li:hover { color: #005bac; }
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.25s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateX(-50%) translateY(-8px); }
/* 这是导航栏的样式修改 */
.nav-right { display: flex; align-items: center; gap: 32px; flex-shrink: 0; }
.icon-links { display: flex; align-items: center; gap: 12px; }
.icon-link img { height: 32px; width: auto; display: block; }
.search-box { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 40px; overflow: hidden; }
.search-box input { border: none; outline: none; padding: 6px 10px; font-size: 13px; width: 140px; color: #333; }
.search-box input::placeholder { color: #aaa; }
.search-btn { border: none; background: #f5f5f5; padding: 6px 10px; cursor: pointer; font-size: 14px; }
@media (max-width: 1200px) { .navbar-inner { padding: 0 16px; } .logo-name { display: none; } .search-box { display: none; } }
</style>
