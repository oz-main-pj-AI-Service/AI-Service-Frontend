import useModal from '@/states/modal';
import { useEffect } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const { isOpen, closeModal } = useModal();

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-black/80"
    >
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded bg-white px-8 py-6"
      >
        {children}
      </section>
    </div>
  );
}
