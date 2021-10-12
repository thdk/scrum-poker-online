import { useAppStore } from '../app/use-app-store';

export const usePlayerStore = () => {
  const store = useAppStore();

  return store.playerStore;
};
