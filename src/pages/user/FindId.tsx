import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo_black from '@/assets/logo_black.png';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { API_URL } from '@/constants/url';
import { Link } from 'react-router';

const schema = z.object({
  phone_number: z
    .string()
    .regex(/^01[0-9]{9}$/, '숫자만 입력 가능합니다')
    .length(11, '11자리 숫자를 입력해주세요'),
});

export default function FindId() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { phone_number: string }) => {
    try {
      const response = await axios.post(`${API_URL}/user/find-email/`, {
        phone_number: data.phone_number,
      });
      if (response.status === 200) {
        alert(response.data.message);
        console.log(response);
      }
    } catch (error) {
      alert('일치하는 회원 정보가 없습니다');
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
          <h1 className="flex items-center justify-center">
            <img src={logo_black} alt="한상비서로고" />
          </h1>
          <label className="text-sm font-medium">
            휴대폰 번호
            <Input
              type="tel"
              {...register('phone_number')}
              placeholder="가입 시 입력한 휴대폰 번호를 입력하세요"
            />
          </label>
          {errors.phone_number && (
            <p className="text-xs text-red-500">{errors.phone_number.message}</p>
          )}
          <Button type="submit" className="text-white dark:bg-[var(--point-orange)]">
            아이디 찾기
          </Button>
          <Link to="/sign-in/find-pw" className="text-right text-xs">
            비밀번호 찾기
          </Link>
        </form>
      </section>
    </main>
  );
}
//모달로 아이디와 가입일 띄우기
// /api/user/find-email/
