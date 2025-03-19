import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import useModal from '@/states/modal';

export default function Admin() {
  // 모달 사용 예시
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <main className="flex justify-center pl-[200px]">
      <section className="max-w-5xl">
        <h2>관리자 페이지</h2>
        <p>{isOpen ? '모달 열림' : '모달 닫힘'}</p>
        <Button onClick={openModal}>모달 열기</Button>
        <Modal>
          <p>모달!</p>
          <Button onClick={closeModal}>모달 닫기</Button>
        </Modal>
      </section>
    </main>
  );
}
