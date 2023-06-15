<template>
  <div class="footer-com">
    <div class="name-title">
      <div class="name-title-left">{{ '今日冲洗统计' }}</div>
      <div class="name-title-right">
        <el-radio-group v-model="radio">
          <el-radio-button label="正常清洗" />
          <el-radio-button label="全部" />
          <el-radio-button label="未冲洗" />
          <el-radio-button label="车辆清洁度不足" />
          <el-radio-button label="车辆绕行" />
          <el-radio-button label="其他" />
        </el-radio-group>
      </div>
    </div>
    <div class="footer-com-content">
      <div class="footer-img-list" v-if="imgList && imgList.length">
        <div class="footer-img-item" v-for="item in imgList">
          <img :src="item.car_img" alt="" width="320" height="200" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getDayStateInfo } from '@/api/monitor';
// import { stateMap } from '@/utils/dict';
const radio = ref('正常清洗');
let timer = null;
let imgList = ref([]);
const getData = () => {
  let check = radio.value;
  let params = {
    date: 1,
    state:
      check == '车辆绕行'
        ? 1
        : check == '车辆清洁度不足'
        ? 2
        : check == '未冲洗'
        ? 3
        : check == '其他'
        ? 4
        : check == '正常清洗'
        ? 5
        : 0,
  };
  getDayStateInfo(params)
    .then((res) => {
      console.log(res);
      if (res.length) {
        // if (
        //   radio.value !== '全部' &&
        //   imgList.value.length &&
        //   imgList.value.length > 100
        // ) {
        //   imgList.value.splice(0, 50);
        // }
        imgList.value = res;
      }
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
.footer-com {
  height: 298px;
  width: 100%;
  padding: 3px;
  border: 1px solid #1bb4f9;
  box-shadow: #1bb4f9 0px 0px 5px 1px inset;
  border-radius: 5px;
  margin-bottom: 5px;
  .name-title {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $menuText;
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
    .name-title-right {
      padding: 0 20px;
    }
  }
  .footer-com-content {
    height: 230px;
    width: 100%;
    overflow: hidden;
    .footer-img-list {
      overflow-x: scroll;
      height: 100%;
      width: 100%;
      padding-left: 10px;
      display: flex;
      justify-content: start;
      align-items: center;
      .footer-img-item {
        padding-right: 10px;
      }
    }
  }
}
</style>
