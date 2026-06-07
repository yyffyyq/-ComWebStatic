<template>
  <div class="page-placeholder">
    <div class="placeholder-content">
      <h1>获取支持</h1>
      <p>该页面正在建设中，敬请期待...</p>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-placeholder {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}
.placeholder-content {
  text-align: center;
  padding: 60px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.placeholder-content h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 16px;
}
.placeholder-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}
.back-link {
  display: inline-block;
  padding: 10px 28px;
  background-color: #005bac;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.back-link:hover {
  background-color: #004a8d;
}
</style>
