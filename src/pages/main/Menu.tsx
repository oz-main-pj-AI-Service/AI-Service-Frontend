import { MenuFormInput, MenuFormRequest } from '@/types/ai';
import { cuisine_type, dietary_type, food_base, taste } from '@/constants/ai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMenuQuery } from '@/hooks/useAiQuery';
import CheckboxGroup from '@/components/CheckboxGroup';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatStreamText } from '@/lib/utils';

export default function Menu() {
  // const menuMutation = useMenuQuery();

  // isStreaming, error 받아와서 로딩 에러 처리 하기
  const { mutation, startStream, finalRecipe, textStream } = useMenuQuery();

  const form = useForm<MenuFormInput>({
    defaultValues: {
      cuisine_type: [],
      food_base: [],
      taste: [],
      dietary_type: [],
      last_meal: '',
    },
    // 유효성 검사
    // resolver: zodResolver(menuFormSchema),
  });

  const onSubmit: SubmitHandler<MenuFormInput> = (data) => {
    console.log(data);

    const requestBody: MenuFormRequest = {
      cuisine_type: data.cuisine_type.join(','),
      food_base: data.food_base.join(','),
      taste: data.taste.join(','),
      dietary_type: data.dietary_type.join(','),
      last_meal: data.last_meal,
    };

    startStream(requestBody);
    console.log(mutation);
    // console.log(menuMutation.data?.recommendations.recommendations);
  };

  console.log(finalRecipe);
  // const menu = menuMutation.data?.recommendation.recommendation;

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <h2 className="text-center text-2xl font-bold">조건 넣고 메뉴 추천받기</h2>

          <div className="flex w-full">
            <section className="mx-4 w-1/2 grow">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <CheckboxGroup
                    form={form}
                    options={cuisine_type}
                    optionName="cuisine_type"
                    label="나라별 음식"
                  />

                  <CheckboxGroup
                    form={form}
                    options={food_base}
                    optionName="food_base"
                    label="음식 기반"
                  />

                  <CheckboxGroup form={form} options={taste} optionName="taste" label="맛" />

                  <CheckboxGroup
                    form={form}
                    options={dietary_type}
                    optionName="dietary_type"
                    label="식이 유형"
                  />

                  <FormItem>
                    <FormLabel className="flex items-center gap-2">마지막 식사</FormLabel>
                    <Input type="text" {...form.register('last_meal')} />
                  </FormItem>

                  <Button type="submit">추천받기</Button>
                </form>
              </Form>
            </section>

            {/* 메뉴 추천 결과 */}
            <section className="mx-4 w-1/2 grow border p-4">
              <h3 className="text-lg font-bold">결과:</h3>
              <div className="border-b pb-4">
                <pre className="whitespace-pre-wrap">{formatStreamText(textStream)}</pre>
              </div>
              {finalRecipe && (
                <div className="border-b pb-4">
                  <div className="text-lg font-bold">{finalRecipe.recommendation.food_name}</div>
                  <div>{finalRecipe.recommendation.food_type}</div>
                  <div>{finalRecipe.recommendation.description}</div>
                  <div>{finalRecipe.recommendation.recommendation_reason}</div>
                  <div>칼로리: {finalRecipe.recommendation.nutritional_info.calories} kcal</div>
                  <div>탄수화물: {finalRecipe.recommendation.nutritional_info.carbs} g</div>
                  <div>지방: {finalRecipe.recommendation.nutritional_info.fat} g</div>
                  <div>단백질: {finalRecipe.recommendation.nutritional_info.protein} g</div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
