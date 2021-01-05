import * as React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../hooks";
import { getPlayer, getIsEditMode } from "../../modules/app/selectors";

import { App } from "./app";
import { useAuthStore } from "../../modules/auth/use-auth-store";
import { Login } from "../login";

const AppMobx = ({
	sessionFromUrl,
}:{
	sessionFromUrl?: string;
}) => {
	const store = useStore();

	const player = getPlayer(store);
	const isEditMode = getIsEditMode(store);
	const auth = useAuthStore();

	React.useEffect(
		() => {
			if (!auth.activeDocument) {
				return;
			}
			if (sessionFromUrl !== undefined) {
				auth.updateActiveDocument({
					session: sessionFromUrl,
					value: undefined,
				});
			}
		},
		[
			auth,
			auth.activeDocument,
			sessionFromUrl,
		]);

	if (!store.authStore.collection.isFetched)
		return <></>;

	// wait for authentication to be initialized
	if (!auth.isAuthInitialised) {
		// TODO: return load screen
		return null;
	}

	if (!auth.activeDocument) {
		return (
			<Login />
		);
	}

	return <App screen={player?.session && !isEditMode ? "game" : "settings"} />;
};

export default observer(AppMobx);
