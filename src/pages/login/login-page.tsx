import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/login';
import { useAuthenticatedUser } from '../../modules/auth';

export function LoginPage() {
  const history = useHistory();
  const user = useAuthenticatedUser();

  useEffect(
    () => {
      if (user !== null) {
        history.push('/game');
      }
    },
    [
      history,
      user,
    ],
  );

  return user
    ? null
    : <Login />;
}
