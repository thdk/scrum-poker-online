import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Header } from './header';
import { useAuthenticatedUser } from '../../modules/auth';

const HeaderMobx = () => {
  const user = useAuthenticatedUser();
  return user
    ? <Header />
    : null;
};

export default observer(HeaderMobx);
