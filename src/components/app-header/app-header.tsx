/* prettier-ignore */
/* eslint-disable */
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  
  const handleConstructorClick = () => {
    navigate('/');
  };
  
  const handleFeedClick = () => {
    navigate('/feed');
  };
  
  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <AppHeaderUI 
      userName={user?.name || ''} 
      onConstructorClick={handleConstructorClick}
      onFeedClick={handleFeedClick}
      onProfileClick={handleProfileClick}
    />
  );
};
