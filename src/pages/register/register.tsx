import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUserApi } from '@api';
import { fetchUser, useDispatch } from '@services';

import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError('');

    try {
      const res = await registerUserApi({
        name: userName,
        email,
        password
      });

      localStorage.setItem('refreshToken', res.refreshToken);
      document.cookie = `accessToken=${res.accessToken}`;

      await dispatch(fetchUser());

      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Ошибка регистрации');
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
