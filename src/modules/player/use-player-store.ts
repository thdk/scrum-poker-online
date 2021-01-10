import { useStore } from '../app/use-app-store';

export const usePlayerStore = () => {
  const store = useStore();

  return store.playerStore;
};
