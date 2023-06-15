<template>
  <div class="cpu-monitor">
    <el-popover effect="dark" :width="200" @before-enter="cpuMonitorShow">
      <template #reference>
        <span class="cpu-monitor-item"
          ><el-icon :size="28" color="#409eff"><Cpu /></el-icon
        ></span>
      </template>
      <template #default>
        <div class="cpu-monitor-info">
          <p class="cpu-used" style="height: 30px; line-height: 30px">
            {{ 'cpu使用率：' }}{{ cpuStatus.cpuUsed + '%' }}
          </p>
          <p class="disk-used" style="height: 30px; line-height: 30px">
            {{ '资源使用率：' }}{{ cpuStatus.diskUsed + '%' }}
          </p>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CpuMonitor',
});
</script>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { getCpuState } from '@/api/monitor';
const loading = ref(true);
const cpuStatus = ref({
  cpuUsed: 0,
  diskUsed: 0,
});
const getData = () => {
  loading.value = true;
  getCpuState().then((res) => {
    // console.log('磁盘使用率', res);
    if (res && res.cpu) {
      loading.value = false;
      cpuStatus.value.cpuUsed = res.cpu;
      cpuStatus.value.diskUsed = res.disk;
    }
  });
};
const cpuMonitorShow = () => {
  getData();
};
onBeforeMount(() => {
  getData();
});
</script>

<style scoped lang="scss">
.cpu-monitor {
  padding: 0 20px 0 0;
  height: 100%;
  display: flex;
  align-items: center;
  .cpu-monitor-item {
    display: inline-block;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
