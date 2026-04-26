import { FC, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { TConstructorIngredient, TConstructorItems } from '@utils-types';

import { BurgerConstructorUI } from '@ui';
import { Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

import { useSelector, useDispatch } from '@services';

import {
  selectConstructorBun,
  selectConstructorItems,
  clearConstructor,
  selectIsAuth // 👈 добавь селектор
} from '@services';

import { selectOrderRequest, selectOrderData } from '@services';
import { createOrder, clearOrder } from '@services/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorItems);

  const isAuth = useSelector(selectIsAuth); // 👈

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);

  const constructorItems: TConstructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
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
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
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
          titleClassName='text text_type_main-large'
          onClose={closeOrderModal}
          title='Оформляем заказ...'
        >
          <Preloader />
        </Modal>
      )}

      {orderModalData && !orderRequest && (
        <Modal
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
