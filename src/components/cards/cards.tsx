import * as React from "react";
import { PlayCard } from "../../modules/app/store";

import "./cards.css";
import { Card } from "../card/card";

export type CardsProps = {
	cards: PlayCard[];
	onCardSelect: (card: PlayCard) => void;
}

export const Cards = (props: CardsProps) => {
	const { cards, onCardSelect } = props;

	return <div className="cards">
		{cards.map(c => <Card
			key={c}
			onClick={() => onCardSelect(c)}
			value={c} />
		)}
	</div>
};
