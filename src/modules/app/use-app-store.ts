import React from 'react';
import { StoreContext } from './store/app-store-context';

export const useAppStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
