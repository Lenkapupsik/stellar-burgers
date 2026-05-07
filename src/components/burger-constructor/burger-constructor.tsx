import { FC, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { TConstructorItems } from '@utils-types';

import { BurgerConstructorUI } from '@ui';
import { Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

import { useSelector, useDispatch } from '@services';

import {
  selectConstructorBun,
  selectConstructorItems,
  clearConstructor,
  selectIsAuth
} from '@services';

import { selectOrderRequest, selectOrderData } from '@services';
import { createOrder, clearOrder } from '@services/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorItems);

  const isAuth = useSelector(selectIsAuth);

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);

  const constructorItems: TConstructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = useCallback(() => {
    if (!isAuth) {
      navigate('/login', {
        state: { from: location }
      });
      return;
    }

    if (!bun || orderRequest) return;

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  }, [isAuth, navigate, location, bun, ingredients, orderRequest, dispatch]);

  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(clearConstructor());
    }
  }, [orderModalData, orderRequest, dispatch]);

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    if (!bun) return 0;

    return (
      bun.price * 2 + ingredients.reduce((sum, item) => sum + item.price, 0)
    );
  }, [bun, ingredients]);

  return (
    <>
      <BurgerConstructorUI
        price={price}
        constructorItems={constructorItems}
        onOrderClick={onOrderClick}
      />

      {orderRequest && (
        <Modal
          data-testid='modal'
          titleClassName='text text_type_main-large'
          onClose={() => {}}
          title='Оформляем заказ...'
        >
          <Preloader />
        </Modal>
      )}

      {orderModalData && !orderRequest && (
        <Modal
          data-testid='modal'
          titleClassName='text text_type_main-large'
          onClose={closeOrderModal}
          title=''
        >
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </>
  );
};
