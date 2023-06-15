<template>
  <div class="left-bottom-com">
    <div class="name-title">{{ '今日冲洗情况' }}</div>
    <div class="scroll-table">
      <ScrollTable
        v-if="scrollTableShow"
        :listColTitle="listColTitle"
        :listData="listData"
      ></ScrollTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ScrollTable } from '@/components';
import { getDayAllInfo } from '@/api/monitor';
import { handelTime } from '@/utils/util';
// import { stateMap, carTypeMap } from '@/utils/dict';
let timer = null;
const listColTitle = ['车牌号', '时间', '冲洗识别'];
const scrollTableShow = ref(false);
interface DataItem {
  car_plate: string;
  state: string | number;
  time: string;
}
let listData = ref<DataItem[]>([]);

const getDayAll = () => {
  let params = {
    date: 1,
  };
  getDayAllInfo(params)
    .then((res) => {
      if (res.length) {
        if (listData.value.length > 100) listData.value.splice(0, 80);
        res.forEach((ele) => {
          listData.value.push({
            car_plate: ele.car_plate,
            state: ele.state,
            time: handelTime(ele.time),
            //time.split('T')[1].split('.')[0]
          });
        });
        scrollTableShow.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const startTimer = () => {
  timer = setInterval(() => {
    getDayAll();
  }, 5000);
};

const closeTimer = () => {
  clearInterval(timer);
  timer = null;
};

onMounted(() => {
  getDayAll();
  startTimer();
});
onBeforeUnmount(() => {
  closeTimer();
  scrollTableShow.value = false;
});
</script>

<style lang="scss" scoped>
.left-bottom-com {
  height: 670px;
  width: 100%;
  padding: 3px;
  border: 1px solid #1bb4f9;
  box-shadow: #1bb4f9 0px 0px 5px 1px inset;
  border-radius: 5px;
  .name-title {
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
  .scroll-table {
    height: 620px;
    width: 100%;
  }
}
</style>
