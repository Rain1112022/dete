<template>
  <div class="task-container">
    <div class="task-table">
      <el-table :data="tableData()" style="width: 100%" max-height="760">
        <el-table-column fixed width="30" />
        <el-table-column prop="name" label="任务名称" width="150" show-overflow-tooltip />
        <el-table-column prop="camera" label="摄像机" width="260" show-overflow-tooltip />
        <el-table-column prop="host" label="主机" width="160" />
        <el-table-column prop="type" label="类型" width="140">
          <template #default="scope">
            <el-tag :type="scope.row.type === 1 ? 'success' : 'warning'">
              {{ scope.row.type === 1 ? '自动冲洗' : '人工冲洗' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="140">
          <template #default="scope">
            <el-button size="small" :type="scope.row.state == 1 ? 'success' : 'info'"
              @click="handleTask(scope.$index, scope.row)">{{ scope.row.state == 1 ? '运行' : '暂停' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="240">
          <template #default="scope">
            <span>{{ scope.row.time?.replace('T', '-') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="car_img" label="预览" width="220">
          <template #default="scope">
            <img :src="scope.row.one_img" height="80" alt="" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">检测区域配置</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-block">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        background layout="total ,prev, pager, next ,sizes" :total="state.total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>

  <Dialog v-model="dialogVisible" :title="'配置区域'" :maxHeight="'650px'">
    <div class="config-content">
      <div class="configRules" style="height: 70px; width: 100%">
        <el-button type="primary" @click="drawArea" :disabled="isDrawDisabled">{{ confAready ? '重新选区' : '开始选区'
        }}</el-button>
        <el-button type="primary" @click="confirm" :disabled="isConfirmDisabled">确定</el-button>
        <el-button type="primary" @click="clear" :disabled="isRevokeDisabled">清除</el-button>
        <p style="color: #ff2f33; font-size: 16px; margin-top: 10px">
          配置规则：起点为左上角，顺时针方向画出首尾相连的矩形，否则视为无效区域!
        </p>
      </div>
      <div class="canvas-img">
        <canvas id="canvasId" width="920" height="518"></canvas>
        <img :src="editImgSrc" width="920" height="" id="img" alt="" />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  computed,
  watch,
  ref,
  reactive,
  toRaw,
  onMounted,
  nextTick,
} from 'vue';
import { useTaskStore } from '@/stores/task';
import {
  getAllTask,
  delTask,
  stopTask,
  startTask,
  setTaskArea,
} from '@/api/task';
import { Dialog } from '@/components';
import { ElMessage } from 'element-plus';

interface Task {
  id: string;
  name: string;
  camera: string;
  host: string;
  type: string;
  time: string;
  state: number | string;
  point: string;
  one_img: string;
}
const taskStore = useTaskStore();
const taskList = ref<Task[]>([]);
const dialogVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const editImgSrc = ref('');
const drawFlag = ref(false);
const isDrawDisabled = ref(false);
const isFirst = ref(true)
const isConfirmDisabled = computed(() => {
  return drawArr.value.length && drawArr.value.length === 4 && !isFirst.value ? false : true;
});
const isRevokeDisabled = computed(() => {
  return drawArr.value.length && !confAready.value ? false : true;
});
let canvas = ref(null);
let ctx = ref(null);
let drawArr = ref<Array<number>[]>([]);
let currentId = ref('');
let confAready = ref(false);
const state = reactive({
  page: 1,
  limit: 10,
  total: taskList.value.length,
});
const getListFlag = computed(() => taskStore.handleFlag);
watch(getListFlag, (val) => {
  if (val) {
    getTaskList();
  }
});

const getTaskList = () => {
  getAllTask()
    .then((res) => {
      console.log('getAllTask', res);
      taskList.value = res;
      taskStore.handleTask(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

const tableData = () => {
  state.total = taskList.value.length;
  return taskList.value.filter(
    (item, index) =>
      item &&
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};

const handleCurrentChange = (e: number) => {
  state.page = e;
};

const handleSizeChange = (e: number) => {
  state.limit = e;
};

const handleTask = (index: number, row: Task) => {
  // console.log('开启/暂停', index, toRaw(row));
  if (row.state == 1) {
    console.log('暂停', index, toRaw(row));
    //暂停
    stopTask({ id: row.id })
      .then((res) => {
        console.log('暂停', res);
        if (res.result == 1) {
          getTaskList();
          ElMessage({
            type: 'success',
            message: '任务已暂停',
          });
        } else {
          ElMessage({
            type: 'error',
            message: '任务暂停失败',
          });
        }

      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('开启', index, toRaw(row));
    setTimeout(() => {
      getTaskList();
    }, 1000)

    //开启
    startTask({ id: row.id })
      .then((res) => {
        console.log(res);
        if (res.result == 1) {
          getTaskList();
          ElMessage({
            type: 'success',
            message: '任务已开启',
          });
        } else if (res.result == 2) {
          getTaskList();
          ElMessage({
            type: 'error',
            message: '任务开启失败',
          });
        } else if (res.result == 3) {
          getTaskList();
          ElMessage({
            type: 'warning',
            message: '请先配置检测区域',
          });
        }


      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const handleDelete = (index: number, row: Task) => {
  // console.log('删除', index, toRaw(row));
  let id = row.id;
  console.log('删除', index, id);
  delTask(id).then((res) => {
    console.log('删除任务结果', res);
    getTaskList();
    ElMessage({
      type: 'success',
      message: '任务已删除',
    });
  });
};

const handleEdit = async (index: number, row: Task) => {
  console.log('配置', index, toRaw(row));
  dialogVisible.value = true;
  editImgSrc.value = row.one_img;
  currentId.value = row.id;
  if (row.point) {
    let pointArr = JSON.parse((row.point as string).replace(/'/g, '"'));
    if (pointArr && pointArr.length) {
      confAready.value = true;
      isFirst.value = true
      await nextTick();
      canvas.value = document.getElementById('canvasId');
      ctx.value = canvas.value.getContext('2d');
      ctx.value.strokeStyle = '#ff0000';
      ctx.value.fillStyle = 'rgba(255,0,0,0.2)';
      pointArr.forEach((p, i) => {
        drawArr.value[i] = [];
        drawArr.value[i][0] = Math.ceil((p[0] * canvas.value.width) / 1920);
        drawArr.value[i][1] = Math.ceil((p[1] * canvas.value.height) / 1080);
        draw();
      });
      // console.log(drawArr.value.length);

    } else {
      confAready.value = false;
      isFirst.value = false
      drawArr.value = [];
    }
  }
};
//开始选区/重新选区
const drawArea = () => {
  ElMessage({
    message: '现在开始选择区域',
    type: 'success',
  });
  isFirst.value = false
  drawFlag.value = true;
  drawArr.value = [];
  canvas.value = document.getElementById('canvasId');
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    ctx.value.strokeStyle = '#ff0000';
    ctx.value.fillStyle = 'rgba(255,0,0,0.2)';
  }
  draw();
  canvas.value.addEventListener('click', clickStart, false);
};
//保存点
const clickStart = (e) => {
  if (drawFlag.value) {
    // console.log(e.clientX, e.clientY);
    //返回值是一个 DOMRect 对象，由该元素的 getClientRects() 方法返回的一组矩形的集合:
    //top: 元素上边距离页面上边的距离;
    //left: 元素右边距离页面左边的距离;
    //right: 元素右边距离页面左边的距离;
    //bottom: 元素下边距离页面上边的距离;
    //width: 元素宽度;
    //height: 元素高度;
    let r = canvas.value.getBoundingClientRect();
    // console.log(r);
    drawArr.value.push([e.clientX - r.left, e.clientY - r.top]);
    draw();
  }
};

const clear = () => {
  console.log('清除', drawArr.value);
  if (drawArr.value.length) {
    drawArr.value = [];
    draw();
  }
};

const confirm = () => {
  //首先判断是否符合画区域规则
  console.log('确认', drawArr.value);
  drawFlag.value = false;
  if (drawArr.value.length != 4) {
    ElMessage({
      message: '不符合画区域规则！请重新选择',
      type: 'error',
    });
    drawArr.value = [];
    draw();
  } else {
    let point = [];
    drawArr.value.forEach((p) => {
      point.push([
        Math.ceil((p[0] * 1920) / 920),
        Math.ceil((p[1] * 1080) / 518),
      ]);
    });

    let params = {
      id: currentId.value,
      point: JSON.stringify(point),
    };
    console.log(params);

    setTaskArea(params).then((res) => {
      console.log('setTaskArea', res);
      drawArr.value = [];
      ElMessage({
        message: '配置成功',
        type: 'success',
      });
    });
  }
};

const draw = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.value.beginPath();
  if (drawArr.value[0])
    ctx.value.moveTo(drawArr.value[0][0], drawArr.value[0][1]);
  for (let i = 1; i < drawArr.value.length; i++) {
    ctx.value.lineTo(drawArr.value[i][0], drawArr.value[i][1]);
  }
  ctx.value.closePath();
  ctx.value.fill();
  ctx.value.stroke();
};

onMounted(() => {
  getTaskList();
});
</script>

<style lang="scss" scoped>
.task-container {
  width: 100%;
  height: 100%;
  border: 1px solid var(--el-text-color-regular);
  padding: 10px;
  // overflow: hidden;
  position: relative;

  .task-table {
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
  }

  .pagination-block {
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 20px;

    .el-pagination {
      justify-content: flex-end;
    }
  }
}

.config-content {
  width: 100%; //640  650
  height: 100%;

  .canvas-img {
    width: 920px;
    height: 520px;
    position: relative;

    #canvasId {
      position: absolute;
    }
  }
}
</style>
