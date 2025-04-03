// import useModal from '@/stores/modal';
import useDarkMode from '@/stores/darkmode';
import logo_black from '@/assets/logo_black.png';
import logo from '@/assets/logo.png';

const Modal: React.FC<{
  isOpen: boolean;
  content: React.ReactNode;
  closeModal: () => void;
}> = ({ isOpen, content, closeModal }) => {
  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="bg-opacity-50 fixed inset-0 z-10 flex items-center justify-center bg-black/80"
        onClick={closeModal}
      ></div>
      <div className="fixed top-1/2 left-1/2 z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[var(--bg-light)] p-8 shadow-lg dark:bg-[var(--bg-dark)]">
        {/* 닫기 버튼 */}
        {/* <Button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          &times;
        </Button> */}
        <h4 className="flex items-center justify-center pb-8">
          {isDarkMode ? (
            <img src={logo} alt="한상로고" className="h-auto w-auto" />
          ) : (
            <img src={logo_black} alt="한상로고" className="h-auto w-auto" />
          )}
        </h4>
        <div>{content}</div>
      </div>
    </>
  );
};

export default Modal;
