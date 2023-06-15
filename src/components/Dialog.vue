<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { computed, useAttrs, ref, unref, useSlots, watch, nextTick } from 'vue';
// import { Screenfull } from '@/components';

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Dialog',
  },
  fullscreen: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: String,
    default: '500px',
  },
});

const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'maxHeight'];
  const attrs = useAttrs();
  const obj = { ...attrs, ...props };
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key];
    }
  }
  return obj;
});

const isFullscreen = ref(false);

// const toggleFull = () => {
//   isFullscreen.value = !unref(isFullscreen);
// };

const dialogHeight = ref(props.maxHeight);

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick();
    if (val) {
      const windowHeight = document.documentElement.offsetHeight;
      dialogHeight.value = `${
        windowHeight - 55 - 60 - (slots.footer ? 63 : 0)
      }px`;
    } else {
      dialogHeight.value = props.maxHeight;
    }
  },
  {
    immediate: true,
  }
);

const dialogStyle = computed(() => {
  // console.log(unref(dialogHeight));
  return {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    overflow: 'hidden',
    height: unref(dialogHeight),
  };
});
</script>

<template>
  <ElDialog
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="slot-header">
        <slot name="title">
          {{ title }}
        </slot>
        <!-- <Screenfull> </Screenfull> -->
        <!-- <el-icon
          class="cursor-pointer is-hover"
          color="var(--el-color-info)"
          :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
          @click="toggleFull"
          ><FullScreen
        /></el-icon> -->
      </div>
    </template>

    <div :style="dialogStyle">
      <slot></slot>
    </div>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<style lang="less" scoped>
.slot-header {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
}
.is-hover {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
