// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/app/store';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if logged in
  return <Outlet />;
};

export default ProtectedRoute;
