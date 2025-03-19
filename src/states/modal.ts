import { ModalStore } from '@/types/states';
import { create } from 'zustand';

const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModal;
