<template>
  <div class="left-top-com">
    <div class="name-title">今日出场统计</div>
    <div class="left-top-content">
      <div class="image-info">
        <div class="circle-effect">
          <img
            class="effect-pos around-ani"
            src="@/assets/imgs/aroundeffect.png"
          />
          <div class="effect-pos across-effect">
            <div class="across-effect-in"></div>
          </div>
          <img class="effect-pos sign" src="@/assets/imgs/zhatuyunshu.png" />
        </div>
      </div>

      <div class="text-info">
        <div class="text-info-car">
          <span class="text-number">{{ totalCar }}</span>
          <span class="text-unit">{{ '辆' }}</span>
        </div>
        <div class="text-info-count">
          <span class="text-number">{{ totalCount }}</span>
          <span class="text-unit">{{ '车次' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getOutInfo } from '@/api/monitor';
const totalCar = ref(13);
const totalCount = ref(10);
let timer = null;
const getData = () => {
  let params = {
    date: 1,
  };
  getOutInfo(params)
    .then((res) => {
      totalCar.value = res.all_plate;
      totalCount.value = res.all_car;
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
.left-top-com {
  height: 230px;

  padding: 3px;
  border: 1px solid #1bb4f9;
  box-shadow: #1bb4f9 0px 0px 5px 1px inset;
  border-radius: 5px;
  margin-bottom: 10px;
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
  .left-top-content {
    height: 200px;
    width: 100%;
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .image-info {
      width: 60%;
      height: 100%;
      position: relative;
      .circle-effect {
        border-radius: 50%;
        border: rgba(0, 168, 255, 0.6) 1px solid;
        position: absolute;
        width: 150px;
        height: 150px;
        left: 0;
        top: 0;
        .effect-pos {
          position: absolute;
          width: 148px;
          height: 148px;
        }
        .around-ani {
          animation: route-ani linear infinite 3.8s forwards;
        }
        .across-effect {
          background-color: rgba(0, 126, 255, 0.05);
          border-radius: 50%;
          width: 138px;
          height: 138px;
          margin: 5px 0 0 5px;
          .across-effect-in {
            background-color: rgba(0, 126, 255, 0.3);
            border-radius: 50%;
            margin: auto;
            width: 138px;
            height: 138px;
          }
        }
        .sign {
          width: 148px;
          height: 148px;
        }
      }
    }
    .text-info {
      width: 40%;
      height: 100%;
      padding-top: 20px;
      .text-info-car,
      .text-info-count {
        width: 100%;
        height: 70px;
        .text-number {
          height: 70px;
          line-height: 70px;
          color: #1bb4f9;
          font-size: 40px;
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

@keyframes route-ani {
  25% {
    transform: rotate(-90deg);
  }

  50% {
    transform: rotate(-180deg);
  }

  75% {
    transform: rotate(-270deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
