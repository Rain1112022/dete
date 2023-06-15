import { defineStore } from "pinia";
import { createTask } from "@/api/task";
import { ElMessage } from "element-plus";

export const useTaskStore = defineStore("task", {
  state: () => ({
    handleFlag: false,
  }),

  getters: {
    getHandleFlag: (state) => {
      console.log("useTaskStore getHandleFlag", state.handleFlag);
      return state.handleFlag;
    },
  },

  actions: {
    handleTask(state) {
      this.handleFlag = state;
    },
    newTask(data) {
      return createTask(data)
        .then((res) => {
          if (res.result == "1") {
            ElMessage({
              type: "success",
              message: "创建成功",
            });
          } else if (res.result == "2") {
            ElMessage({
              type: "error",
              message: "创建失败",
            });
          }
          this.handleFlag = true;
          // console.log("createTask", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
