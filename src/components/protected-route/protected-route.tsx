import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@services';
import { selectIsAuth, selectIsAuthChecked } from '@services';
import { Preloader } from '@ui';
import { TProtectedRouteProps } from './type';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();

  const isAuth = useSelector(selectIsAuth);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const from = location.state?.from?.pathname || '/';

  if (onlyUnAuth && isAuth) {
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
