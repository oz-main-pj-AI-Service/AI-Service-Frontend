import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/adminApi';

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
