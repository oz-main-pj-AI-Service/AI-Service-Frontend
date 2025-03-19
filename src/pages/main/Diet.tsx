import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { DietFormInput } from '@/types/ai';

export default function Menu() {
  const { register, handleSubmit } = useForm<DietFormInput>({
    defaultValues: {
      weight: 0,
      goal: '',
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input type="number" {...register('weight')} />
              <Input type="text" {...register('goal')} />
              <Input type="text" {...register('frequency')} />
              <Input type="text" {...register('algergy')} />
              <Input type="text" {...register('dislike')} />
              <Input type="date" {...register('startDate')} />
              <Input type="date" {...register('endDate')} />
              <Button type="submit">추천받기</Button>
            </form>
          </section>
          <section className="mx-4 w-1/2 grow border">결과</section>
        </div>
      </div>
    </main>
  );
}
