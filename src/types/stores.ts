export type darkModeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  initializeDarkMode: () => void;
};

export type ModalStore = {
  isOpen: boolean;
  content: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};
