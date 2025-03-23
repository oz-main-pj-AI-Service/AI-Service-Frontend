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
  })
  .refine((data) => data.password1 === data.password2, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['password2'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
