<template>
  <!-- 第六内容区域：页脚导航与版权信息 -->
  <footer ref="footerRef" class="footer-section">
    <div class="footer-inner" :class="{ visible: isVisible }">
      <!-- 主体区域：左侧链接 + 右侧品牌 -->
      <div class="footer-main">
        <!-- 左侧多列链接导航区 -->
        <div class="footer-links">
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

          <!-- 服务与支持 -->
          <div class="link-column">
            <h4 class="column-title">服务与支持</h4>
            <ul class="column-list">
              <li><a href="#">客服中心</a></li>
              <li><a href="#">资料下载</a></li>
              <li><a href="#">区域查询</a></li>
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

        <!-- 右侧品牌与联系信息 -->
        <div class="footer-brand">
          <!-- 公司 Logo 与名称 -->
          <div class="brand-logo">
            <img src="/images/logo.png" alt="公司logo" class="brand-logo-img" />
            <div class="brand-name">
              <span class="brand-name-cn">温州中利建筑工程有限公司</span>
              <span class="brand-name-en">WENZHOU ZHONGLI CONSTRUCTION</span>
            </div>
          </div>

          <!-- 联系信息与二维码 -->
          <div class="brand-contact-qr">
            <!-- 联系信息 -->
            <div class="brand-contact">
              <div class="contact-row">
                <span class="contact-label">电话</span>
                <span class="contact-value">0577-88819222</span>
              </div>
              <div class="contact-row">
                <span class="contact-label">邮箱</span>
                <span class="contact-value">15088915777@163.com</span>
              </div>
              <div class="contact-row">
                <span class="contact-label">地址</span>
                <span class="contact-value">浙江省温州市<br />洞头区雁鸿路 1023 号</span>
              </div>
            </div>

            <!-- 二维码 -->
            <div class="brand-qr">
              <img src="/images/qd.png" alt="官方二维码" />
            </div>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="footer-divider"></div>

      <!-- 底部版权栏 -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <span class="copyright">© 温州中利建筑工程有限公司 All Rights Reserved</span>
          <a class="icp" href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank"
            >浙ICP备2026060090号-1</a
          >
          <a
            class="beian"
            href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33039402026006"
            rel="noreferrer"
            target="_blank"
          >
            <img src="/gonan.png" alt="公安备案" class="beian-icon" />
            浙公网安备33039402026006号
          </a>
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
  background-color: #1a1a2e;
  padding: 60px 0 0;
  position: relative;
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.footer-inner.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ==================== 主体布局：左链接 + 右品牌 ==================== */
.footer-main {
  display: flex;
  gap: 60px;
}

/* ==================== 左侧多列链接导航 ==================== */
.footer-links {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  min-width: 0;
}

/* 单列样式 */
.link-column {
  min-width: 0;
}

.column-title {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
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
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: color 0.3s ease;
}

.column-list li a:hover {
  color: #fff;
}

/* ==================== 右侧品牌与联系信息 ==================== */
.footer-brand {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Logo 区域 */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand-logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 8px;
}

.brand-name {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-name-cn {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
}

.brand-name-en {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
}

/* 联系信息 + 二维码水平布局 */
.brand-contact-qr {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

/* 联系信息 */
.brand-contact {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.contact-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  width: 32px;
  flex-shrink: 0;
}

.contact-value {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

/* 公司宣传图 */
.brand-qr {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;
  background: #fff;
  padding: 6px;
  box-sizing: border-box;
}

.brand-qr img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* ==================== 分隔线 ==================== */
.footer-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 40px 0 20px;
}

/* ==================== 底部版权栏 ==================== */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  padding-bottom: 24px;
}

.bottom-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.bottom-left a {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: color 0.3s ease;
}

.bottom-left a:hover {
  color: rgba(255, 255, 255, 0.7);
}

.beian {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.beian-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.bottom-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bottom-right a {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: color 0.3s ease;
}

.bottom-right a:hover {
  color: rgba(255, 255, 255, 0.7);
}

/* ==================== 返回顶部按钮 ==================== */
.back-top {
  position: fixed;
  right: 80px;
  bottom: 40px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 100;
}

.back-top:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* ==================== 响应式适配 ==================== */
@media (max-width: $breakpoint-tablet) {
  .footer-main {
    flex-direction: column;
    gap: 40px;
  }

  .footer-brand {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
  }

  .brand-logo {
    border-bottom: none;
    padding-bottom: 0;
  }

  .brand-contact {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px 32px;
  }

  .brand-contact-qr {
    flex-wrap: wrap;
  }

  .brand-qr {
    margin-top: 0;
  }

  .footer-links {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
}

@media (max-width: $breakpoint-small-mobile) {
  .footer-section {
    padding: 40px 0 0;
  }

  .footer-inner {
    padding: 0 20px;
  }

  .footer-links {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .column-title {
    font-size: 13px;
    margin-bottom: 10px;
  }

  .column-list li {
    margin-bottom: 6px;
  }

  .column-list li a {
    font-size: 12px;
  }

  .footer-brand {
    flex-direction: column;
  }

  .brand-contact {
    flex-direction: column;
    gap: 12px;
  }

  .brand-contact-qr {
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
  }

  .brand-qr {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
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
