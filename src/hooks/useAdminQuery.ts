import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api/adminApi';
import { ReportAnswerFormInput } from '@/types/report';
// import { AxiosError } from 'axios';

// SuspenseQuery로 바꾸기 <> 채우기
export const useAdminUsersQuery = (page: string) => {
  return useQuery({
    queryKey: ['adminUsers', page],
    queryFn: () => adminApi.getUsers(page),
  });
};

export const useAdminUserDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['adminUserDetail', id],
    queryFn: () => adminApi.getUserDetail(id),
  });
};

export const useAdminReportCommentQuery = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReportAnswerFormInput) => adminApi.patchReportComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminReportDetail', id] });
    },
  });
};
