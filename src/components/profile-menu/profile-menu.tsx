import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error('Ошибка при выходе:', err);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
