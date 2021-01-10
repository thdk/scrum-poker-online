import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import {
  getFieldPlayersSorted, getIsWaitingForPlayer, getPlayer, getSparePlayers,
} from '../../modules/app/selectors';
import { PlayerBoard } from './player-board';
import { PlayerBench } from '../player-bench';
import { ContentWrapper } from '../content-wrapper';
import { PlayerType } from '../../modules/player/types';
import { useStore } from '../../modules/app/store/use-app-store';

const PlayerBoardMobx = () => {
  const store = useStore();

  const player = getPlayer(store);
  const players = getFieldPlayersSorted(store);
  const sparePlayers = getSparePlayers(store);
  const isWaitingforPlayer = getIsWaitingForPlayer(store);

  const handleOnRestart = useCallback(() => {
    store.playerStore.restart();
  }, [store.playerStore]);

  const handleOnPlayerClick = useCallback((id: string) => {
    if (
      store.playerStore.player?.type !== PlayerType.host
    ) {
      return;
    }

    store.playerStore.updateDocument({
      isSparePlayer: true,
      value: undefined,
    }, id);
  }, [store.playerStore]);

  const handleOnSparePlayerClick = useCallback((id: string) => {
    if (store.playerStore.player?.type !== PlayerType.host) {
      return;
    }

    store.playerStore.updateDocument({
      isSparePlayer: false,
    }, id);
  }, [store.playerStore]);

  return player?.session
    ? (
      <ContentWrapper>
        <PlayerBoard
          players={players}
          session={player.session}
          onRestart={handleOnRestart}
          isWaitingForPlayer={isWaitingforPlayer}
          onPlayerClick={handleOnPlayerClick}
        />
        <PlayerBench
          sparePlayers={sparePlayers}
          onPlayerClick={
            store.playerStore.player?.type === PlayerType.host
              ? handleOnSparePlayerClick
              : undefined
          }
        />
      </ContentWrapper>
    )
    : <></>;
};

export default observer(PlayerBoardMobx);
