import { UserToken } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { loginApiTemp } from '@/api/loginApiTemp';
import { AxiosError } from 'axios';

export const useUserTokenTemp = () => {
  const { data: userToken, refetch } = useQuery<UserToken, AxiosError>({
    queryKey: ['userTokenTemp'],
    queryFn: loginApiTemp.logIn,
    enabled: false,
  });
  localStorage.setItem('access_temp', JSON.stringify(userToken?.access_token));
  localStorage.setItem('refresh_temp', JSON.stringify(userToken?.refresh_token));
  return { userToken, refetch };
};
