import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '@services';

import { loginUserApi } from '@api';
import { fetchUser } from '@services';

import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError('');

    try {
      const res = await loginUserApi({ email, password });

      localStorage.setItem('refreshToken', res.refreshToken);
      document.cookie = `accessToken=${res.accessToken}`;

      await dispatch(fetchUser());

      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Неверный email или пароль');
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
