import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserTokenTemp } from '@/hooks/useUserTokenTemp';
import { MenuFormInput } from '@/types/ai';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Diet() {
  const { data: userToken } = useUserTokenTemp();
  console.log(userToken);

  const { register, handleSubmit } = useForm<MenuFormInput>({
    defaultValues: {
      category: [],
      type: [],
      taste: [],
      goal: [],
      lastMeal: '',
    },
  });

  const onSubmit: SubmitHandler<MenuFormInput> = (data) => {
    console.log(data);
    const requestBody = {
      request_type: 'food',
      request_data: {
        category: data.category,
        goal: data.goal,
        lastMeal: data.lastMeal,
        taste: data.taste,
        type: data.type,
      },
    };
    console.log(requestBody);
  };

  return (
    <main className="flex h-full items-center justify-center pt-14 pl-[200px]">
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <h2 className="text-center text-2xl font-bold">조건 넣고 식단 추천받기</h2>
        <div className="flex w-full">
          <section className="mx-4 w-1/2 grow">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="korean">
                  <input type="checkbox" id="korean" value="korean" {...register('category')} />
                  한식
                </Label>
                <Label htmlFor="japanese">
                  <input type="checkbox" id="japanese" value="japanese" {...register('category')} />
                  일식
                </Label>
                <Label htmlFor="chinese">
                  <input type="checkbox" id="chinese" value="chinese" {...register('category')} />
                  중식
                </Label>
                <Label htmlFor="western">
                  <input type="checkbox" id="western" value="western" {...register('category')} />
                  양식
                </Label>
                <Label htmlFor="asian">
                  <input type="checkbox" id="asian" value="asian" {...register('category')} />
                  아시안
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="rice">
                  <input type="checkbox" id="rice" value="rice" {...register('type')} />밥
                </Label>
                <Label htmlFor="noodle">
                  <input type="checkbox" id="noodle" value="noodle" {...register('type')} />면
                </Label>
                <Label htmlFor="bread">
                  <input type="checkbox" id="bread" value="bread" {...register('type')} />빵
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="sweet">
                  <input type="checkbox" id="sweet" value="sweet" {...register('taste')} />단 맛
                </Label>
                <Label htmlFor="savory">
                  <input type="checkbox" id="savory" value="savory" {...register('taste')} />
                  고소한 맛
                </Label>
                <Label htmlFor="spicy">
                  <input type="checkbox" id="spicy" value="spicy" {...register('taste')} />
                  매운 맛
                </Label>
                <Label htmlFor="light">
                  <input type="checkbox" id="light" value="light" {...register('taste')} />
                  상큼한 맛
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="stimulating">
                  <input
                    type="checkbox"
                    id="stimulating"
                    value="stimulating"
                    {...register('goal')}
                  />
                  자극적
                </Label>
                <Label htmlFor="healthy">
                  <input type="checkbox" id="healthy" value="healthy" {...register('goal')} />
                  건강한
                </Label>
              </div>

              <Input type="text" {...register('lastMeal')} />
              <Button type="submit">추천받기</Button>
            </form>
          </section>
          <section className="mx-4 w-1/2 grow border p-4">결과</section>
        </div>
      </div>
    </main>
  );
}
