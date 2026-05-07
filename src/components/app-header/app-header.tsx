import { FC } from 'react';
import { useSelector } from '@services';
import { AppHeaderUI } from '@ui';
import { selectUser } from '@services';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
