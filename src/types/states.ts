export type darkModeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export type ModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
