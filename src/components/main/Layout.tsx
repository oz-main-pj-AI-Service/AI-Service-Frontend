import { Outlet } from 'react-router';
import MainNav from './MainNav';
import TopNav from './TopNav';
import MobileNav from './MobileNav';

export default function Layout() {
  return (
    <>
      <MainNav />
      <TopNav />

      <MobileNav />

      <Outlet />
    </>
  );
}
