<template>
  <div class="right-bottom-com">
    <div class="name-title">
      <div class="name-title-left">{{ '车辆冲洗趋势' }}</div>
      <div class="name-title-right">
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="今日" />
          <el-radio-button label="本周" />
          <el-radio-button label="本月" />
        </el-radio-group>
      </div>
    </div>
    <EcahrtItem
      :my-option="chartData"
      :refresh-echart="refreshEchart"
      @refresh-done="refreshDone"
      style="width: 100%; height: calc(100% - 30px)"
    ></EcahrtItem>
  </div>
</template>
<script lang="ts" setup>
import { EcahrtItem } from '@/components';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { getCountInfo } from '@/api/monitor';
const radio = ref('今日');
let timer = null;
let refreshEchart = ref(false);
const chartData = computed(() => {
  return {};
});

const refreshDone = (falg) => {
  if (falg) {
    refreshEchart.value = false;
  }
};

const getData = () => {
  let params = {
    date: radio.value == '今日' ? 1 : radio.value == '本周' ? 7 : 30,
  };
  getCountInfo(params)
    .then((res) => {
      console.log(res);
      // refreshEchart.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
};
const startTimer = () => {
  timer = setInterval(() => {
    getData();
  }, 5000);
};

const closeTimer = () => {
  clearInterval(timer);
  timer = null;
};
onMounted(() => {
  getData();
  startTimer();
});
onBeforeUnmount(() => {
  closeTimer();
});
</script>

<style lang="scss" scoped>
.right-bottom-com {
  height: 330px;
  padding: 3px;
  border: 1px solid #1bb4f9;
  box-shadow: #1bb4f9 0px 0px 5px 1px inset;
  border-radius: 5px;
  .name-title {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name-title-left {
      margin-left: 10px;
      width: fit-content;
      height: 30px;
      background: $screenTitleBg;
      padding: 3px 5px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
