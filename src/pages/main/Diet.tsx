import { FormField, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Form, FormControl } from '@/components/ui/form';
import { DietFormInput } from '@/types/ai';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const goals = [
  {
    id: 'lose',
    label: '다이어트',
  },
  {
    id: 'gain',
    label: '벌크업',
  },
  {
    id: 'maintain',
    label: '유지',
  },
] as const;

export default function Menu() {
  const form = useForm<DietFormInput>({
    defaultValues: {
      weight: 0,
      goal: [],
      frequency: '',
      algergy: '',
      dislike: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit: SubmitHandler<DietFormInput> = (data) => {
    console.log(data);
  };

  return (
    <main className="flex h-full items-center justify-center pt-14 pl-[200px]">
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <h2 className="text-center text-2xl font-bold">조건 넣고 메뉴 추천받기</h2>
        <div className="flex w-full">
          <section className="mx-4 w-1/2 grow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* 몸무게 */}
                <FormItem>
                  <FormLabel className="text-base">몸무게</FormLabel>
                  <Input type="number" {...form.register('weight')} />
                </FormItem>

                {/* 목표 */}
                <FormField
                  control={form.control}
                  name="goal"
                  render={() => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-base">목표</FormLabel>
                        {/* <FormDescription>설명</FormDescription> */}
                      </div>
                      <div className="flex gap-4">
                        {goals.map((goal) => (
                          <FormField
                            key={goal.id}
                            control={form.control}
                            name="goal"
                            render={({ field }) => {
                              // console.log(field);
                              return (
                                <FormItem
                                  key={goal.id}
                                  className="flex flex-row items-start space-y-0 space-x-3"
                                >
                                  <FormLabel className="text-sm">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(goal.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, goal.id])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== goal.id),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    {goal.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />

                {/* 운동 빈도 */}
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">운동 빈도</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-y-1"
                        >
                          <FormItem className="flex items-center space-y-0 space-x-3">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">주 1회</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-y-0 space-x-3">
                            <FormControl>
                              <RadioGroupItem value="2,3" />
                            </FormControl>
                            <FormLabel className="font-normal">주 2, 3회</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-y-0 space-x-3">
                            <FormControl>
                              <RadioGroupItem value="4" />
                            </FormControl>
                            <FormLabel className="font-normal">주 4회 이상</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-y-0 space-x-3">
                            <FormControl>
                              <RadioGroupItem value="none" />
                            </FormControl>
                            <FormLabel className="font-normal">운동 안함</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />

                {/* 알레르기 */}
                <FormItem>
                  <FormLabel className="text-base">알레르기</FormLabel>
                  <Input type="text" {...form.register('algergy')} />
                </FormItem>

                {/* 싫어하는 음식 */}
                <FormItem>
                  <FormLabel className="text-base">싫어하는 음식</FormLabel>
                  <Input type="text" {...form.register('dislike')} />
                </FormItem>

                {/* 날짜 */}
                <FormItem>
                  <FormLabel className="text-base">날짜</FormLabel>
                  <Input type="date" {...form.register('startDate')} />
                  <Input type="date" {...form.register('endDate')} />
                </FormItem>

                <Button type="submit">추천받기</Button>
              </form>
            </Form>
          </section>

          {/* 식단 추천 결과 */}
          <section className="mx-4 w-1/2 grow border p-4">결과</section>
        </div>
      </div>
    </main>
  );
}
