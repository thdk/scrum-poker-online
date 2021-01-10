import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { App } from './app';
import { useAuthStore } from '../../modules/auth/use-auth-store';

const AppMobx = () => {
  const auth = useAuthStore();

  if (!auth.isAuthInitialised || !auth.collection.isFetched) {
    return <></>;
  }

  return <App />;
};

export default observer(AppMobx);
