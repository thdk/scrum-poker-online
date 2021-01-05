import { AppStore } from "../store";
import { IPlayer } from "../../player/types";

export function savePlayer(store: AppStore, data: Partial<IPlayer>) {
    store.playerStore.savePlayer(data);
    store.viewStore.isEditMode = false;
}
