<template>
  <div class="layout-main">
    <LayoutNavbar />
    <div class="layout-main-body">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutNavbar from './LayoutNavbar.vue';
</script>

<style scoped lang="scss">
.layout-main {
  width: 100%;
  height: 100%;
  .layout-main-body {
    box-sizing: border-box;
    height: calc(100vh - 60px);
    padding: 20px;
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
