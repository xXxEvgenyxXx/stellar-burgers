import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const auth = useAuth();
  const location = useLocation();

  // Если состояние авторизации еще не проверено, показываем загрузку
  if (!auth.isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && auth.user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
