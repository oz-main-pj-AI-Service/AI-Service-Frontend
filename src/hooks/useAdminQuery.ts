import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api/adminApi';
import { ReportAnswerFormInput } from '@/types/report';
import { User } from '@/types/user';
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

export const useAdminUserEditQuery = (id: string) => {
  return useMutation({
    mutationFn: (data: User) => adminApi.updateUserPatch(id, data),
  });
};

export const useAdminUserDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
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

// export const useAdminReportDeleteQuery = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => adminApi.deleteReport(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['adminReports'] });
//     },
//   });
// };
