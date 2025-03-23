//회원가입
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpSchema } from './schema';
import { Button } from '@/components/ui/button';
import { goNaverSignUp, goGoogleSignUp } from './SocialSignUp';
import { API_URL } from '@/constants/url';
import axios from 'axios';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password1: '',
      password2: '',
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/register/`, data);
      console.log('폼제출성공', response.data);
    } catch (error) {
      console.error('회원가입실패', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <img src="" alt="한상비서로고" className="w-full" />
        <h2 className="mb-4 text-lg font-bold">회원가입</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">닉네임</label>
          <input
            type="text"
            {...register('nickname')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.nickname && <p className="text-xs text-red-500">{errors.nickname.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이메일</label>
          <input
            type="email"
            {...register('email')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">비밀번호</label>
          <input
            type="password"
            {...register('password1')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.password1 && <p className="text-xs text-red-500">{errors.password1.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">비밀번호 확인</label>
          <input
            type="password"
            {...register('password2')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.password2 && <p className="text-xs text-red-500">{errors.password2.message}</p>}
        </div>
        <Button type="submit">회원가입</Button>
        <p>sns 간편로그인</p>
        <Button onClick={() => goNaverSignUp()}>네이버</Button>
        <Button onClick={() => goGoogleSignUp()}>구글</Button>
      </form>
    </div>
  );
};

export default SignUp;
