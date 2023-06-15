import request from '@/utils/request';
import type { MessagePlateType } from './types';
export const delTableListApi = (
  ids: string[] | number[]
): Promise<IResponse> => {
  return request.post({ url: '/person/', data: { ids } });
};

export const getAllMessage = (): any => {
  return request.get({ url: '/api/GH/all' });
};

export const getMessageById = (id: number | string): any => {
  return request.get({ url: '/api/GH/wash' + id });
};

export const getMessageByPlate = (data: MessagePlateType): any => {
  return request.post({ url: '/api/GH/Search', data });
};

export const deleteMessage = (id: number | string): any => {
  return request.delete({ url: '/api/GH/delete/' + id });
};
