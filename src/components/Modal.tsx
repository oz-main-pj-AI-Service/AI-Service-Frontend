// Modal.tsx
import useModal from '@/stores/modal';
import { useEffect } from 'react';

export default function Modal() {
  const { isOpen, content, closeModal } = useModal();

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black/80">
      <section className="rounded bg-white px-8 py-10">
        {content}
        <button
          onClick={closeModal}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          닫기
        </button>
      </section>
    </div>
  );
}
