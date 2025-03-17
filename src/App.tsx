import { Routes, Route } from 'react-router';
import Layout from './components/main/Layout';
import Menu from './pages/Menu';
import Recipe from './pages/Recipe';
import Diet from './pages/Diet';
import History from './pages/History';
import Report from './pages/Report';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Recipe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/history" element={<History />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
