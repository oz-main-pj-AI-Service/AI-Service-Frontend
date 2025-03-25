import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInSchema } from './schema';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { goGoogleSignIn, goNaverSignIn } from './SocialSignUp';
import 네이버동그라미 from './네이버동그라미.png';
import 구글동그라미 from './구글동그라미.png';
import axios from 'axios';
import { API_URL } from '@/constants/url';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login/`, data);
      console.log('로그인 성공', response.data);
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <img src="" alt="한상비서로고" className="w-full" />
        <h2 className="mb-4 text-lg font-bold">로그인</h2>
        <p>
          회원이 아니신가요?<Link to="/sign-up">회원가입 하기</Link>
        </p>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">이메일</label>
          <Input
            type="email"
            placeholder="hansang@example.com"
            {...register('email')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">비밀번호</label>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register('password')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        </div>
        <div className="flex gap-4">
          <Link to="/sign-in/find-id">아이디 찾기</Link>
          <Link to="/sign-in/find-pw">비밀번호 찾기</Link>
        </div>
        <Button>로그인하기</Button>
        <p>sns 간편 로그인</p>
        <div className="flex justify-center gap-20">
          <button onClick={goNaverSignIn}>
            <img src={네이버동그라미} alt="네이버로그인" className="h-15 w-15" />
          </button>
          <button onClick={goGoogleSignIn}>
            <img src={구글동그라미} alt="구글로그인" className="h-15 w-15" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
