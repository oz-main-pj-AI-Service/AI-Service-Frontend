import { Link } from 'react-router';
import { Button } from '../ui/button';
import { useUserTokenTemp } from '@/hooks/useUserTokenTemp';
import { loginApiTemp } from '@/api/loginApiTemp';
import { handleLogout } from '@/pages/user/handleLogout';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import useDarkMode from '@/stores/darkmode';

export default function TopNav() {
  const accessToken = localStorage.getItem('accessToken');

  // 임시 다크모드
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // 임시 로그인
  const { refetch: refetchUserToken } = useUserTokenTemp('user');
  const { refetch: refetchAdminToken } = useUserTokenTemp('admin');

  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 bg-[var(--bg-light)] px-8 py-4 dark:bg-[var(--bg-dark)]">
      {/* 임시 다크모드 */}
      <div className="flex items-center gap-2">
        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={() => toggleDarkMode()} />
        <Label htmlFor="dark-mode">다크 모드 {isDarkMode ? '🌙' : '☀️'}</Label>
      </div>

      {/* 임시 로그인 */}
      {loginApiTemp.getAccessTokenTemp() ? (
        <Button
          onClick={() => {
            loginApiTemp.logOut();
          }}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              console.log('관리자 로그인');
              refetchAdminToken();
            }}
          >
            관리자 로그인
          </Button>
          <Button
            onClick={() => {
              console.log('유저 로그인');
              refetchUserToken();
            }}
          >
            임시 로그인
          </Button>
        </>
      )}

      {accessToken ? (
        <>
          <Link to="/profile">회원정보</Link>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/sign-in">로그인</Link>
          <Link to="/sign-up">회원가입</Link>
        </>
      )}
    </div>
  );
}
