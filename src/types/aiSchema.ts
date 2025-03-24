import { z } from 'zod';

export const recipeFormSchema = z.object({
  ingredients: z.string().min(1, { message: '재료를 입력해주세요.' }),
  serving_size: z
    .number({ message: '양 (*인분): 숫자를 입력해주세요' })
    .int({ message: '양 (*인분): 자연수를 입력해주세요' })
    .positive({ message: '양 (*인분): 자연수를 입력해주세요' })
    .min(1, { message: '양 (*인분): 최소 1인분 이상 입력해주세요' }),
  cooking_time: z
    .number({ message: '시간 (*분)을 입력해주세요' })
    .positive({ message: '시간 (*분)을 입력해주세요' })
    .min(1, { message: '시간 (*분)을 입력해주세요' }),
  difficulty: z.enum(['쉬움', '보통', '어려움'], {
    message: '난이도를 선택해주세요',
  }),
});
