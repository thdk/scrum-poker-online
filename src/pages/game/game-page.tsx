import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticatedUser } from '../../modules/auth';
import { GameScreen } from '../../screens/game';

export function GamePage() {
  const history = useHistory();
  const user = useAuthenticatedUser(() => history.push('/login'));

  return user
    ? <GameScreen />
    : null;
}
