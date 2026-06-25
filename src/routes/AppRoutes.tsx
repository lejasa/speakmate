import { Navigate, Route, Routes } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import PracticeSetup from '../pages/PracticeSetup';
import PracticeSession from '../pages/PracticeSession';
import Result from '../pages/Result';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="setup" element={<PracticeSetup />} />
      <Route path="session" element={<PracticeSession />} />
      <Route path="result" element={<Result />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
