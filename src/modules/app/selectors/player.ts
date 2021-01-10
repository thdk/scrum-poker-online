import { AppStore } from '../store';
import {
  selectPlayer,
  selectFieldPlayers,
  selectIsWaitingForPlayer,
  selectFieldPlayersSorted,
  selectSparePlayers,
} from '../../player/selectors';
import { IPlayer } from '../../player/types';

export function getPlayer(store: AppStore, isRequired: true): IPlayer;
export function getPlayer(store: AppStore): IPlayer | undefined;
export function getPlayer(store: AppStore, isRequired = false): IPlayer | undefined {
  const player = selectPlayer(store.playerStore);

  if (!player && isRequired) {
    throw new Error('Player is required');
  }

  return player;
}

export function getFieldPlayers(store: AppStore) {
  return selectFieldPlayers(store.playerStore);
}

export function getSparePlayers(store: AppStore) {
  return selectSparePlayers(store.playerStore);
}

export function getFieldPlayersSorted(store: AppStore) {
  return selectFieldPlayersSorted(store.playerStore);
}

export function getIsWaitingForPlayer(store: AppStore) {
  return selectIsWaitingForPlayer(store.playerStore);
}
