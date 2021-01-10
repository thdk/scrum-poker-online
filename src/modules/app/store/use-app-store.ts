import firebase from 'firebase/app';
import React from 'react';
import { AppStore } from '.';

const createStore = () => {
  const store = new AppStore({
    firestore: firebase.firestore(),
    auth: firebase.auth(),
  });

  // for development purposes only
  if (process.env.NODE_ENV !== 'production') {
    (window as any).store = store;
  }

  const urlParams = new URLSearchParams(window.location.search);
  store.viewStore.sessionFromUrl = urlParams.get('session') || undefined;

  return store;
};

export type Store = ReturnType<typeof createStore>;

export const StoreContext = React.createContext(createStore());

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
