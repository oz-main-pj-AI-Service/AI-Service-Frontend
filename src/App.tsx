import { Routes, Route } from 'react-router';
import Layout from './components/main/Layout';
import Report from './pages/Report';
import SignIn from './pages/SignIn';
import SignUp from './pages/signUp';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Recipe from './pages/main/Recipe';
import Menu from './pages/main/Menu';
import Diet from './pages/main/Diet';
import HistoryCategory from './pages/main/HistoryCategory';
import HistorySearch from './pages/main/HistorySearch';
import HistoryLayout from './components/main/HistoryLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인 페이지 */}
          <Route index element={<Recipe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/history" element={<HistoryLayout />}>
            <Route path="/history/:category" element={<HistoryCategory />} />
            <Route path="/history/search?" element={<HistorySearch />} />
          </Route>
          <Route path="/report" element={<Report />} />

          {/* 로그인 페이지 */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-in/find-id" element={<FindId />} />
          <Route path="/sign-in/find-pw" element={<FindPw />} />

          {/* 회원가입 페이지 */}
          <Route path="/sign-up" element={<SignUp />} />

          {/* 프로필 페이지 */}
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 관리자 페이지 */}
        {/* 관리자용 레이아웃 필요 */}
        <Route path="/admin" element={<Admin />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
