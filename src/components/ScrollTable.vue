<template>
  <div class="scroll-table">
    <dl>
      <dd class="t-ellipsis">{{ listColTitle[0] }}</dd>
      <dd class="t-ellipsis">{{ listColTitle[1] }}</dd>
      <dd class="t-ellipsis">{{ listColTitle[2] }}</dd>
    </dl>
    <div
      class="scroll-table-body"
      @mouseenter="closeScroll"
      @mouseleave="openScroll"
    >
      <ul ref="ul">
        <li v-for="item in listData">
          <div class="t-ellipsis">{{ item.car_plate }}</div>
          <div class="t-ellipsis">{{ item.time }}</div>
          <div class="t-ellipsis">{{ stateMap[item.state] }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { stateMap } from '@/utils/dict';
export default defineComponent({
  name: 'ScrollTable',
});
</script>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
interface DataItem {
  car_plate: string;
  state: string | number;
  time: string;
}
const props = defineProps({
  listColTitle: {
    type: Array,
    default: () => ['车牌号', '时间', '冲洗识别'],
  },
  listData: {
    type: Array<DataItem>,
    default: () => [],
  },
});
const ul = ref<HTMLDivElement | null>(null);
const oul = () => ul.value as HTMLDivElement;
let timer = null;
// 开启滚动
const openScroll = () => {
  timer = setInterval(() => {
    try {
      if (oul()) {
        if (
          Math.ceil(oul().scrollTop + oul().clientHeight) >= oul().scrollHeight
        ) {
          closeScroll();
          // oul().scrollTop = 0;
        } else {
          oul().scrollTop = oul().scrollTop + 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, 100);
};
// 关闭滚动
const closeScroll = () => {
  clearInterval(timer);
  timer = null;
};

//
watch(props.listData, () => {
  openScroll();
});

onMounted(() => {
  openScroll();
});
onBeforeUnmount(() => {
  closeScroll();
});
</script>

<style lang="scss" scoped>
.scroll-table {
  padding: 10px 30px;
  dl,
  .scroll-table-body {
    width: 100%;
    margin: 0 auto;
    color: #f0ece2;
  }

  dl {
    display: flex;

    dd {
      text-align: left;
      border-bottom: 1px solid #1b96ee;
      margin-bottom: 6px;
      color: #1b96ee;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }

    dd:nth-child(1) {
      width: 35%;
    }

    dd:nth-child(2) {
      width: 30%;
    }

    dd:nth-child(3) {
      width: 35%;
    }
  }

  .scroll-table-body {
    height: calc(100% - 40px);
  }

  ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    // -ms-overflow-style: none;
    // overflow: -moz-scrollbars-none;
    // &::-webkit-scrollbar { width: 0 !important; }
    li {
      width: 100%;
      height: 38px;
      line-height: 38px;
      text-align: left;
      font-size: 16px;
      color: #76dbd1;
      display: flex;

      div {
        color: #76dbd1;
      }

      div:nth-child(1) {
        width: 35%;
      }

      div:nth-child(2) {
        width: 30%;
      }

      div:nth-child(3) {
        width: 35%;
      }
    }
  }
}

/* 滚动条 */
::-webkit-scrollbar {
  z-index: 50;
  width: 3px;
  height: 3px;
  border: none;
  outline: none;
}
* {
  cursor: pointer;
}
::-webkit-scrollbar-track {
  background-color: rgba(206, 14, 14, 0);
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: #1bb4f9;
  transition: all 0.2s;
  height: 20px;
}

:hover::-webkit-scrollbar-thumb {
  transition: all 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to top, #00d9a2, #007af8);
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-corner {
  display: none;
}
</style>
