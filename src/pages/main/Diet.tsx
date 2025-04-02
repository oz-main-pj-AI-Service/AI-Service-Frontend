import { DietFormInput } from '@/types/ai';
import { exercise_frequency, goal } from '@/constants/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { RawAxiosRequestHeaders } from 'axios';
import { useDietQuery } from '@/hooks/useAiQuery';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatStreamText } from '@/lib/utils';
import RadioboxGroup from '@/components/main/RadioboxGroup';
import { useRef } from 'react';
import { useEffect } from 'react';
// import { loginApiTemp } from '@/api/loginApiTemp';

export default function Diet() {
  // const dietMutation = useDietQuery();

  // isStreaming, error 받아와서 로딩 에러 처리 하기
  const { startStream, finalRecipe, textStream } = useDietQuery();

  const form = useForm<DietFormInput>({
    defaultValues: {
      weight: 0,
      goal: [],
      exercise_frequency: [],
      algergies: '',
      disliked_foods: '',
    },
    // 유효성 검사
    // resolver: zodResolver(dietFormSchema),
  });

  const onSubmit: SubmitHandler<DietFormInput> = (data) => {
    console.log(data);

    // // 나중에 로그인 구현 기능 끝나면 정리
    // const requestHeader: RawAxiosRequestHeaders = {
    //   Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
    //   'Content-Type': 'application/json',
    // };
    const requestBody: DietFormInput = {
      weight: data.weight,
      goal: data.goal,
      exercise_frequency: data.exercise_frequency,
      algergies: data.algergies,
      disliked_foods: data.disliked_foods,
    };

    // dietMutation.mutate({ requestBody });
    startStream(requestBody);
  };

  console.log(finalRecipe);

  const resultsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if ((textStream || finalRecipe) && resultsSectionRef.current) {
      resultsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [textStream, finalRecipe]);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6">
          <h2 className="text-center text-2xl font-bold">조건 넣고 식단 추천받기</h2>

          {/* 식단 추천 결과 */}
          <section className="mx-4 min-h-32 grow rounded-lg border p-4" ref={resultsSectionRef}>
            <h3 className="text-lg font-bold">결과:</h3>
            <div className="border-b pb-4">
              <pre className="whitespace-pre-wrap">{formatStreamText(textStream)}</pre>
            </div>
            {finalRecipe && (
              <>
                <div className="border-b pb-2">
                  <p>추천 이유: {finalRecipe.recommendation_reason}</p>
                  <p>하루 칼로리 목표: {finalRecipe.daily_calorie_target} kcal</p>
                  <p>하루 단백질 목표: {finalRecipe.protein_target} g</p>
                </div>
                {finalRecipe.meals.map((item) => (
                  <div key={item.food_name} className="border-b pb-2">
                    <div className="text-lg font-bold">{item.food_name}</div>
                    <div>{item.food_type}</div>
                    <div>{item.description}</div>
                    <div>칼로리: {item.nutritional_info.calories} kcal</div>
                    <div>탄수화물: {item.nutritional_info.carbs} g</div>
                    <div>지방: {item.nutritional_info.fat} g</div>
                    <div>단백질: {item.nutritional_info.protein} g</div>
                  </div>
                ))}
              </>
            )}
          </section>

          <section className="mx-4 grow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* 몸무게 */}
                <FormItem>
                  <FormLabel className="text-base">몸무게</FormLabel>
                  <Input type="number" {...form.register('weight')} className="h-11" />
                </FormItem>

                {/* 목표 */}
                <RadioboxGroup form={form} options={goal} optionName="goal" label="목표" />

                {/* 운동 빈도 */}
                <RadioboxGroup
                  form={form}
                  options={exercise_frequency}
                  optionName="exercise_frequency"
                  label="운동 빈도"
                />

                {/* 알레르기 */}
                <FormItem>
                  <FormLabel className="text-base">알레르기</FormLabel>
                  <Input type="text" {...form.register('algergies')} className="h-11" />
                </FormItem>

                {/* 싫어하는 음식 */}
                <FormItem>
                  <FormLabel className="text-base">싫어하는 음식</FormLabel>
                  <Input type="text" {...form.register('disliked_foods')} className="h-11" />
                </FormItem>

                <Button type="submit">추천받기</Button>
              </form>
            </Form>
          </section>
        </div>
      </div>
    </main>
  );
}

// 목표
// <FormField
//   control={form.control}
//   name="goal"
//   render={() => (
//     <FormItem>
//       <div>
//         <FormLabel className="text-base">목표</FormLabel>
//         {/* <FormDescription>설명</FormDescription> */}
//       </div>
//       <div className="flex gap-4">
//         {goal.map((goal) => (
//           <FormField
//             key={goal.id}
//             control={form.control}
//             name="goal"
//             render={({ field }) => {
//               // console.log(field);
//               return (
//                 <FormItem className="flex flex-row items-start space-y-0 space-x-3">
//                   <FormLabel className="text-sm">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value?.includes(goal.id)}
//                         onCheckedChange={(checked) => {
//                           return checked
//                             ? field.onChange([...field.value, goal.id])
//                             : field.onChange(field.value?.filter((value) => value !== goal.id));
//                         }}
//                       />
//                     </FormControl>
//                     {goal.label}
//                   </FormLabel>
//                 </FormItem>
//               );
//             }}
//           />
//         ))}
//       </div>
//       {/* <FormMessage /> */}
//     </FormItem>
//   )}
// />;
