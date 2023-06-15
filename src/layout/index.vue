<script setup lang="ts">
import { computed, watch } from 'vue';
import LayoutSidebar from './components/LayoutSidebar.vue';
import LayoutMain from './components/LayoutMain.vue';
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();
const classObj = computed(() => ({
  hideSidebar: !appStore.getSidebarOpened,
  openSidebar: appStore.getSidebarOpened,
  withoutAnimation: appStore.getSidebarWithoutAnimation,
}));
watch(classObj, (nv) => {
  console.log(nv);
  if (nv && nv.hideSidebar) {
    // let side = document.querySelector(".sidebar-container")
    (
      document.querySelector('.sidebar-container') as HTMLElement
    ).style.setProperty('--sideWidth', '54px');
    (
      document.querySelector('.main-container') as HTMLElement
    ).style.setProperty('--sideWidth', '54px');
  } else {
    (
      document.querySelector('.sidebar-container') as HTMLElement
    ).style.setProperty('--sideWidth', '210px');
    (
      document.querySelector('.main-container') as HTMLElement
    ).style.setProperty('--sideWidth', '210px');
  }
});
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <LayoutSidebar class="sidebar-container" />
    <div class="main-container">
      <LayoutMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
