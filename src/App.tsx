import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import useDarkMode from './stores/darkmode';
import NotFound from './pages/NotFound';
import Layout from './components/main/Layout';
import Recipe from './pages/main/Recipe';
import RecipeResult from './pages/main/RecipeResult';
import Menu from './pages/main/Menu';
import Diet from './pages/main/Diet';
import HistoryLayout from './components/main/HistoryLayout';
import History from './pages/main/History';
import HistoryDetail from './pages/main/HistoryDetail';
import SignIn from './pages/user/SignIn';
import Profile from './pages/user/Profile';
import SignUp from './pages/user/signUp';
import SignUpHandler from './pages/user/SignUpHandler';
import EmailVerification from './pages/user/EmailVerification';
import FindId from './pages/user/FindId';
import FindPw from './pages/user/FindPw';
import Report from './pages/report/Report';
import ReportDetail from './pages/report/ReportDetail';
import ReportPost from './pages/report/ReportPost';
import ReportEdit from './pages/report/ReportEdit';
import AdminLayout from './components/admin/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminAi from './pages/admin/AdminAi';
import AdminUserDetail from './pages/admin/AdminUserDetail';
import AdminReportDetail from './pages/admin/AdminReportDetail';
import AdminAiDetail from './pages/admin/AdminAiDetail';
import AdminUsersEdit from './pages/admin/AdminUsersEdit';
import AdminReportComment from './pages/admin/AdminReportComment';
import EditPw from './pages/user/EditPw';
import AuthRoute from './pages/user/AuthRoute';
import MobileMyPage from './pages/main/MobileMyPage';

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

          {/* 추천 기록 */}
          <Route path="history">
            <Route element={<HistoryLayout />}>
              <Route path=":category/page?" element={<History />} />
            </Route>
            <Route path="detail/:id" element={<HistoryDetail />} />
          </Route>

          {/* 문의하기 */}
          <Route path="report">
            <Route path="page?" element={<Report />} />
            <Route path=":id" element={<ReportDetail />} />
            <Route path="post" element={<ReportPost />} />
            <Route path="edit/:id" element={<ReportEdit />} />
          </Route>

          {/* 모바일 마이페이지 */}
          <Route path="m-my-page" element={<MobileMyPage />} />

          {/* 소셜로그인 */}
          <Route path="naver/callback" element={<SignUpHandler />} />
          <Route path="google/callback" element={<SignUpHandler />} />

          {/* 이메일 인증 */}
          <Route path="verify-email/" element={<EmailVerification />} />

          {/* 로그인 */}
          <Route path="sign-in">
            <Route
              index
              element={
                <AuthRoute>
                  <SignIn />
                </AuthRoute>
              }
            />
            <Route path="find-id" element={<FindId />} />
            <Route path="find-pw" element={<FindPw />} />
            <Route path="edit-pw" element={<EditPw />} />
          </Route>

          {/* 회원가입 */}
          <Route
            path="sign-up"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />

          {/* 프로필 */}
          <Route path="profile" element={<Profile />} />

          {/* 관리자 */}
          {/* 유저는 수정 페이지 수정 필요, 유저 로그? */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="users">
              <Route path="page?" element={<AdminUsers />} />
              <Route path=":id" element={<AdminUserDetail />} />
              <Route path="edit/:id" element={<AdminUsersEdit />} />
            </Route>

            <Route path="reports">
              <Route path="page?" element={<AdminReports />} />
              <Route path="detail/:id" element={<AdminReportDetail />} />
              <Route path="comment/:id" element={<AdminReportComment />} />
            </Route>

            <Route path="ai">
              <Route path=":category/page?" element={<AdminAi />} />
              <Route path="detail/:id" element={<AdminAiDetail />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
