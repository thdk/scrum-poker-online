import { useStore } from '../app/store/use-app-store';

export const useAuthStore = () => {
  const store = useStore();

  return store.authStore;
};
