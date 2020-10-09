import * as React from "react";
import { useStore } from "../../hooks";
import { getCards } from "../../modules/app/selectors";
import { Cards } from "./cards";
import { useCallback } from "react";
import { PlayCard } from "../../modules/app/store";
import { observer } from "mobx-react-lite";

const CardsMobx = () => {
	const store = useStore();

	const cards = getCards(store);

	const handleCardSelect = useCallback((card: PlayCard) => {
		store.playerStore.updatePlayerAsync({ value: card });
	}, [store.playerStore]);

	return <Cards cards={cards} onCardSelect={handleCardSelect}></Cards>
};

export default observer(CardsMobx);
