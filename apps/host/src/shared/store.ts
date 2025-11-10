import { create } from 'zustand';

// Estado global tipado
type AppState = {
  user: { name: string; loggedIn: boolean };
  setUser: (user: AppState['user']) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: { name: 'Alex', loggedIn: true },
  setUser: (user) => set({ user }),
}));

// Para frameworks externos (Angular, vanilla, etc.)
export const appStore = {
  getState: () => useAppStore.getState(),
  setState: (partial: Partial<AppState>) => useAppStore.setState(partial),
  subscribe: useAppStore.subscribe,
};
