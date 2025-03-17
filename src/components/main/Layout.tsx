import { Outlet } from 'react-router';
import MainNav from './MainNav';
import TopNav from './TopNav';

export default function Layout() {
  return (
    <>
      <MainNav />
      <TopNav />
      <Outlet />
    </>
  );
}
