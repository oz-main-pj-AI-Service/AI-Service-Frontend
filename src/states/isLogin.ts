import { create } from 'zustand';

type IsLogedinState = {
  isLogedIn: boolean;
  toggleIsLogedIn: () => void;
};

const useIsLogedIn = create<IsLogedinState>((set) => ({
  isLogedIn: false,
  toggleIsLogedIn: () => {
    set((state) => ({ isLogedIn: !state.isLogedIn }));
  },
}));

export default useIsLogedIn;
