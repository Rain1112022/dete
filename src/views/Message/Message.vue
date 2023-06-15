<template>
  <div class="detail-container">
    <div class="detail-table">
      <el-table :data="tableData()" style="width: 100%" max-height="760">
        <el-table-column fixed width="50" />
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="car_plate" label="车牌" width="180" />
        <el-table-column label="类型" width="180">
          <template #default="scope">
            <span>{{ carTypeMap[scope.row.car_type] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
          <template #default="scope">
            <span>{{ stateMap[scope.row.state] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="240" />
        <el-table-column prop="car_img" label="预览" width="240">
          <template #default="scope">
            <img :src="scope.row.car_img" height="80" alt="" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total ,prev, pager, next ,sizes"
        :total="state.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, computed, watch } from 'vue';
import {
  getAllMessage,
  deleteMessage,
  getMessageById,
  getMessageByPlate,
} from '@/api/message';
import { stateMap, carTypeMap } from '@/utils/dict';
import { ElMessage } from 'element-plus';
import { useMessageStore } from '@/stores/message';
interface Event {
  id: string;
  car_plate: string;
  car_type: string;
  state: string;
  car_img: string;
  time: string;
}
let dataList = ref<Event[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const messsageStore = useMessageStore();
const getSearchFlag = computed(() => messsageStore.handleFlag);
watch(getSearchFlag, (val) => {
  if (val) {
    if (messsageStore.searchInput.key === 'id') {
      getMessageById(messsageStore.searchInput.val)
        .then((res) => {
          if (res && res.length) {
            dataList.value = res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getMessageByPlate({ plate: messsageStore.searchInput.val })
        .then((res) => {
          if (res && res.length) {
            dataList.value = res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

const state = reactive({
  page: 1,
  limit: 10,
  total: dataList.value.length,
});
const getList = () => {
  getAllMessage().then((res) => {
    console.log(res);
    if (res.length) {
      dataList.value = res;
    }
  });
};
const handleDelete = (index: number, row: Event) => {
  // console.log('删除', index, toRaw(row));
  let id = row.id;
  console.log('删除', index, id);
  deleteMessage(id).then((res) => {
    console.log('删除结果', res);
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
  });
};
//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  // console.log(dataList.value.length);
  state.total = dataList.value.length;
  return dataList.value.filter(
    (item, index) =>
      item &&
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};
//改变页码
const handleCurrentChange = (e: number) => {
  state.page = e;
};
//改变页数限制
const handleSizeChange = (e: number) => {
  state.limit = e;
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.detail-container {
  width: 100%;
  height: 100%;
  border: 1px solid var(--el-text-color-regular);
  padding: 10px;
  // overflow: hidden;
  position: relative;
  .detail-table {
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
</style>
