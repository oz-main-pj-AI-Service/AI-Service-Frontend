import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo_black from '@/assets/logo_black.png';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_URL } from '@/constants/url';
import axios from 'axios';
import { Link } from 'react-router';

const schema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
});

export default function FindPw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  //소셜로그인 이메일은 비밀번호 수정 안되게 하기
  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await axios.post(`${API_URL}/user/find-password/`, {
        email: data.email,
      });
      if (response.status === 200) {
        console.log(response);
        alert(response.data.detail);
      }
    } catch (error: any) {
      alert(error.response.data.error);
      console.log(error);
    }
  };
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <section className="flex h-screen items-center justify-center dark:text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <h1>
            <img src={logo_black} alt="한상비서로고" />
          </h1>
          <h1>비밀번호 찾기</h1>
          <label>
            이메일
            <Input type="email" {...register('email')} placeholder="hansang@example.com" />
          </label>
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          <Button type="submit">본인인증</Button>
          <Link to="/sign-in/find-id">아이디 찾기</Link>
        </form>
      </section>
    </main>
  );
}
//모달로 이메일을 확인해주세요 띄우기

// api.hansang.ai.kr/api/user/find-password/
// 유저한테서 받은 이메일 보낼곳
