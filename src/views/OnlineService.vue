<template>
  <div class="online-service-page">
    <!-- 顶部 Banner -->
    <div class="page-banner">
      <div class="banner-inner">
        <h1 class="banner-title">在线服务</h1>
        <p class="banner-desc">随时为您提供专业咨询与技术支持</p>
      </div>
    </div>

    <!-- 面包屑导航 -->
    <div class="breadcrumb-bar">
      <div class="breadcrumb-inner">
        <span class="breadcrumb-item" @click="$router.push('/')">首页</span>
        <span class="breadcrumb-sep">&gt;</span>
        <span class="breadcrumb-item active">在线服务</span>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="main-content">
      <div class="content-inner">
        <!-- 左侧：公司信息卡片 -->
        <div class="company-card">
          <div class="company-header">
            <div class="company-icon">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h2 class="company-name">温州中利建筑工程有限公司</h2>
              <p class="company-slogan">专业品质 · 值得信赖</p>
            </div>
          </div>
          <div class="company-divider"></div>
          <div class="company-body">
            <!-- 地址信息：点击跳转高德地图 -->
            <a
              class="info-row info-row-link"
              href="https://uri.amap.com/marker?position=121.15,27.83&name=温州市洞头区雁鸿路1023号&src=company&coordinate=gaode&callnative=1"
              target="_blank"
              rel="noopener"
              title="点击在高德地图中查看"
            >
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="currentColor"/>
                </svg>
              </div>
              <div class="info-text">
                <span class="info-label">公司地址</span>
                <span class="info-value">温州市洞头区雁鸿路 1023 号</span>
              </div>
              <span class="map-hint">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor"/>
                </svg>
              </span>
            </a>
            <!-- 联系电话 -->
            <div class="info-row">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.7-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
              </div>
              <div class="info-text">
                <span class="info-label">公司电话</span>
                <span class="info-value">86838222</span>
              </div>
            </div>
            <!-- 联系人1 -->
            <div class="info-row">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <div class="info-text">
                <span class="info-label">联系人 · 沈</span>
                <span class="info-value">13736356130</span>
              </div>
            </div>
            <!-- 联系人2 -->
            <div class="info-row">
              <div class="info-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <div class="info-text">
                <span class="info-label">联系人 · 项</span>
                <span class="info-value">13695883777</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：快捷服务卡片 -->
        <div class="service-panel">
          <h3 class="panel-title">快捷服务</h3>
          <div class="service-cards">
            <div class="service-card">
              <div class="service-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor"/>
                </svg>
              </div>
              <h4>项目咨询</h4>
              <p>如需购买产品或了解合作方案，欢迎随时联系我们</p>
              <a href="tel:86838222" class="service-btn">立即拨打</a>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <h4>技术支持</h4>
              <p>产品选型、安装指导及技术问题解答</p>
              <a href="tel:13736356130" class="service-btn">联系沈工</a>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="currentColor"/>
                </svg>
              </div>
              <h4>售后服务</h4>
              <p>产品质量反馈、退换货及投诉处理</p>
              <a href="tel:13695883777" class="service-btn">联系项工</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
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
  padding: 48px 0 80px;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* ==================== 左侧公司信息卡片 ==================== */
.company-card {
  width: 380px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 28px 20px;
}

.company-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #005bac 0%, #0078e0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.company-name {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  margin-bottom: 4px;
}

.company-slogan {
  font-size: 13px;
  color: #999;
}

.company-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 0 28px;
}

.company-body {
  padding: 20px 28px 28px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-row:last-child {
  border-bottom: none;
}

/* 地址行可点击样式 */
.info-row-link {
  display: flex;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;
  border-radius: 8px;
  padding-left: 4px;
  padding-right: 4px;
  margin-left: -4px;
  margin-right: -4px;
  position: relative;
}

.info-row-link:hover {
  background: #f0f7ff;
}

.info-row-link:hover .info-value {
  color: #005bac;
}

.map-hint {
  display: flex;
  align-items: center;
  color: #bbb;
  margin-left: auto;
  flex-shrink: 0;
  transition: color 0.3s;
}

.info-row-link:hover .map-hint {
  color: #005bac;
}

.info-icon {
  width: 40px;
  height: 40px;
  background: #f0f7ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #005bac;
  flex-shrink: 0;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  color: #999;
}

.info-value {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

/* ==================== 右侧快捷服务 ==================== */
.service-panel {
  flex: 1;
  min-width: 0;
}

.panel-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 28px;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.service-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.service-icon {
  width: 64px;
  height: 64px;
  background: #f0f7ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #005bac;
}

.service-card h4 {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.service-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.service-btn {
  display: inline-block;
  padding: 8px 24px;
  font-size: 13px;
  color: #005bac;
  border: 1px solid #005bac;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.service-btn:hover {
  background: #005bac;
  color: #fff;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: 992px) {
  .content-inner {
    flex-direction: column;
  }

  .company-card {
    width: 100%;
  }

  .service-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .service-cards {
    grid-template-columns: 1fr;
  }

  .banner-title {
    font-size: 24px;
  }
}
</style>
