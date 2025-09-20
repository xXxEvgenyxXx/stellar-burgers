/* prettier-ignore */
/* eslint-disable */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser,selectIsAuthChecked } from '../../services/slices/userSlice';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  // Если состояние авторизации еще не проверено, показываем загрузку
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
