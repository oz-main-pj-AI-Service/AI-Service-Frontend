import { darkModeStore } from '@/types/states';
import { create } from 'zustand';

const useDarkMode = create<darkModeStore>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    document.documentElement.classList.toggle('dark');
  },
}));

export default useDarkMode;

// 현재는 새로고침하면 무조건 다크모드 (사용자 설정이 라이트모드여도)
