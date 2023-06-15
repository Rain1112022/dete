<template>
  <div class="right-top-com">
    <div class="name-title">
      <div class="name-title-left">{{ '车辆冲洗统计' }}</div>
      <div class="name-title-right">
        <el-radio-group v-model="radio">
          <el-radio-button label="今日" />
          <el-radio-button label="本周" />
          <el-radio-button label="本月" />
        </el-radio-group>
      </div>
    </div>
    <div class="right-top-content">
      <div v-for="(item, index) in percentDataList" class="percent">
        <div class="percent-img">
          <img src="@/assets/imgs/zhatuyunshu.png" alt="" />
        </div>
        <div class="percent-text">
          <div class="text-type">{{ item.type }}</div>
          <div class="text-info-count">
            <span class="text-number">{{ item.count }}</span>
            <span class="text-unit">{{ item.unit }}</span>
          </div>
        </div>
        <EcahrtItem
          :my-option="
            index === 0
              ? percentOption0
              : index === 1
              ? percentOption1
              : percentOption2
          "
          :refresh-echart="refreshEchart"
          @refresh-done="refreshDone"
          style="width: 100px; height: 90px"
        ></EcahrtItem>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import { EcahrtItem } from '@/components';
import { getCountInfo } from '@/api/monitor';
const colorList = [
  {
    textStyle: '#3fc0fb',
    series: {
      color: ['#00bcd44a', 'transparent'],
      dataColor: {
        normal: '#03a9f4',
        shadowColor: '#97e2f5',
      },
    },
  },
  {
    textStyle: '#ffe000',
    series: {
      color: ['#faf3a378', 'transparent'],
      dataColor: {
        normal: '#ff9800',
        shadowColor: '#fcebad',
      },
    },
  },
  {
    textStyle: '#f03639',
    series: {
      color: ['#e0947f', 'transparent'],
      dataColor: {
        normal: '#ea3000',
        shadowColor: '#e65d6e',
      },
    },
  },
];
let refreshEchart = ref(false);
let percentList = ref([60, 10, 30]);
let timer = null;
const radio = ref('今日');
let seriesData = reactive([]);
let scaleData = reactive([
  {
    name: '冲洗完成',
    value: 0,
  },
  {
    name: '未冲洗',
    value: 0,
  },
  {
    name: '冲洗不足',
    value: 0,
  },
]);

const percentDataList = computed(() => {
  return [
    {
      type: '冲洗完成',
      count: scaleData[0].value,
      unit: '车次',
    },
    {
      type: '未冲洗',
      count: scaleData[1].value,
      unit: '车次',
    },
    {
      type: '冲洗不足',
      count: scaleData[2].value,
      unit: '车次',
    },
  ];
});
const percentOption0 = computed(() => {
  return {
    title: {
      text: percentList.value[0] * 1 + '%',
      x: 'center',
      y: 'center',
      textStyle: {
        color: colorList[0].textStyle,
        fontSize: 16,
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['74%', '90%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        color: colorList[0].series.color,
        label: {
          show: false,
        },
        data: seriesData[0],
      },
    ],
  };
});

const percentOption1 = computed(() => {
  return {
    title: {
      text: percentList.value[1] * 1 + '%',
      x: 'center',
      y: 'center',
      textStyle: {
        color: colorList[1].textStyle,
        fontSize: 16,
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['74%', '90%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        color: colorList[1].series.color,
        label: {
          show: false,
        },
        data: seriesData[1],
      },
    ],
  };
});
const percentOption2 = computed(() => {
  return {
    title: {
      text: percentList.value[2] * 1 + '%',
      x: 'center',
      y: 'center',
      textStyle: {
        color: colorList[2].textStyle,
        fontSize: 16,
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['74%', '90%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        color: colorList[2].series.color,
        label: {
          show: false,
        },
        data: seriesData[2],
      },
    ],
  };
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
      // console.log(res);
      let p0 = res.wash === 0 ? 0 : Math.ceil((res.wash / res.all_count) * 100);
      let p1 =
        res.no_wash === 0 ? 0 : Math.ceil((res.no_wash / res.all_count) * 100);
      let p2 =
        res.no_washer === 0
          ? 0
          : Math.ceil((res.no_washer / res.all_count) * 100);

      scaleData[0].value = res.wash;
      scaleData[1].value = res.no_wash;
      scaleData[2].value = res.no_washer;
      for (let i = 0; i < scaleData.length; i++) {
        seriesData[i] = [
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              color: colorList[i].series.dataColor.normal,
              shadowBlur: 10,
              shadowColor: colorList[i].series.dataColor.shadowColor,
            },
          },
          {
            value: 100 - scaleData[i].value,
          },
        ];
      }
      percentList.value[0] = p0;
      percentList.value[1] = p1;
      percentList.value[2] = p2;
      refreshEchart.value = true;
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
.right-top-com {
  height: 430px;
  padding: 3px;
  border: 1px solid #1bb4f9;
  box-shadow: #1bb4f9 0px 0px 5px 1px inset;
  border-radius: 5px;
  .name-title {
    width: 100%;
    height: 40px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    .name-title-left {
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
  .right-top-content {
    width: 100%;
    height: calc(100% - 40px);
    .percent {
      width: 100%;
      padding: 0 30px;
      height: 126px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .percent-img {
        width: 86px;
        height: 86px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          width: 100%;
          height: 100%;
          content: '';
          position: absolute;
          background: url('@/assets/imgs/img1.png') center center;
          border-radius: 100px;
          background-size: 100% 100%;
          opacity: 0.5;
          left: 0;
          top: 0;
          animation: rotatep 15s infinite linear;
        }
        &::after {
          width: 85%;
          height: 85%;
          content: '';
          position: absolute;
          background: url('@/assets/imgs/img2.png') center center;
          border-radius: 100px;
          background-size: 100% 100%;
          opacity: 0.5;
          left: 8%;
          top: 8%;
          animation: rotaten 15s infinite linear;
        }
      }
      .percent-text {
        width: 120px;
        height: 96px;
        padding-top: 26px;
        padding-left: 20px;
        .text-type {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: $text-color-primary;
        }
        .text-info-count {
          width: 100%;
          height: 50px;
          .text-number {
            height: 40px;
            line-height: 40px;
            color: #1bb4f9;
            font-size: 34px;
            font-weight: 600;
          }
          .text-unit {
            padding-left: 10px;
            font-size: 16px;
            color: $text-color-primary;
          }
        }
      }
    }
  }
}

@keyframes rotaten {
  to {
    transform: rotate(-360deg);
  }
}
@keyframes rotatep {
  to {
    transform: rotate(360deg);
  }
}
</style>
