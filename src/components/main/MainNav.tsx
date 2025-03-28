import { Link, NavLink } from 'react-router';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import useDarkMode from '@/stores/darkmode';
import 한상로고 from '@/assets/한상로고.png';

export default function MainNav() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 z-10 flex h-full w-[200px] flex-col items-center justify-between bg-zinc-300 dark:bg-zinc-900">
      <h1>
        <Link to="/">
          <img src={한상로고} alt="" />
        </Link>
      </h1>
      <ul>
        <NavLink to="/">
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/recipe');
            return <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 레시피</li>;
          }}
        </NavLink>
        <NavLink to="/menu">
          {({ isActive }) => (
            <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 메뉴</li>
          )}
        </NavLink>
        <NavLink to="/diet">
          {({ isActive }) => (
            <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 식단</li>
          )}
        </NavLink>
        <NavLink to="/history/all/page?p=1">
          {({ isActive }) => {
            isActive = isActive || location.pathname.startsWith('/history');
            return <li className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 추천 기록</li>;
          }}
        </NavLink>
      </ul>

      <div>
        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={() => toggleDarkMode()} />
        <Label htmlFor="dark-mode">다크 모드 {isDarkMode ? '🌙' : '☀️'}</Label>
      </div>

      {/* 관리자 페이지와 문의하기 중에서 조건부 렌더링 (isAdmin) */}
      <div>
        <Link to="/admin">관리자 페이지</Link>
      </div>

      <div>
        <Link to="/report/post">문의하기</Link>
      </div>
    </nav>
  );
}

// React Router에서 NavLink 스타일링 하는거 차례대로 3가지
// 3번째 {children}을 사용하는 방법으로
// 따로 컴포넌트화 하기
