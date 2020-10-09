import * as React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../hooks";
import { getPlayer, getIsEditMode } from "../../modules/app/selectors";

import { getSessionCode } from "../../modules/app/selectors";
import { App } from "./app";

const AppMobx = () => {
	const store = useStore();

	const player = getPlayer(store);
	const isEditMode = getIsEditMode(store);

	if (!store.playerStore.collection.isFetched && getSessionCode(store))
		return <></>;

	return <App screen={player && !isEditMode ? "game" : "settings"} />;
};

export default observer(AppMobx);
