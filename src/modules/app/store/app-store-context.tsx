import React, { PropsWithChildren, useCallback } from 'react';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AppStore } from '.';
import { useFirebase } from '../../firebase/firebase-provider';

export type Store = AppStore;

export const StoreContext = React.createContext({} as Store);
export const StoreProvider = (
  { children }: PropsWithChildren<Record<string, unknown>>,
) => {
  const firebaseApp = useFirebase();
  const createStore = useCallback(
    () => {
      const firestore = getFirestore(firebaseApp);
      const store = new AppStore({
        firestore,
        auth: getAuth(firebaseApp),
      });

      // for development purposes only
      if (process.env.NODE_ENV !== 'production') {
        (window as any).store = store;
      }

      const urlParams = new URLSearchParams(window.location.search);
      store.viewStore.sessionFromUrl = urlParams.get('session') || undefined;

      return store;
    },
    [firebaseApp],
  );
  return (
    <StoreContext.Provider value={createStore()}>
      {children}
    </StoreContext.Provider>
  );
};
