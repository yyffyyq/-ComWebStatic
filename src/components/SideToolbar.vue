<template>
  <div class="side-toolbar">
    <router-link to="/online-service" class="toolbar-item">
      <div class="icon-wrap">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <span class="toolbar-text">在线客服</span>
    </router-link>
    <div
      class="toolbar-item phone-item"
      @mouseenter="showPhone = true"
      @mouseleave="showPhone = false"
    >
      <div class="icon-wrap">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </div>
      <span class="toolbar-text">电话咨询</span>
      <transition name="phone-popup">
        <div v-if="showPhone" class="phone-popup">
          <div class="popup-arrow"></div>
          <div class="popup-content">
            <p class="popup-tip">了解更多咨询或疑问<br />请拨打</p>
            <p class="popup-phone">86838222</p>
          </div>
        </div>
      </transition>
    </div>
    <router-link to="/support" class="toolbar-item">
      <div class="icon-wrap">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <span class="toolbar-text">获取支持</span>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showPhone = ref(false)
</script>

<style scoped lang="scss">
.side-toolbar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  background: #409eff;
  border-radius: 8px 0 0 8px;
  box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.15);
}
.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  padding: 14px 0;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
}
.toolbar-item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.toolbar-item:hover {
  background: #66b1ff;
}
.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
.toolbar-text {
  font-size: 12px;
  line-height: 1.2;
}
.phone-item {
  position: relative;
}
.phone-popup {
  position: absolute;
  right: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  padding: 18px 24px;
  white-space: nowrap;
  z-index: 1000;
  border: 1px solid #f0f0f0;
}
.popup-arrow {
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #fff;
}
.popup-content {
  text-align: left;
}
.popup-tip {
  font-size: 13px;
  color: #888;
  line-height: 1.7;
  margin-bottom: 6px;
}
.popup-phone {
  font-size: 22px;
  font-weight: 700;
  color: #005bac;
}
.phone-popup-enter-active,
.phone-popup-leave-active {
  transition: all 0.3s ease;
}
.phone-popup-enter-from,
.phone-popup-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(20px);
}
@media (max-width: $breakpoint-mobile) {
  .side-toolbar {
    display: none;
  }
}
</style>
