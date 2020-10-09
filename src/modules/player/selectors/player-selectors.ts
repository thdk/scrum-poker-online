import { PlayerStore } from "../store";

export function selectPlayer(store: PlayerStore) {
	return store.player;
}

export function selectAllPlayers(store: PlayerStore) {
	return store.allPlayers;
}

export function selectAllPlayersSorted(store: PlayerStore) {
	return store.allPlayersSorted;
}

export function selectIsWaitingForPlayer(store: PlayerStore) {
	return store.isWaitingForplayer;
}
