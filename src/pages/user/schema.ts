import { z } from 'zod';

export const signUpSchema = z
  .object({
    nickname: z.string().min(2, { message: '닉네임은 최소 2자 이상입니다' }),
    email: z.string().email({ message: '올바른 이메일 형식을 적어주세요' }),
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
    phone_number: z.string().regex(/^01[0-9]{8,9}$/, {
      message: '올바른 휴대전화 번호 형식을 입력해 주세요 (예: 01012345678)',
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['password2'],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 적어주세요' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상입니다' })
    .regex(/^(?=.*[!@#$%^&*()_+=-{};:'<>,./?]).*$/, {
      message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다',
    }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
