<template>
  <div class="scale-box" ref="ScaleBoxRef" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="container-header">
      <h3 class="title">车辆冲洗监测系统</h3>
      <div class="router-button" @click="goTo">
        <img src="@/assets/imgs/info-img-2.png" alt="" />
        <span class="btn-text">示例项目</span>
        <!-- <el-button plain @click="goTo"
          ><el-icon><Menu /></el-icon
        ></el-button> -->
      </div>
    </div>
    <slot></slot>
  </div>
  <!--  -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ScaleBox',
});
</script>

<script lang="ts" setup>
import { _throttle } from '@/utils/util';
import { ref, onMounted, onUnmounted, withDefaults } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
interface prop {
  width?: number;
  height?: number;
}
const props = withDefaults(defineProps<prop>(), {
  width: 1920,
  height: 1080,
});
const scale = ref(0);
const width = ref(props.width);
const height = ref(props.height);
const ScaleBoxRef = ref();
const getScale = () => {
  const wh = window.innerHeight / height.value;
  const ww = window.innerWidth / width.value;
  return ww < wh ? ww : wh;
};
const setScale = () => {
  scale.value = getScale();
  if (ScaleBoxRef.value) {
    // console.log(ScaleBoxRef.value);
    ScaleBoxRef.value.style.setProperty('--scale', scale.value);
  }
};
const resize = _throttle(
  () => {
    setScale();
  },
  200,
  1
);

const goTo = () => {
  router.push('/task');
};
onMounted(() => {
  setScale();
  window.addEventListener('resize', resize);
});
onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped>
.scale-box {
  position: absolute;
  transform: scale(var(--scale)) translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
  background-image: url('@/assets/imgs/view_bg.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .container-header {
    width: 100%;
    height: 100px;
    position: relative;
    background: url('@/assets/imgs/pic-2.png') 160px 13px/85% 108% no-repeat,
      url('@/assets/imgs/header_bg_02.png') 0 0/100% 100% no-repeat;

    .router-button {
      position: absolute;
      cursor: pointer;
      top: 38px;
      left: 20px;
      width: 180px;
      height: 55px;
      padding: 0 10px;
      background: url('@/assets/imgs/pushmessage_level03.png') center center no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .btn-text {
        font-size: 22px;
        color: #fff;
        font-weight: 600;
      }
    }

    .title {
      line-height: 96px;
      font-size: 30px;
      color: rgb(255, 255, 255);
      text-shadow: rgb(255 255 255) 0px 0px 15px;
      font-weight: bold;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
