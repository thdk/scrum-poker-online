import { useStore } from "../../hooks"

export const useAuthStore = () => {
    const store = useStore();

    return store.authStore;
};
