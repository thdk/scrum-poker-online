import { CrudStore, RealtimeMode } from "firestorable";
import { computed, reaction } from "mobx";

import { AppStore, sortCards } from "../../app/store";
import { deserializePlayer } from "../serialization/deserializer";
import { serializePlayer } from "../serialization/serializer";
import { IPlayer, IPlayerData, PlayerType } from "../types";

export class PlayerStore extends CrudStore<IPlayer, IPlayerData> {
	private readonly appStore: AppStore;
	constructor(
		appStore: AppStore,
		firestore: firebase.firestore.Firestore,
	) {
		super({
			collection: "players",
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
			this.collection.query = player.session !== undefined
				? (ref) => ref.where("session", "==", player.session)
				: null;
		});
	}

	@computed
	private get playerId() {
		return this.appStore.authStore.activeDocumentId;
	}

	@computed
	public get fieldPlayers() {
		return this.collection.docs
			.filter(d => d.data?.type === PlayerType.player
				&& !d.data?.isSparePlayer
			);
	}

	public get sparePlayers() {
		return this.collection.docs
			.filter(d => d.data?.type === PlayerType.player
				&& d.data?.isSparePlayer
			)
			.map(doc => doc.data!);
	}

	@computed get fieldPlayersSorted() {
		if (this.isWaitingForPlayer)
			return this.fieldPlayers;

		return this.fieldPlayers.sort((a, b) => sortCards(a.data!.value!, b.data!.value!));
	}

	@computed
	public get player() {
		return this.appStore.authStore.activeDocument as IPlayer;
	}

	@computed
	public get isWaitingForPlayer() {
		return this.fieldPlayers
			.filter(player => !player.data!.isSparePlayer)
			.some(p => p.data!.value === undefined);
	}

	public savePlayer(data: Partial<IPlayer>) {
		this.updatePlayerAsync(data);
	}

	public updatePlayerAsync(player: Partial<IPlayer>) {
		return (this.player && this.playerId)
			? this.appStore.authStore.updateDocument(player, this.playerId)
			: Promise.reject(new Error("No player set"));
	}

	public restart() {
		this.appStore.authStore.collection.updateAsync(
			{
				value: undefined,
			},
			...this.fieldPlayers.map(p => p.id),
		)
	}
}
