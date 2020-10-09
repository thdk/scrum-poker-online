import { Collection, CollectionReference, Doc } from "firestorable";
import firebase from "firebase/app";
import { computed, observable, reaction, action } from "mobx";
import MobxCookie from "mobx-cookie";

import { AppStore, sortCards } from "../../app/store";
import { IPlayer, IPlayerData, PlayerType } from "../types";
import { serializePlayer } from "../serialization/serializer";
import { deserializePlayer } from "../serialization/deserializer";
import { getSessionCode } from "../../app/selectors";

export class PlayerStore {
	public collection: Collection<IPlayer, IPlayerData>;

	@observable
	private playerIdCookie = new MobxCookie("player-id");

	@observable.ref
	private playerDoc?: Doc<IPlayer>;

	private readonly appStore: AppStore;

	constructor(appStore: AppStore) {
		this.appStore = appStore;

		const createQuery = () => {
			const session = getSessionCode(appStore);

			return session ?
				(ref: CollectionReference) =>
					ref.where("session", "==", session)
					.where("type", "==", PlayerType.player)
				: null;
		};

		this.collection = new Collection<IPlayer, IPlayerData>(
			firebase.firestore(),
			"players",
			{
				query: createQuery(),
				serialize: serializePlayer,
				deserialize: deserializePlayer,
			},
		);

		reaction(() => getSessionCode(appStore), () => {
			this.collection.query = createQuery();
		});

		reaction(
			() => this.playerId,
			id => {
				id && this.getPlayerAsync(id);
			},
			{
				fireImmediately: true,
			},
		);
	}

	@computed
	private get playerId() {
		return this.playerIdCookie.value;
	}

	@action
	private setPlayerId(value: string | undefined) {
		if (value) {
			this.playerIdCookie.set(value);
		} else {
			this.playerIdCookie.remove();
		}
	}

	@computed
	public get allPlayers() {
		return this.collection.docs;
	}

	@computed get allPlayersSorted() {
		if (this.isWaitingForplayer)
			return this.allPlayers;

		return this.allPlayers.sort((a, b) => sortCards(a.data!.value!, b.data!.value!));
	}

	@computed
	public get player() {
		const playerDoc = this.playerDoc;

		return playerDoc && playerDoc.data;
	}

	@computed
	public get isWaitingForplayer() {
		return this.allPlayers.some(p => p.data!.value === undefined);
	}

	public savePlayer(data: IPlayer) {
		this.player
			? this.updatePlayerAsync(data)
			: this.createPlayerAsync(data);
	}

	private getPlayerAsync(id: string) {
		this.collection.getAsync(id, { watch: true })
			.then(playerDoc => {
				if (playerDoc.data!.session)
					this.playerDoc = playerDoc;
				this.validatePlayerSession();
			},() => {
				this.setPlayerId(undefined);
			});
	}

	private validatePlayerSession() {
		const currentSessionCode = getSessionCode(this.appStore)
		if (this.player && (
			this.player.value !== undefined // Reset any value from the previous session
			|| (currentSessionCode && this.player.session !== currentSessionCode)) // Reset the players session to the current session
		) {
			this.updatePlayerAsync({
				session: currentSessionCode,
				value: undefined
			});
		}
	}

	public createPlayerAsync(player: IPlayer) {
		this.appStore.setSessionCode(player.session);

		return this.collection.addAsync(player)
			.then(this.setPlayerId.bind(this));
	}

	public updatePlayerAsync(player: Partial<IPlayer>) {
		if (player.session) {
			this.appStore.setSessionCode(player.session);
		}

		return (this.player && this.playerId)
			? this.collection.updateAsync(player, this.playerId)
			: Promise.reject(new Error("No player set"));
	}

	public restart() {
		this.collection.updateAsync(
			{
				value: undefined,
			},
			...this.collection.docs.map(p => p.id),
		)
	}
}
