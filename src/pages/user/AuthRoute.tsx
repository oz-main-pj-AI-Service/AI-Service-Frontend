import { useAuthStore } from '@/stores/authStore';
import { Navigate } from 'react-router';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAuthStore((state) => state.accessToken); // 전역 상태에서 accessToken 가져오기

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  // 토큰이 없으면 해당 페이지 렌더링
  return <>{children}</>;
};

export default AuthRoute;
