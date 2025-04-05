import { Link } from 'react-router';
import { Button } from '../ui/button';

const LoginRequiredModal = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-2xl">
        식사 고민 그만! <br />
        한끼비서에게 맡기세요
      </h1>
      <div className="flex gap-4">
        <Link to="/sign-in">
          <Button className="w-40 bg-[var(--point-orange)]">로그인</Button>
        </Link>
        <Link to="/sign-up">
          <Button className="w-40">회원가입</Button>
        </Link>
      </div>
    </div>
  );
};
//로그인 안하고 검색시도 시 모달
export default LoginRequiredModal;
