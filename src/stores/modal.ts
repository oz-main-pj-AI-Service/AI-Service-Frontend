// modal.ts
import { create } from 'zustand';
import { ModalStore } from '@/types/stores';

const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content: React.ReactNode) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));

export default useModal;
