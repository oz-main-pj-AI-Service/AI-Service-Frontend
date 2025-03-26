import { UserToken } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { loginApiTemp } from '@/api/loginApiTemp';
import { AxiosError } from 'axios';

export const useUserTokenTemp = (type: 'admin' | 'user') => {
  const { data: userToken, refetch } = useQuery<UserToken, AxiosError>({
    queryKey: ['userTokenTemp'],
    queryFn: () => loginApiTemp.logIn(type),
    enabled: false,
  });

  // 로컬 스토리지 밸류로 '' 빈 스트링 저장하는거에 에러가 발생할 가능성이 있는듯 함.
  // 정확한 원인은 모르겠고, 리액트 라우터 어쩌고 뜨는데 리렌더링 가능성 때문이 어쩌고저쩌고-
  if (userToken) {
    localStorage.setItem('access_temp', userToken.access_token);
    localStorage.setItem('refresh_temp', userToken.refresh_token);
    // console.log(userToken);
  }

  return { userToken, refetch };
};
