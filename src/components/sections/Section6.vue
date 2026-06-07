<template>
  <!-- 第六内容区域：页脚导航与版权信息 -->
  <footer ref="footerRef" class="footer-section">
    <div class="footer-inner">
      <!-- 多列链接导航区 -->
      <div class="footer-links" :class="{ visible: isVisible }">
        <!-- 产品中心 -->
        <div class="link-column">
          <h4 class="column-title">产品中心</h4>
          <ul class="column-list">
            <li><a href="#">建筑工程</a></li>
            <li><a href="#">装饰装修</a></li>
            <li><a href="#">市政工程</a></li>
            <li><a href="#">机电安装</a></li>
            <li><a href="#">钢结构工程</a></li>
            <li><a href="#">消防设施</a></li>
            <li><a href="#">防水防腐</a></li>
            <li><a href="#">建筑智能化</a></li>
          </ul>
        </div>

        <!-- 解决方案 -->
        <div class="link-column">
          <h4 class="column-title">解决方案</h4>
          <ul class="column-list">
            <li><a href="#">商业建筑</a></li>
            <li><a href="#">住宅建筑</a></li>
            <li><a href="#">工业厂房</a></li>
            <li><a href="#">市政工程</a></li>
            <li><a href="#">新能源建设</a></li>
            <li><a href="#">基础设施</a></li>
          </ul>
        </div>

        <!-- 案例中心 -->
        <div class="link-column">
          <h4 class="column-title">案例中心</h4>
          <ul class="column-list">
            <li><a href="#">商业综合体</a></li>
            <li><a href="#">住宅小区</a></li>
            <li><a href="#">工业厂房</a></li>
            <li><a href="#">市政道路</a></li>
            <li><a href="#">桥梁隧道</a></li>
            <li><a href="#">公共建筑</a></li>
            <li><a href="#">基础设施</a></li>
          </ul>
        </div>

        <!-- 服务与支持 -->
        <div class="link-column">
          <h4 class="column-title">服务与支持</h4>
          <ul class="column-list">
            <li><a href="#">客服中心</a></li>
            <li><a href="#">资料下载</a></li>
            <li><a href="#">区域查询</a></li>
            <li><a href="#">数字化工具</a></li>
            <li><a href="#">在线报修</a></li>
          </ul>
        </div>

        <!-- 关于公司 -->
        <div class="link-column">
          <h4 class="column-title">关于公司</h4>
          <ul class="column-list">
            <li><a href="#">公司概况</a></li>
            <li><a href="#">企业文化</a></li>
            <li><a href="#">新闻资讯</a></li>
            <li><a href="#">加入我们</a></li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">资质荣誉</a></li>
          </ul>
        </div>

        <!-- 快速入口 -->
        <div class="link-column">
          <h4 class="column-title">快速入口</h4>
          <ul class="column-list">
            <li><a href="#">在线咨询</a></li>
            <li><a href="#">招标公告</a></li>
            <li><a href="#">合作伙伴</a></li>
            <li><a href="#">资料下载</a></li>
          </ul>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="footer-divider"></div>

      <!-- 底部版权栏 -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <span class="copyright"> © 温州中利建筑工程有限公司 All Rights Reserved </span>
          <span class="icp">浙ICP备XXXXXXXX号</span>
        </div>
        <div class="bottom-right">
          <a href="#">网站地图</a>
          <a href="#">隐私条款</a>
          <a href="#">法律声明</a>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-top" title="返回顶部" @click="scrollToTop">
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 4l-8 8h5v8h6v-8h5z" fill="currentColor" />
      </svg>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../kaotn/useScrollReveal.js'

// 滚动显示动画：监听页脚是否进入视口
const { targetRef: footerRef, isVisible } = useScrollReveal({ threshold: 0.1 })

/**
 * 点击返回顶部
 * 平滑滚动到页面最上方
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
/* ==================== 页脚基础样式 ==================== */
.footer-section {
  width: 100%;
  background-color: #f5f5f5;
  padding: 60px 0 30px;
  position: relative;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ==================== 多列链接导航 ==================== */
.footer-links {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.footer-links.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 单列样式 */
.link-column {
  min-width: 0;
}

.column-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
}

.column-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.column-list li {
  margin-bottom: 12px;
  line-height: 1.4;
}

.column-list li a {
  font-size: 13px;
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.column-list li a:hover {
  color: #005bac;
}

/* ==================== 分隔线 ==================== */
.footer-divider {
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 40px 0 20px;
}

/* ==================== 底部版权栏 ==================== */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #999;
}

.bottom-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.bottom-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bottom-right a {
  font-size: 13px;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.bottom-right a:hover {
  color: #005bac;
}

/* ==================== 返回顶部按钮 ==================== */
.back-top {
  position: fixed;
  right: 80px;
  bottom: 40px;
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  z-index: 100;
}

.back-top:hover {
  color: #005bac;
  border-color: #005bac;
  box-shadow: 0 4px 12px rgba(0, 91, 172, 0.15);
}

/* ==================== 响应式适配 ==================== */
@media (max-width: $breakpoint-tablet) {
  .footer-links {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

@media (max-width: $breakpoint-small-mobile) {
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .back-top {
    right: 20px;
    bottom: 20px;
  }
}
</style>
