import { Button } from '../ui/button';

const LoginRequiredModal = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-2xl">
        식사 고민 그만! <br />
        한끼비서에게 맡기세요
      </h1>
      <Button className="w-full max-w-xs bg-[var(--point-orange)]">로그인</Button>
      <Button className="w-full max-w-xs">회원가입</Button>
    </div>
  );
};
//로그인 안하고 검색시도 시 모달
export default LoginRequiredModal;
