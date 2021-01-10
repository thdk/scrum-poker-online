import { AuthStore } from 'firestorable';
import { reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { IPlayer, IPlayerData } from '../player/types';
import { useAuthStore } from './use-auth-store';

const getAuthUser = (authStore: AuthStore<IPlayer, IPlayerData>) => {
  if (authStore.isAuthInitialised && authStore.collection.isFetched) {
    return authStore.activeDocument || null;
  }

  return undefined;
};

export const useAuthenticatedUser = (
  callback?: () => void,
) => {
  const auth = useAuthStore();

  const [authUser, setAuthUser] = useState(() => getAuthUser(auth));
  useEffect(
    () => reaction(
      () => getAuthUser(auth),
      setAuthUser,
    ),
    [
      auth,
    ],
  );

  useEffect(
    () => {
      if (callback && authUser === null) {
        callback();
      }
    },
    [
      authUser,
      callback,
    ],
  );

  return authUser;
};
