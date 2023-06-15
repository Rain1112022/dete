import request from "@/utils/request";
import type { TaskCreateType, TaskAreaType, TaskStateType } from "./types";
//查看所有任务
export const getAllTask = (): any => {
  return request.get({ url: "/api/GH/alltesk" });
};

export const createTask = (data: TaskCreateType): any => {
  return request.post({ url: "/api/GH/create", data });
};

export const startTask = (data: TaskStateType): any => {
  return request.post({ url: "/api/GH/start", data });
};

export const stopTask = (data: TaskStateType): any => {
  return request.post({ url: "/api/GH/stop", data });
};

export const delTask = (data: number | string): any => {
  return request.delete({ url: "/api/GH/del_tesk/" + data });
};

export const setTaskArea = (data: TaskAreaType): any => {
  return request.post({ url: "/api/GH/point", data });
};
