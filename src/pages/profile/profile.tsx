import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '@services';
import { selectUser } from '@services';
import { updateUser } from '@services/user/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [initialValue, setInitialValue] = useState({
    name: '',
    email: ''
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isFirstChange = useRef(true);

  useEffect(() => {
    if (!user) return;

    const base = {
      name: user.name,
      email: user.email
    };

    setFormValue({
      ...base,
      password: ''
    });

    setInitialValue(base);
    setIsReady(true);
  }, [user]);

  if (!isReady) return null;

  const isFormChanged =
    isDirty &&
    (formValue.name !== initialValue.name ||
      formValue.email !== initialValue.email ||
      !!formValue.password);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isFormChanged) return;

    await dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password || undefined
      })
    );

    const updated = {
      name: formValue.name,
      email: formValue.email
    };

    setInitialValue(updated);

    setFormValue((prev) => ({
      ...prev,
      password: ''
    }));

    setIsDirty(false);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setFormValue({
      name: initialValue.name,
      email: initialValue.email,
      password: ''
    });

    setIsDirty(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value
    }));

    if (isFirstChange.current) {
      isFirstChange.current = false;
      return;
    }

    setIsDirty(true);
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
