import { useStore } from '../app/use-app-store';

export const useAuthStore = () => {
  const store = useStore();

  return store.authStore;
};
