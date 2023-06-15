<template>
  <el-row class="navbar">
    <el-col :span="6" class="navbar-left">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebarOpened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <RouterBreadcrumb
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </el-col>
    <el-col :span="18" class="navbar-right">
      <SearchField></SearchField>
      <div v-show="btnShow">
        <el-button type="primary" @click="openSearchForm">
          <span style="font-size: 14px; font-weight: 600; color: #fff">{{
            btnText
          }}</span>
        </el-button>
      </div>
      <CpuMonitor></CpuMonitor>
      <Screenfull></Screenfull>
      <Avatar></Avatar>
    </el-col>
  </el-row>

  <Dialog v-model="dialogVisible" :title="btnText" :maxHeight="'300px'">
    <el-form
      style="width: 400px"
      ref="taskFormRef"
      :model="taskForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-taskForm"
    >
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="taskForm.name" />
      </el-form-item>
      <el-form-item label="rtsp流" placeholder="相机rtsp流" prop="camera">
        <el-input v-model="taskForm.camera" />
        <!-- <el-select v-model="taskForm.camera" placeholder="任务类型">
          <el-option
            v-for="item in cameraOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item label="主机" placeholder="主机" prop="host">
        <el-input v-model="taskForm.host" />
        <!-- <el-select v-model="taskForm.host" placeholder="任务类型">
          <el-option
            v-for="item in hostOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
      </el-form-item>

      <el-form-item label="任务类型" prop="type">
        <el-select v-model="taskForm.type" placeholder="任务类型">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(taskFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(taskFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { useAppStore } from '@/stores/app';
import { useTaskStore } from '@/stores/task';
import Hamburger from './Humburger.vue';
import RouterBreadcrumb from './RouterBreadcrumb.vue';
import Avatar from './Avatar.vue';
import { Screenfull, CpuMonitor, SearchField, Dialog } from '@/components';
import type { FormInstance, FormRules } from 'element-plus';
import { useRoute } from 'vue-router';
const appStore = useAppStore();
const taskStore = useTaskStore();
const taskFormRef = ref<FormInstance>();
const btnText = ref('创建任务');
const dialogVisible = ref(false);
// const hasSubmit = computed(() => taskStore.handleFlag);
// rtsp://admin:a1234567@192.169.7.123:554
// /home/user/hutao/mp4/text1.mp4
const typeOptions = [
  {
    value: '1',
    label: '自动冲洗',
  },
  {
    value: '2',
    label: '人工冲洗',
  },
];
const sidebarOpened = computed(() => appStore.sidebar.opened);
const btnShow = computed(() => {
  const route = useRoute();
  return route.path === '/task' ? true : false;
});
function toggleSideBar() {
  appStore.toggleSideBar();
}
const openSearchForm = () => {
  dialogVisible.value = true;
};

const taskForm = reactive({
  name: '',
  camera: 'rtsp://admin:a1234567@192.169.7.123:554',
  host: '192.169.5.45',
  type: '',
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  camera: [{ required: true, message: '不能为空', trigger: 'blur' }],
  host: [{ required: true, message: '不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '必选', trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      taskStore.newTask(taskForm);
      console.log('submit!', taskForm);
      dialogVisible.value = false;
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: $menuBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .navbar-left {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .hamburger-container {
      line-height: 60px;
      height: 100%;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .breadcrumb-container {
      line-height: 60px;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .navbar-right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .search-area {
      padding: 0 20px 0 0;
      .search-filter {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
