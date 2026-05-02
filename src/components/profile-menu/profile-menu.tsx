import { FC } from 'react';
import { useDispatch } from '@services';
import { logoutUser } from '@services/user/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      navigate('/login', { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
