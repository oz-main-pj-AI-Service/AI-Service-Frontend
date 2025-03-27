//회원가입
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpSchema } from './schema';
import { Button } from '@/components/ui/button';
import { goNaverSignUp, goGoogleSignUp } from './SocialSignUp';
import { API_URL } from '@/constants/url';
import axios from 'axios';
import 네이버 from './네이버.png';
import 구글 from './구글.png';
import useModal from '@/states/modal';
import Modal from '@/components/Modal';
import 한상로고 from '@/assets/한상로고.png';
import { Link } from 'react-router';

const SignUp = () => {
  const { openModal } = useModal();
  //유효성검사
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password1: '',
      password2: '',
      nickname: '',
      phone_number: '',
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await axios.post(`${API_URL}/user/register/`, data);
      if (response.status === 201) {
        console.log('회원가입 성공');
        openModal(<p>이메일 인증을 완료해주세요 : {data.email}</p>);
        reset();
        // 회원가입 성공 후 추가 작업 수행
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        const errors = error.response.data;

        if (errors.detail && errors.detail.includes('이미 사용중인 이메일 입니다.')) {
          alert('중복된 이메일입니다.');
        }
        if (errors.detail && errors.detail.includes('이미 사용 중인 핸드폰 번호입니다.')) {
          alert('중복된 전화번호입니다.');
          console.error('중복된 전화번호입니다:', errors.phone_number);
        }
      } else {
        alert('서버와의 통신 중 문제가 발생했습니다. 다시 시도해 주세요.');
        console.error(error);
      }
    }
  };

  return (
    <main className="flex h-full w-full flex-col pt-14 pl-[200px]">
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
        >
          <h1>
            <img src={한상로고} alt="한상비서로고" />
          </h1>
          <h2 className="mb-4 text-lg font-bold">회원가입</h2>
          <p>
            이미 회원이신가요? &nbsp;
            <Link to="/sign-in" className="text-blue-500">
              로그인 하기
            </Link>
          </p>
          <input
            placeholder="닉네임"
            type="text"
            {...register('nickname')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.nickname && <p className="text-xs text-red-500">{errors.nickname.message}</p>}
          <input
            placeholder="이메일"
            type="email"
            {...register('email')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

          <input
            placeholder="비밀번호"
            type="password"
            {...register('password1')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.password1 && <p className="text-xs text-red-500">{errors.password1.message}</p>}

          <input
            placeholder="비밀번호 확인"
            type="password"
            {...register('password2')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.password2 && <p className="text-xs text-red-500">{errors.password2.message}</p>}

          <input
            placeholder="전화번호"
            type="tel"
            {...register('phone_number')}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.phone_number && (
            <p className="text-xs text-red-500">{errors.phone_number.message}</p>
          )}

          <Button type="submit">회원가입</Button>
          <hr />
          <p className="text-center">sns 간편로그인</p>
          <div className="flex justify-center gap-20">
            <h1 onClick={goNaverSignUp}>
              <img src={네이버} alt="네이버로그인" className="h-15 w-15" />
            </h1>
            <h1 onClick={() => goGoogleSignUp()}>
              <img src={구글} alt="구글로그인" className="h-15 w-15" />
            </h1>
          </div>
        </form>
        <Modal />
      </div>
    </main>
  );
};

export default SignUp;
