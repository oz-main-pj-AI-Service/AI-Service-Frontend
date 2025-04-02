import { MenuFormInput, MenuFormRequest } from '@/types/ai';
import { cuisine_type, dietary_type, food_base, taste } from '@/constants/ai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMenuQuery } from '@/hooks/useAiQuery';
import CheckboxGroup from '@/components/main/CheckboxGroup';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatStreamText } from '@/lib/utils';
import RadioboxGroup from '@/components/main/RadioboxGroup';
import { useEffect } from 'react';
import { useRef } from 'react';
import MenuResultComponent from '@/components/main/MenuResultComponent';

export default function Menu() {
  // const menuMutation = useMenuQuery();

  // isStreaming, error 받아와서 로딩 에러 처리 하기
  const { mutation, startStream, finalRecipe, textStream, isStreaming } = useMenuQuery();

  const form = useForm<MenuFormInput>({
    defaultValues: {
      cuisine_type: [],
      food_base: [],
      taste: [],
      dietary_type: '',
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
      dietary_type: data.dietary_type,
      last_meal: data.last_meal,
    };

    startStream(requestBody);
    console.log(mutation);
    // console.log(menuMutation.data?.recommendations.recommendations);
  };

  console.log(finalRecipe);
  // const menu = menuMutation.data?.recommendation.recommendation;

  const streamDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((textStream || finalRecipe) && streamDivRef.current) {
      streamDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [textStream, finalRecipe]);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6">
          <h2 className="text-center text-xl font-bold md:text-2xl">
            선택한 조건에 따른 메뉴를 추천 받아보세요
          </h2>

          {/* 메뉴 추천 결과 */}
          <div className="mx-4 flex grow flex-col gap-6 rounded-lg border p-4">
            {/* <h3 className="text-lg font-bold">결과:</h3> */}

            {/* 실시간 스트리밍 텍스트 */}
            <section className="flex flex-col rounded-lg border p-4">
              {!textStream && <p className="text-center text-sm text-zinc-500">AI 응답...</p>}
              <div className="py-2">
                <pre className="font-extralight whitespace-pre-wrap text-zinc-600 dark:text-zinc-200">
                  {formatStreamText(textStream)}
                </pre>
              </div>
            </section>

            {/* 최종 메뉴 */}
            <section className="flex flex-col rounded-lg border p-4" ref={streamDivRef}>
              {(!textStream || isStreaming) && (
                <p className="text-center text-sm text-zinc-500">메뉴 추천 결과</p>
              )}
              {finalRecipe && <MenuResultComponent menu={finalRecipe.recommendation} />}
            </section>
          </div>

          <section className="mx-4 grow">
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

                <RadioboxGroup
                  form={form}
                  options={dietary_type}
                  optionName="dietary_type"
                  label="식이 유형"
                />

                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base">마지막 식사</FormLabel>
                  <Input type="text" {...form.register('last_meal')} className="h-11" />
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
