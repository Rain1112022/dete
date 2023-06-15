<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, type RouteRecordRaw } from 'vue-router';

let matchedList = ref<RouteRecordRaw[]>([]);
const route = useRoute();

const getBreadcrumb = () => {
  matchedList.value = route.matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

watchEffect(getBreadcrumb);
</script>

<template>
  <div>
    <span class="breadcrumb" v-for="item in matchedList" :key="item.path">{{
      item?.meta?.title
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  color: $menuText;
  font-size: 18px;
}
</style>
