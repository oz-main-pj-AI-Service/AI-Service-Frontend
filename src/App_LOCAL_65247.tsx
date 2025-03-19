import { Routes, Route } from 'react-router';
import Layout from './components/main/Layout';
import Menu from './pages/Menu';
import Recipe from './pages/Recipe';
import Diet from './pages/Diet';
import History from './pages/History';
import Report from './pages/Report';
import SignIn from './pages/SignIn';
import SignUp from './pages/signUp';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import EditPw from './pages/EditPw';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인 페이지 */}
          <Route index element={<Recipe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/history" element={<History />} />
          <Route path="/report" element={<Report />} />

          {/* 로그인 페이지 */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-in/find-id" element={<FindId />} />
          <Route path="/sign-in/find-pw" element={<FindPw />} />
          <Route path="/sign-in/find-pw/edit-pw" element={<EditPw />} />

          {/* 회원가입 페이지 */}
          <Route path="/sign-up" element={<SignUp />} />

          {/* 프로필 페이지 */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/profile-edit" element={<ProfileEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
