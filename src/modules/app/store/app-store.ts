import { PlayerStore } from "../../player/store";
import { ViewStore } from "../../view/store";
import firebase from "firebase/app";
import "firebase/auth";

import { AuthStore, RealtimeMode } from "firestorable";
import { IPlayer } from "../../player/types";
import { deserializePlayer } from "../../player/serialization/deserializer";
import { serializePlayer } from "../../player/serialization/serializer";

export type PlayCard = 0 | 1 | 2 | 3 | 5 | 8 | 13 | 20 | 40 | 100 | "coffee" | "?";

export const sortCards = (a: PlayCard, b: PlayCard) => {
	if (a === b) return 0;

	if (a === "coffee")
		return 1;

	if (a === "?")
		return -1;

	return a < b ? 1 : -1;
}

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
			collection: "players",
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


	public get cards(): PlayCard[] {
		return [
			0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "coffee", "?",
		];
	}
}
