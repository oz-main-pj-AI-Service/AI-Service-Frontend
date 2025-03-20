import { UserToken } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { loginApiTemp } from '@/api/loginApiTemp';
import { AxiosError } from 'axios';

export const useUserTokenTemp = () => {
  return useQuery<UserToken, AxiosError>({
    queryKey: ['userToken'],
    queryFn: loginApiTemp.logIn,
  });
};
