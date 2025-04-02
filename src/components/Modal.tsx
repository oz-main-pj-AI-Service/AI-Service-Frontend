import useModal from '@/stores/modal';
import { useRef } from 'react';
import logo_black from '@/assets/logo_black.png';

const Modal: React.FC = () => {
  const { isOpen, content, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/80 pl-[100px]"
      onClick={handleOutsideClick}
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 차단
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          &times;
        </button>
        <h1 className="flex items-center justify-center">
          <img src={logo_black} alt="한상로고" className="h-auto w-auto" />
        </h1>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
