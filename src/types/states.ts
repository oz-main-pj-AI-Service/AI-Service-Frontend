export type darkModeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export type ModalStore = {
  isOpen: boolean;
  content: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};
