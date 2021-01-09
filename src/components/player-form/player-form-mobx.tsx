import React, { useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { PlayerForm } from './player-form';
import { getPlayer } from '../../modules/app/selectors';
import { IPlayer } from '../../modules/player/types';
import { savePlayer } from '../../modules/app/modifiers';

import './player-form.css';
import { useStore } from '../../modules/app/store/use-app-store';

const PlayerFormContainer = () => {
  const store = useStore();

  const player = getPlayer(store);

  const onSave = useCallback((data: Partial<IPlayer>) => {
    savePlayer(store, {
      ...data,
      value: undefined,
    });
  }, [store]);

  return (
    <PlayerForm
      onSave={onSave}
      player={player}
    />
  );
};

export default observer(PlayerFormContainer);
