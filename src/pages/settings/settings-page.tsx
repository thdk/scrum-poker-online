import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticatedUser } from '../../modules/auth';
import { WelcomeScreen } from '../../screens/welcome';

export function SettingsPage() {
  const history = useHistory();
  const user = useAuthenticatedUser(() => history.push('/login'));

  return user
    ? <WelcomeScreen />
    : null;
}
