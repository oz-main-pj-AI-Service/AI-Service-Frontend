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
import RecipeResult from './pages/main/RecipeResult';
import SignUp from './pages/user/signUp';
import SignUpHandler from './pages/user/SignUpHandler';
import ReportEdit from './pages/report/ReportEdit';
import AdminUserDetail from './pages/admin/AdminUserDetail';
import AdminReportDetail from './pages/admin/AdminReportDetail';
import AdminAiDetail from './pages/admin/AdminAiDetail';
import AdminUsersEdit from './pages/admin/AdminUsersEdit';
import EmailVerification from './pages/user/EmailVerification';
import { useEffect } from 'react';
import useDarkMode from './stores/darkmode';

export default function App() {
  const { initializeDarkMode } = useDarkMode();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인 */}
          <Route index element={<Recipe />} />
          <Route path="recipe/search?" element={<RecipeResult />} />
          <Route path="menu" element={<Menu />} />
          <Route path="diet" element={<Diet />} />

          {/* 검색 기록 */}
          <Route path="history" element={<HistoryLayout />}>
            <Route path=":category" element={<HistoryCategory />} />
            <Route path="search?" element={<HistorySearch />} />
          </Route>

          {/* 문의하기 */}
          <Route path="report">
            <Route path="page?" element={<Report />} />
            <Route path=":id" element={<ReportDetail />} />
            <Route path="post" element={<ReportPost />} />
            <Route path="edit/:id" element={<ReportEdit />} />
          </Route>

          {/* 소셜로그인 */}
          <Route path="naver/callback" element={<SignUpHandler />} />
          <Route path="google/callback" element={<SignUpHandler />} />

          {/* 이메일 인증 */}
          <Route path="verify-email/" element={<EmailVerification />} />

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
        {/* 그냥 어드민 메인이 없고 바로 네브바에서 /admin/users로 보내주는 것도 방법 */}
        {/* 네스티드 라우팅 정리하기 */}
        {/* 유저는 수정 페이지, 문의는 답변 페이지 필요. ai 로그는 이게 끝 */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
          <Route path="users/edit/:id" element={<AdminUsersEdit />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="reports/:id" element={<AdminReportDetail />} />
          <Route path="ai" element={<AdminAi />} />
          <Route path="ai/:id" element={<AdminAiDetail />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
