<template>
  <div class="avatar-field">
    <el-dropdown class="dropdown" trigger="click">
      <span class="el-dropdown-link">
        {{ userStore.name }}
      </span>
      <template #dropdown>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const handleLogout = () => {
  userStore.logout();
};
</script>

<style scoped lang="scss">
.avatar-field {
  height: 100%;
  line-height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .dropdown {
    .el-dropdown-link {
      background-color: $active-blue;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      line-height: 40px;
      cursor: pointer;
      color: $subMenuActiveText;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
}
</style>
