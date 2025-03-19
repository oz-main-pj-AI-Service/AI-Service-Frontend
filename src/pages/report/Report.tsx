import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function Report() {
  const navigate = useNavigate();

  return (
    <main className="flex h-full items-center justify-center pt-14 pl-[200px]">
      <section className="max-w-5xl">
        <h2>내 문의사항 목록</h2>
        <Button onClick={() => navigate('/report/post')}>문의하기</Button>
      </section>
    </main>
  );
}
