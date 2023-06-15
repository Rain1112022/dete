<template>
  <div class="EchartItem" :id="uid" :style="style"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EchartItem',
});
</script>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import * as echarts from 'echarts';
const emits = defineEmits(['refreshDone']);
// 因为是封装的组件，会多次调用，id不能重复，要在初始化之前写，不然会报错dom为定义
let uid = ref(null);
let myChart;
onBeforeMount(() => {
  uid.value = `echarts-uid-${Math.ceil(Math.random() * 1000000)}`;
});
const showChart = () => {
  if (myChart) {
    myChart.clear();
    myChart.setOption(props.myOption);
  } else {
    myChart = echarts.init(document.getElementById(uid.value));
    myChart.setOption(props.myOption);
  }
};

onMounted(() => {
  console.log('EchartItem');
  showChart();
  // 监听页面的大小
  // window.addEventListener('resize', () => {
  //   myChart.resize();
  // });
});

const props = defineProps({
  style: {
    type: Object,
    default: () => ({
      width: '100%',
      height: '100%',
    }),
  },
  myOption: {
    type: Object,
    default: () => ({}),
  },
  refreshEchart: {
    type: Boolean,
    default: () => false,
  },
});

watch(
  () => props.refreshEchart,
  (val) => {
    if (val) {
      // console.log('刷新！！！');
      showChart();
      emits('refreshDone', true);
    }
  }
);
</script>

<style lang="scss" scoped>
.EchartItem {
  width: 100px;
  height: 100px;
}
</style>
