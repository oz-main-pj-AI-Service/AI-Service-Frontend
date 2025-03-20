import { loginApiTemp } from '@/api/loginApiTemp';
import CheckboxGroup from '@/components/main/CheckboxGroup';
import Checkboxes from '@/components/main/CheckboxGroup';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cuisine_type, dietary_type, food_base, taste } from '@/constants/ai';
import { useMenuQuery } from '@/hooks/useAiQuery';
import { MenuFormInput } from '@/types/ai';
import { UserToken } from '@/types/user';
import { RawAxiosRequestHeaders } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Menu() {
  const [userToken, setUserToken] = useState<UserToken | null>(null);

  const menuMutation = useMenuQuery();

  const form = useForm<MenuFormInput>({
    defaultValues: {
      cuisine_type: [],
      food_base: [],
      taste: [],
      dietary_type: [],
      last_meal: '',
    },
  });

  const onSubmit: SubmitHandler<MenuFormInput> = (data) => {
    console.log(data);

    // 나중에 로그인 구현 기능 끝나면 정리
    const requestHeader: RawAxiosRequestHeaders = {
      Authorization: `Bearer ${userToken?.access_token}`,
      'Content-Type': 'application/json',
    };
    const requestBody: MenuFormInput = {
      cuisine_type: data.cuisine_type,
      food_base: data.food_base,
      taste: data.taste,
      dietary_type: data.dietary_type,
      last_meal: data.last_meal,
    };

    menuMutation.mutate({ requestBody, headers: requestHeader });
    console.log(menuMutation);
    console.log(menuMutation.data?.recommendations.recommendations);
  };

  return (
    <main className="flex h-full items-center justify-center pt-14 pl-[200px]">
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <h2 className="text-center text-2xl font-bold">조건 넣고 메뉴 추천받기</h2>

        <Button
          onClick={() =>
            loginApiTemp.logIn().then((res) => {
              setUserToken(res);
              console.log(userToken);
            })
          }
        >
          로그인
        </Button>

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

                <Input type="text" {...form.register('last_meal')} />

                <Button type="submit">추천받기</Button>
              </form>
            </Form>
          </section>

          {/* 메뉴 추천 결과 */}
          <section className="mx-4 w-1/2 grow border p-4">
            <h3 className="text-lg font-bold">결과:</h3>
            {menuMutation.data
              ? menuMutation.data.recommendations.recommendations.map((item) => (
                  <div key={item.food_name} className="border-b pb-4">
                    <div className="text-lg font-bold">{item.food_name}</div>
                    <div>{item.food_type}</div>
                    <div>{item.description}</div>
                    <div>{item.reccomendation_reason}</div>
                    <div>칼로리: {item.nutritional_info.calories} kcal</div>
                    <div>탄수화물: {item.nutritional_info.carbs} g</div>
                    <div>지방: {item.nutritional_info.fat} g</div>
                    <div>단백질: {item.nutritional_info.protein} g</div>
                  </div>
                ))
              : '추천 식단이 없습니다.'}
          </section>
        </div>
      </div>
    </main>
  );
}

// {
//   menuMutation.data?.response_data;
// }
