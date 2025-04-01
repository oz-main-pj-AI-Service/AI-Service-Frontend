import { PAGE_SIZE } from '@/constants/common';
import api from './TokenApi';
import { User, UserResponse } from '@/types/user';
import { ReportAnswerFormInput } from '@/types/report';

export const adminApi = {
  getUsers: async (page: string) => {
    const response = await api.get<UserResponse>('/user/admin/', {
      params: {
        page: parseInt(page),
        page_size: PAGE_SIZE,
      },
    });
    return response.data;
  },

  getUserDetail: async (id: string) => {
    const response = await api.get<User>(`/user/admin/${id}`);
    return response.data;
  },

  updateUserPut: async (id: string, data: User) => {
    const response = await api.put<User>(`/user/admin/${id}`, data);
    return response.data;
  },

  updateUserPatch: async (id: string, data: User) => {
    const response = await api.patch<User>(`/user/admin/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/user/admin/${id}`);
    return response.data;
  },

  patchReportComment: async (id: string, data: ReportAnswerFormInput) => {
    const response = await api.patch<ReportAnswerFormInput>(`/reports/${id}/admin/`, data, {
      params: { id: id },
    });
    return response.data;
  },
};
