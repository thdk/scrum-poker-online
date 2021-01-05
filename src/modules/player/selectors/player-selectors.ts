import { PlayerStore } from "../store";

export function selectPlayer(store: PlayerStore) {
	return store.player;
}

export function selectFieldPlayers(store: PlayerStore) {
	return store.fieldPlayers;
}

export function selectSparePlayers(store: PlayerStore) {
	return store.sparePlayers;
}

export function selectFieldPlayersSorted(store: PlayerStore) {
	return store.fieldPlayersSorted;
}

export function selectIsWaitingForPlayer(store: PlayerStore) {
	return store.isWaitingForPlayer;
}
