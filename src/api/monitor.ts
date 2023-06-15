import request from '@/utils/request';
import type {
  MonitorStateType,
  MonitorCountType,
  MonitorOutType,
} from './types';

export const getCpuState = (): any => {
  return request.get({ url: '/api/GH/cpu' });
};
export const getRealVideo = (): any => {
  return request.get({ url: '/api/GH/Main/real' });
};

export const getDayAllInfo = (data: MonitorOutType): any => {
  return request.post({ url: '/api/GH/Main/info', data });
};

export const getDayStateInfo = (data: MonitorStateType): any => {
  return request.post({ url: '/api/GH/Main/info', data });
};

export const getCountInfo = (data: MonitorCountType): any => {
  return request.post({ url: '/api/GH/Main/counts?', data });
};

export const getOutInfo = (data: MonitorOutType): any => {
  return request.post({ url: '/api/GH/Main/outcar', data });
};
