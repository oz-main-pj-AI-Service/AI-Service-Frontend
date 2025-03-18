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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Recipe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/history" element={<History />} />
          <Route path="/report" element={<Report />} />
        </Route>
        <Route path="/sign-in" element={<Layout />}>
          <Route index element={<SignIn />} />
          <Route path="/sign-in/find-id" element={<FindId />} />
          <Route path="/sign-in/find-pw" element={<FindPw />} />
        </Route>
        <Route path="/sign-up" element={<Layout />}>
          <Route index element={<SignUp />} />
        </Route>
        <Route path="/profile" element={<Layout />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
