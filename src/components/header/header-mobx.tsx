import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useCallback } from 'react';
import { Header } from './header';
import { getIsEditMode } from '../../modules/app/selectors';
import { useStore } from '../../modules/app/store/use-app-store';

const HeaderMobx = () => {
  const store = useStore();

  const isEditMode = getIsEditMode(store);

  const handleTabClick = useCallback((tab: 'game' | 'settings') => {
    store.viewStore.isEditMode = tab === 'settings';
  }, [store.viewStore]);

  return (
    <Header
      editMode={isEditMode}
      onTabClick={handleTabClick}
    />
  );
};

export default observer(HeaderMobx);
