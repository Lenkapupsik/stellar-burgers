import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@services';

import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

import { fetchOrders, selectOrders, selectOrderLoading } from '@services';
import { selectIsAuth } from '@services';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrderLoading);

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuth]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
