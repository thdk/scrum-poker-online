import { AppStore } from "../store";

export function getCards(store: AppStore) {
	return store.cards;
}
