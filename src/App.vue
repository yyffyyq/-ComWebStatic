<script setup>
import Navbar from './components/Navbar.vue'
import SideToolbar from './components/SideToolbar.vue'
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    <router-view />
    <SideToolbar />
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
