import { FC } from 'react';
import { useSelector } from '@services';
import { selectIsLoading } from '@services';

import { Preloader } from '@ui';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(selectIsLoading);

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  return <ConstructorPageUI />;
};
