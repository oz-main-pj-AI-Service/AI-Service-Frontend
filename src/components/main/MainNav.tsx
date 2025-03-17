import { Link, NavLink } from 'react-router';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import useDarkMode from '@/states/darkmode';

export default function NavBar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 flex h-full w-[200px] flex-col items-center justify-between bg-zinc-300 dark:bg-zinc-900">
      <h1>
        <Link to="/">한상비서</Link>
      </h1>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500' : 'text-black')}>
            레시피
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/menu"
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'black',
            })}
          >
            메뉴
          </NavLink>
        </li>
        <li>
          <NavLink to="/diet">
            {({ isActive }) => <span className={isActive ? 'active' : ''}>{isActive ? '👉' : ''} 식단</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">검색 기록</NavLink>
        </li>
      </ul>

      <div>
        <Switch id="dark-mode" onClick={() => toggleDarkMode()} />
        <Label htmlFor="dark-mode">다크 모드 {isDarkMode ? '🌙' : '☀️'}</Label>
      </div>

      <div>
        <Link to="/admin">관리자 페이지</Link>
      </div>

      <div>
        <Link to="/report">문의하기</Link>
      </div>
    </nav>
  );
}

// React Router에서 NavLink 스타일링 하는거 차례대로 3가지
// 3번째 {children}을 사용하는 방법으로
// 따로 컴포넌트화 하기
