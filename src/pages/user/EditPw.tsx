import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo_black from '@/assets/logo_black.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { API_URL } from '@/constants/url';
import { useEffect, useState } from 'react';

const schema = z
  .object({
    password1: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상입니다' })
      .regex(/^(?=.*[!@#$%^&*()_+=-{};:'<>,./?]).*$/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다',
      }),
    password2: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상입니다' })
      .regex(/^(?=.*[!@#$%^&*()_+=-{};:'<>,./?]).*$/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다',
      }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['password2'],
  });

export default function EditPw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const url = window.location.href;
    const queryParams = new URLSearchParams(new URL(url).search);
    setEmail(queryParams.get('email'));
  }, []);

  const onSubmit = async (data: { password1: string; password2: string }) => {
    try {
      const requestData = { ...data, email };
      const response = await axios.post(`${API_URL}/change-pw/`, requestData);
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
          <h1>비밀번호 변경</h1>
          <label>
            새 비밀번호
            <Input {...register('password1')} type="password" placeholder="새 비밀번호" />
            {errors.password1 && <p className="text-xs text-red-500">{errors.password1.message}</p>}
          </label>
          <label>
            새 비밀번호 확인
            <Input type="password" {...register('password2')} placeholder="새 비밀번호 확인" />
          </label>
          {errors.password2 && <p className="text-xs text-red-500">{errors.password2.message}</p>}
          <Button type="submit">변경 완료</Button>
        </form>
      </section>
    </main>
  );
}

// change-pw/ 여기로 password1, password2 , 쿼리에서 뽑은 이메일 보내기
