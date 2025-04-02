import { Link, NavLink, Outlet } from 'react-router';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import useDarkMode from '@/stores/darkmode';
import TopNav from '../main/TopNav';
import logo from '@/assets/logo.png';
import logo_black from '@/assets/logo_black.png';

export default function AdminLayout() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <nav className="fixed top-0 left-0 z-10 flex h-full w-[200px] flex-col items-center justify-between bg-[#bfbfbf] py-6 dark:bg-zinc-800">
        {isDarkMode ? (
          <h1>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </h1>
        ) : (
          <h1>
            <Link to="/">
              <img src={logo_black} alt="" />
            </Link>
          </h1>
        )}
        <div className="flex flex-col gap-4">
          <NavLink to="/admin/users/page?p=1" draggable={false}>
            {({ isActive }) => {
              isActive = isActive || location.pathname.startsWith('/admin/users');
              return (
                <div
                  className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'} w-36 rounded-sm py-2 pl-4`}
                >
                  회원 관리
                </div>
              );
            }}
          </NavLink>
          <NavLink to="/admin/reports/page?p=1" draggable={false}>
            {({ isActive }) => {
              isActive = isActive || location.pathname.startsWith('/admin/reports');
              return (
                <div
                  className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'} w-36 rounded-sm py-2 pl-4`}
                >
                  문의 사항
                </div>
              );
            }}
          </NavLink>
          <NavLink to="/admin/ai/all/page?p=1" draggable={false}>
            {({ isActive }) => {
              isActive = isActive || location.pathname.startsWith('/admin/ai');
              return (
                <div
                  className={`${isActive ? 'active bg-[var(--point-orange)]' : 'hover:bg-zinc-300 dark:hover:bg-zinc-700'} w-36 rounded-sm py-2 pl-4`}
                >
                  ai 로그
                </div>
              );
            }}
          </NavLink>
        </div>

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
