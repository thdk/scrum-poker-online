import * as React from 'react';

import './cards.css';
import { Card } from '../card/card';
import { PlayCard } from '../../modules/cards/types';

export type CardsProps = {
  cards: PlayCard[];
  onCardSelect: (card: PlayCard) => void;
};

export const Cards = (props: CardsProps) => {
  const { cards, onCardSelect } = props;

  return (
    <div className="cards">
      {cards.map((c) => (
        <Card
          key={c}
          onClick={() => onCardSelect(c)}
          value={c}
        />
      ))}
    </div>
  );
};
