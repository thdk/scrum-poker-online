import { useAppStore } from '../app/use-app-store';

export const useAuthStore = () => {
  const store = useAppStore();

  return store.authStore;
};
