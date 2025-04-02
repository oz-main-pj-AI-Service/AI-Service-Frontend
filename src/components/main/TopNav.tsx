import { Link } from 'react-router';
import { handleLogout } from '@/pages/user/handleLogout';
import { useAuthStore } from '@/stores/authStore';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import useDarkMode from '@/stores/darkmode';
import { Button } from '../ui/button';

export default function TopNav() {
  const { accessToken } = useAuthStore();
  // console.log(accessToken);

  // 임시 다크모드
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="fixed top-0 z-1 flex w-full items-center justify-end gap-4 bg-[var(--bg-light)] px-8 py-4 dark:bg-[var(--bg-dark)]">
      {/* 임시 다크모드 */}
      <div className="flex items-center gap-2">
        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={() => toggleDarkMode()} />
        <Label htmlFor="dark-mode">다크 모드 {isDarkMode ? '🌙' : '☀️'}</Label>
      </div>

      {accessToken ? (
        <>
          <Link to="/profile">회원정보</Link>
          <Button onClick={handleLogout}>로그아웃</Button>
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
