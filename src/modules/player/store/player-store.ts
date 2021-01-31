import { CrudStore, Doc, RealtimeMode } from 'firestorable';
import { computed, reaction } from 'mobx';
import type firebase from 'firebase';

import type { AppStore } from '../../app/store';
import { sortCards } from '../../cards';
import { deserializePlayer } from '../serialization/deserializer';
import { serializePlayer } from '../serialization/serializer';
import { IPlayer, IPlayerData } from '../types';

export class PlayerStore extends CrudStore<IPlayer, IPlayerData> {
  private readonly appStore: AppStore;

  constructor(
    appStore: AppStore,
    firestore: firebase.firestore.Firestore,
  ) {
    super({
      collection: 'players',
      collectionOptions: {
        deserialize: deserializePlayer,
        serialize: serializePlayer,
        realtimeMode: RealtimeMode.on,
      },
    }, {
      firestore,
    });

    this.appStore = appStore;

    reaction(() => this.player, (player) => {
      this.collection.query = player?.session !== undefined
        ? (ref) => ref.where('session', '==', player.session)
        : null;
    });
  }

  @computed
  private get playerId() {
    return this.appStore.authStore.activeDocumentId;
  }

  @computed
  public get fieldPlayers() {
    return this.collection.docs.reduce((p, c) => {
      if (c.data && !c.data?.isSparePlayer) {
        p[(c.data.field || 1) - 1].push(c);
      }
      return p;
    }, [[], []] as [Doc<IPlayer>[], Doc<IPlayer>[]]);
  }

  public get sparePlayers() {
    return this.collection.docs
      .filter((d) => d.data?.isSparePlayer)
      .map((doc) => doc.data!);
  }

  @computed get fieldPlayersSorted() {
    if (this.isWaitingForPlayer) return this.fieldPlayers;

    return this.fieldPlayers
      .map((players) => players.sort((a, b) => sortCards(a.data!.value!, b.data!.value!)));
  }

  @computed
  public get player() {
    return this.appStore.authStore.activeDocument as IPlayer | undefined;
  }

  @computed
  public get isWaitingForPlayer() {
    return this.collection.docs
      .filter((player) => !player.data!.isSparePlayer)
      .some((p) => p.data!.value === undefined);
  }

  @computed
  public get numberOfFields() {
    return this.fieldPlayers.reduce((p, c) => {
      if (c.length) {
        p += 1;
      }
      return p;
    }, 0);
  }

  public savePlayer(data: Partial<IPlayer>) {
    this.updatePlayerAsync(data);
  }

  public updatePlayerAsync(player: Partial<IPlayer>) {
    return (this.player && this.playerId)
      ? this.appStore.authStore.updateDocument(player, this.playerId)
      : Promise.reject(new Error('No player set'));
  }

  public restart() {
    this.appStore.authStore.collection.updateAsync(
      {
        value: undefined,
      },
      ...this.collection.docs.map((p) => p.id),
    );
  }
}
