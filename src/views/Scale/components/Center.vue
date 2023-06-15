<template>
  <div class="center-com">
    <div class="name-title">
      <div class="name-title-left">{{ '监控点导航' }}</div>
      <div class="name-title-right">
        <el-radio-group v-model="radio">
          <el-radio-button label="车道1" />
          <el-radio-button label="车道2" />
        </el-radio-group>
      </div>
    </div>
    <div class="center-com-content">
      <img :src="imgSrc" width="810" height="500" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
// import { getRealVideo } from '@/api/monitor';
const radio = ref('车道1');
const imgSrc = computed(() => {
  return '/api/GH/Main/real';
});
// const getData = () => {
//   getRealVideo()
//     .then((res) => {
//       console.log('实时监控', res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// const startTimer = () => {};

// const closeTimer = () => {};
onMounted(() => {
  // console.log(process.env.VITE_APP_API_BASE_URL);
  // getData();
});
onBeforeUnmount(() => {});
</script>

<style lang="scss" scoped>
.center-com {
  width: 900px;
  height: 670px;
  background: url('@/assets/imgs/left_con3.png') center center;
  background-size: 100% 100%;
}
.name-title {
  width: 100%;
  height: 78px;
  padding: 14px 50px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name-title-left {
    width: fit-content;
    line-height: 35px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    // background: url('@/assets/imgs/pushmessage_level03.png') center center
    //   no-repeat;
    // background-size: 100% 100%;
    background: $screenTitleBg;
    padding: 3px 5px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
.center-com-content {
  margin-left: 40px;
  width: 90%;
  height: calc(100% - 100px);
  background: $coverBg;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
