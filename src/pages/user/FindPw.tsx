import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo_black from '@/assets/logo_black.png';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_URL } from '@/constants/url';
import axios from 'axios';

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

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await axios.post(`${API_URL}/user/find-password/`, {
        email: data.email,
      });
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <section className="flex h-screen items-center justify-center">
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
          <Button type="submit">본인 인증</Button>
        </form>
      </section>
    </main>
  );
}
//모달로 이메일을 확인해주세요 띄우기

// api.hansang.ai.kr/api/user/find-password/
// 유저한테서 받은 이메일 보낼곳
