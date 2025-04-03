import useDarkMode from '@/stores/darkmode';
import { CircleUserRound, NotebookText, Utensils, History as HistoryIcon } from 'lucide-react';
import { NavLink } from 'react-router';
import logo_icon_white from '@/assets/logo_icon_white.png';
import logo_icon_black from '@/assets/logo_icon_black.png';
import logo_icon from '@/assets/logo_icon.png';

export default function MobileNav() {
  const { isDarkMode } = useDarkMode();

  return (
    <header className="fixed bottom-0 left-0 z-10 flex h-[80px] w-full items-center justify-center bg-[var(--bg-light-point)] text-sm font-extralight sm:hidden dark:bg-[var(--bg-dark-point)]">
      <NavLink
        to="/"
        className="flex h-full w-1/5 flex-col items-center justify-center gap-2"
        draggable={false}
      >
        {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/recipe');
          console.log(isActive);
          return (
            <>
              {isActive ? (
                <img src={logo_icon} alt="" />
              ) : isDarkMode ? (
                <img src={logo_icon_white} alt="" />
              ) : (
                <img src={logo_icon_black} alt="" />
              )}
              <span>레시피</span>
            </>
          );
        }}
      </NavLink>

      <NavLink
        to="/menu"
        className="flex h-full w-1/5 flex-col items-center justify-center gap-2"
        draggable={false}
      >
        {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/menu');
          return (
            <>
              <Utensils
                className={`${isActive ? 'active text-[var(--point-orange)]' : ''} size-5`}
              />
              <span>메뉴</span>
            </>
          );
        }}
      </NavLink>

      <NavLink
        to="/diet"
        className="flex h-full w-1/5 flex-col items-center justify-center gap-2"
        draggable={false}
      >
        {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/diet');
          return (
            <>
              <NotebookText
                className={`${isActive ? 'active text-[var(--point-orange)]' : ''} size-5`}
              />
              <span>식단</span>
            </>
          );
        }}
      </NavLink>

      <NavLink
        to="/history/all/page?p=1"
        className="flex h-full w-1/5 flex-col items-center justify-center gap-2"
        draggable={false}
      >
        {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/history');
          return (
            <>
              <HistoryIcon
                className={`${isActive ? 'active text-[var(--point-orange)]' : ''} size-5`}
              />
              <span>추천 기록</span>
            </>
          );
        }}
      </NavLink>

      <NavLink
        to="/m-my-page"
        className="flex h-full w-1/5 flex-col items-center justify-center gap-2"
        draggable={false}
      >
        {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/m-my-page');
          return (
            <>
              <CircleUserRound
                className={`${isActive ? 'active text-[var(--point-orange)]' : ''} size-5`}
              />
              <span>마이페이지</span>
            </>
          );
        }}
      </NavLink>
    </header>
  );
}
