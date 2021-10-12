import { PlayCard } from './types';

export const getCards = (): PlayCard[] => [
  0, 1, 2, 3, 5, 8, 13, 20, 40, 100, 'coffee', '?',
];

export const sortCards = (a: PlayCard, b: PlayCard) => {
  if (a === b) return 0;

  if (a === 'coffee') return -1;
  if (b === 'coffee') return 1;

  if (a === '?') return -1;
  if (b === '?') return 1;

  return a < b ? 1 : -1;
};
