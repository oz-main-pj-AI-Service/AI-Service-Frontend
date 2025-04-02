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
import DietResultComponent from '@/components/main/DietResultComponent';
// import { loginApiTemp } from '@/api/loginApiTemp';

export default function Diet() {
  // const dietMutation = useDietQuery();

  // isStreaming, error 받아와서 로딩 에러 처리 하기
  const { startStream, finalRecipe, textStream, isStreaming } = useDietQuery();

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

  const streamDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((textStream || finalRecipe) && streamDivRef.current) {
      streamDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [textStream, finalRecipe]);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6">
          <h2 className="text-center text-2xl font-bold">
            선택한 조건에 따른 식단을 추천 받아보세요
          </h2>

          {/* 식단 추천 결과 */}
          <div className="mx-4 flex grow flex-col gap-6 rounded-lg border p-4">
            {/* <h3 className="text-lg font-bold">결과:</h3> */}

            {/* 실시간 스트리밍 텍스트 */}
            <section className="flex flex-col rounded-lg border p-4">
              {!textStream && <p className="text-center text-sm text-zinc-500">AI 응답...</p>}
              <div className="py-2">
                <pre className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-200">
                  {formatStreamText(textStream)}
                </pre>
              </div>
            </section>

            {/* 최종 식단 */}
            <section className="flex flex-col rounded-lg border p-4" ref={streamDivRef}>
              {(!textStream || isStreaming) && (
                <p className="text-center text-sm text-zinc-500">식단 추천 결과</p>
              )}
              {finalRecipe && <DietResultComponent diet={finalRecipe} />}
            </section>
          </div>

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
