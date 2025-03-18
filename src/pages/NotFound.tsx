import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex h-screen items-center justify-center">
      <section className="max-w-5xl">
        <h2>페이지를 찾을 수 없습니다!</h2>
        <p>주소를 다시 확인해주세요 😅</p>
        <Button asChild>
          <Link to="/">메인으로 돌아가기</Link>
        </Button>
        <Button onClick={() => navigate(-1)}>이전으로 돌아가기</Button>
      </section>
    </main>
  );
}
