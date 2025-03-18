import { Routes, Route } from 'react-router';
import Layout from './components/main/Layout';
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
import Report from './pages/report/Report';
import ReportDetail from './pages/report/ReportDetail';
import ReportPost from './pages/report/ReportPost';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인 */}
          <Route index element={<Recipe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/diet" element={<Diet />} />

          {/* 검색 기록 */}
          <Route path="/history" element={<HistoryLayout />}>
            <Route path="/history/:category" element={<HistoryCategory />} />
            <Route path="/history/search?" element={<HistorySearch />} />
          </Route>

          {/* 문의하기 */}
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/report/post" element={<ReportPost />} />

          {/* 로그인 */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-in/find-id" element={<FindId />} />
          <Route path="/sign-in/find-pw" element={<FindPw />} />

          {/* 회원가입 */}
          <Route path="/sign-up" element={<SignUp />} />

          {/* 프로필 */}
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 관리자 */}
        {/* 관리자용 레이아웃 필요 */}
        <Route path="/admin" element={<Admin />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
