import React, { useCallback, useEffect } from 'react';
import { reaction } from 'mobx';

import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { PlayerForm } from './player-form';
import { IPlayer } from '../../modules/player/types';

import './player-form.css';
import { useAppStore } from '../../modules/app/use-app-store';

const PlayerFormContainer = () => {
  const store = useAppStore();

  const history = useHistory();
  const { playerStore } = store;

  useEffect(
    () => {
      if (store.viewStore.sessionFromUrl) {
        playerStore.savePlayer({ session: store.viewStore.sessionFromUrl });
        store.viewStore.sessionFromUrl = undefined;
      }
    },
    [
      playerStore,
      store.viewStore,
      store.viewStore.sessionFromUrl,
    ],
  );

  const onSave = useCallback(
    (data: Partial<IPlayer>) => {
      playerStore.savePlayer({
        ...data,
        // reset vote value when player switches to another session
        value: playerStore.player?.session === data.session
          ? playerStore.player?.value
          : undefined,
      });
      reaction(() => playerStore.player, () => {
        history.push('/game');
      });
    },
    [
      history,
      playerStore,
    ],
  );

  return (
    <PlayerForm
      onSave={onSave}
      player={playerStore.player}
    />
  );
};

export default observer(PlayerFormContainer);
