import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInSchema } from './schema';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { goGoogleSignIn, goNaverSignIn } from './SocialSignUp';
import 네이버 from './네이버.png';
import 구글 from './구글.png';
import axios from 'axios';
import { API_URL } from '@/constants/url';
import { useAuthStore } from '@/stores/authStore';
import logo_black from '@/assets/logo_black.png';

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

  const handleResponseData = (data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    admin: string;
  }) => {
    useAuthStore.getState().setAuthData({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      token_type: data.token_type || 'Bearer', // 기본값 설정
      expires_in: data.expires_in || 3600,
      admin: data.admin,
    });
  };

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await axios.post(`${API_URL}/user/login/`, data);
      // console.log('로그인 성공', response.data);
      handleResponseData(response.data);
      console.log(response);

      setTimeout(() => {
        window.location.href = '/';
        // navigate('/');
      }, 1000);
    } catch (error: any) {
      // console.error('로그인 실패', error.response.data);
      const { detail, code } = error.response.data;
      if (error.response.status === 403) {
        if (code === 'Too_much_attempts') {
          alert(detail);
          console.log(detail);
        } else {
          alert('관리자에게 문의해주세요');
          console.error(error.response.data);
        }
      } else {
        alert(error.response.data.error);
      }
      // console.log(error);
    }
  };

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex h-screen items-center justify-center dark:text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <h1 className="flex items-center justify-center">
            <img src={logo_black} alt="한상비서로고" />
          </h1>
          <p className="text-center text-xs">
            회원이 아니신가요? &nbsp;
            <Link to="/sign-up" className="text-blue-500">
              회원가입 하기
            </Link>
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">이메일</label>
            <Input
              type="email"
              placeholder="hansang@example.com"
              {...register('email')}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
            {errors.email && <div className="text-xs text-red-500">{errors.email.message}</div>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">비밀번호</label>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register('password')}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
            {errors.password && (
              <div className="text-xs text-red-500">{errors.password.message}</div>
            )}
          </div>

          <Button className="text-white dark:bg-[var(--point-orange)]">로그인</Button>
          <div className="flex justify-end gap-4">
            <Link to="/sign-in/find-id" className="text-xs">
              아이디 찾기
            </Link>
            <Link to="/sign-in/find-pw" className="text-xs">
              비밀번호 찾기
            </Link>
          </div>
          <hr className="dark:border-gray-200" />
          <p className="text-center text-xs">sns 간편 로그인</p>
          <div className="flex justify-center gap-20">
            <button onClick={goNaverSignIn}>
              <img src={네이버} alt="네이버로그인" className="h-15 w-15" />
            </button>
            <button onClick={goGoogleSignIn}>
              <img src={구글} alt="구글로그인" className="h-15 w-15" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
