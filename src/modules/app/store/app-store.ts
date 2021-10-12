import { AuthStore, RealtimeMode } from 'firestorable';
import type { Auth } from 'firebase/auth';
import { collection, Firestore } from 'firebase/firestore';
import { PlayerStore } from '../../player/store';
import { ViewStore } from '../../view/store';

import type { IPlayer, IPlayerData } from '../../player/types';
import { deserializePlayer } from '../../player/serialization/deserializer';
import { serializePlayer } from '../../player/serialization/serializer';

export class AppStore {
  public playerStore: PlayerStore;

  public viewStore: ViewStore;

  public authStore: AuthStore<IPlayer, IPlayerData>;

  public auth: Auth;

  constructor({
    firestore,
    auth,
  }: {
    firestore: Firestore;
    auth: Auth;
  }) {
    this.auth = auth;
    this.authStore = new AuthStore({
      firestore,
      auth,
    }, {
      collection: collection(firestore, 'players') as any,
      collectionOptions: {
        realtimeMode: RealtimeMode.on,
        deserialize: deserializePlayer,
        serialize: serializePlayer,
      },
    });

    this.playerStore = new PlayerStore(
      this,
      firestore,
    );
    this.viewStore = new ViewStore();
  }
}
