import { ViewStore } from "../store";

export function selectIsEditMode(store: ViewStore) {
    return store.isEditMode;
}
