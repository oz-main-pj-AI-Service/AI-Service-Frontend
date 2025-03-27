import { Link, NavLink, Outlet } from 'react-router';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import useDarkMode from '@/stores/darkmode';
import TopNav from './TopNav';

export default function AdminLayout() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <nav className="fixed top-0 left-0 z-10 flex h-full w-[200px] flex-col items-center justify-between bg-zinc-400 dark:bg-zinc-800">
        <h1>
          <Link to="/">한상비서</Link>
        </h1>
        <ul>
          <NavLink to="/admin/users">
            {({ isActive }) => (
              <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 회원 관리</li>
            )}
          </NavLink>
          <NavLink to="/admin/reports">
            {({ isActive }) => (
              <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 문의 사항</li>
            )}
          </NavLink>
          <NavLink to="/admin/ai">
            {({ isActive }) => (
              <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} ai 로그</li>
            )}
          </NavLink>
        </ul>

        {/* 나중에 제거 */}
        <div>
          <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={() => toggleDarkMode()} />
          <Label htmlFor="dark-mode">다크 모드 {isDarkMode ? '🌙' : '☀️'}</Label>
        </div>
      </nav>

      <TopNav />

      <Outlet />
    </>
  );
}
