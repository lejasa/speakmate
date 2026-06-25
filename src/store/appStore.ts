import { create } from 'zustand';

interface AppState {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useAppStore;
