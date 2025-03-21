import { Routes, Route } from 'react-router';
import Layout from './components/main/Layout';
import SignIn from './pages/user/SignIn';
import FindId from './pages/user/FindId';
import FindPw from './pages/user/FindPw';
import Profile from './pages/user/Profile';
import Admin from './pages/admin/Admin';
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
import AdminLayout from './components/main/AdminLayout';
import AdminAi from './pages/admin/AdminAi';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import SignUpHandler from './pages/user/SignUpHandler';
import SignUp from './pages/user/signUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인 */}
          <Route index element={<Recipe />} />
          <Route path="menu" element={<Menu />} />
          <Route path="diet" element={<Diet />} />

          {/* 소셜로그인 */}
          <Route path="naver/callback" element={<SignUpHandler />} />
          <Route path="google/callback" element={<SignUpHandler />} />

          {/* 검색 기록 */}
          <Route path="history" element={<HistoryLayout />}>
            <Route path=":category" element={<HistoryCategory />} />
            <Route path="search?" element={<HistorySearch />} />
          </Route>

          {/* 문의하기 */}
          <Route path="report">
            <Route index element={<Report />} />
            <Route path=":id" element={<ReportDetail />} />
            <Route path="post" element={<ReportPost />} />
          </Route>

          {/* 로그인 */}
          <Route path="sign-in">
            <Route index element={<SignIn />} />
            <Route path="find-id" element={<FindId />} />
            <Route path="find-pw" element={<FindPw />} />
          </Route>

          {/* 회원가입 */}
          <Route path="sign-up" element={<SignUp />} />

          {/* 프로필 */}
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 관리자 */}
        {/* 어드민 메인을 따로 만들지 걍 유저관리 페이지로 할지 */}
        {/* 어드민 메인이 잇으면 하위 경로 선택해도 어드민 메인은 선택되어 있다고 네브바에 뜸 */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="ai" element={<AdminAi />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
