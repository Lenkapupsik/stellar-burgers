import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '@services';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { fetchFeed, fetchOrders, fetchIngredients } from '@services';
import { selectOrderByNumber } from '@services';
import { selectIngredients } from '@services';

import { TIngredient } from '@utils-types';
import { selectIsAuth } from '@services';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const orderNumber = Number(number);

  const ingredients = useSelector(selectIngredients);

  const orderData = useSelector((state) =>
    selectOrderByNumber(state, orderNumber)
  );

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchFeed());

      if (isAuth) {
        dispatch(fetchOrders());
      }
    }

    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, orderData, ingredients.length, isAuth]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, id) => {
        const ingredient = ingredients.find((ing) => ing._id === id);

        if (!ingredient) return acc;

        if (!acc[id]) {
          acc[id] = { ...ingredient, count: 1 };
        } else {
          acc[id].count += 1;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
