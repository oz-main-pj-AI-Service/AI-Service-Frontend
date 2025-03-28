import { darkModeStore } from '@/types/stores';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useDarkMode = create<darkModeStore>()(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newDarkMode };
        });
      },
      initializeDarkMode: () => {
        set((state) => {
          if (state.isDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return {};
        });
      },
    }),
    {
      name: 'darkmode',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDarkMode;
