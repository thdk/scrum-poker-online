import * as React from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Cards } from './cards';
import { useStore } from '../../modules/app/use-app-store';
import { PlayCard } from '../../modules/cards/types';
import { getCards } from '../../modules/cards';

const CardsMobx = () => {
  const store = useStore();

  const handleCardSelect = useCallback((card: PlayCard) => {
    store.playerStore.updatePlayerAsync({ value: card });
  }, [store.playerStore]);

  return <Cards cards={getCards()} onCardSelect={handleCardSelect} />;
};

export default observer(CardsMobx);
