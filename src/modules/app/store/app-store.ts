import firebase from 'firebase/app';
import { AuthStore, RealtimeMode } from 'firestorable';
import { PlayerStore } from '../../player/store';
import { ViewStore } from '../../view/store';
import 'firebase/auth';

import type { IPlayer } from '../../player/types';
import { deserializePlayer } from '../../player/serialization/deserializer';
import { serializePlayer } from '../../player/serialization/serializer';

export class AppStore {
  public playerStore: PlayerStore;

  public viewStore: ViewStore;

  public authStore: AuthStore<IPlayer>;

  constructor({
    firestore,
    auth,
  }: {
    firestore: firebase.firestore.Firestore;
    auth: firebase.auth.Auth;
  }) {
    this.authStore = new AuthStore({
      firestore,
      auth,
    }, {
      collection: 'players',
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
