import { AppStore } from "../store";
import { selectPlayer, selectAllPlayers, selectIsWaitingForPlayer, selectAllPlayersSorted } from "../../player/selectors";
import { IPlayer } from "../../player/types";

export function getPlayer(store: AppStore, isRequired: true): IPlayer;
export function getPlayer(store: AppStore): IPlayer | undefined;
export function getPlayer(store: AppStore, isRequired = false): IPlayer | undefined {
	const player = selectPlayer(store.playerStore);

	if (!player && isRequired) {
		throw new Error("Player is required");
	}

	return player;
}

export function getAllPlayers(store: AppStore) {
	return selectAllPlayers(store.playerStore);
}

export function getAllPlayersSorted(store: AppStore) {
	return selectAllPlayersSorted(store.playerStore);
}

export function getIsWaitingForPlayer(store: AppStore) {
	return selectIsWaitingForPlayer(store.playerStore);
}

export function getSessionCode(store: AppStore) {
	return store.sessionCode;
}
