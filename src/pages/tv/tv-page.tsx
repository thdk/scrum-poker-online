import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticatedUser } from '../../modules/auth';
import { TvScreen } from '../../screens/tv';

export function TvPage() {
  const history = useHistory();
  const user = useAuthenticatedUser(() => history.push('/login'));

  return user
    ? <TvScreen />
    : null;
}
