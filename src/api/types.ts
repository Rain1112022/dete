export type UserLoginType = {
  username: string;
  password: string;
};

export type UserType = {
  username: string;
  password: string;
  role: string;
  roleId: string;
  permissions: string | string[];
};
//表格类型
export type MessageItemType = {
  id: string;
  car_plate: string;
  car_type: string;
  state: string;
  car_img: string;
  time: string;
};

export type MessagePlateType = {
  plate: string;
};

export type TaskCreateType = {
  name: string;
  camera: string;
  host: string;
  type: number | string;
};

export type TaskStateType = {
  id: number | string;
};

export type TaskAreaType = {
  id: number | string;
  // point: Array<number>[] | [];
  point: string;
};

export type MonitorStateType = {
  date: number | string;
  state: number | string;
};

export type MonitorCountType = {
  date: number | string;
};

export type MonitorOutType = {
  date: number | string;
};
