import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AppStore } from '.';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const createStore = () => {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const store = new AppStore({
    firestore,
    auth: getAuth(app),
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
