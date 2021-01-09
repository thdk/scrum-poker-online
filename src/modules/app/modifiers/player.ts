import type { AppStore } from '../store';
import type { IPlayer } from '../../player/types';

export function savePlayer(store: AppStore, data: Partial<IPlayer>) {
  store.playerStore.savePlayer(data);
  store.viewStore.isEditMode = false;
}
