import { AppStore } from "../store";
import { selectIsEditMode } from "../../view/selectors";

export function getIsEditMode(store: AppStore) {
    return selectIsEditMode(store.viewStore);
}
