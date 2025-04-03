import { useNavigate } from 'react-router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeFormSchema } from '@/types/aiSchema';
import { RecipeFormInput } from '@/types/ai';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Recipe() {
  const navigate = useNavigate();

  const form = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      ingredients: '',
      serving_size: 1,
      cooking_time: 30,
      difficulty: '쉬움',
    },
    mode: 'onSubmit',
  });
  console.log(form);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // 입력받은 재료를 배열로 변환
    data.ingredients = data.ingredients
      .split(/[,/.]/)
      .map((ingredient: string) => ingredient.trim())
      .filter((ingredient: string) => ingredient !== '');
    console.log(data);

    // 결과 페이지로 유저가 입력한거 쿼리파라 미터에 담아서 보내주기
    navigate(`/recipe/search?q=${encodeURIComponent(JSON.stringify(data))}`);
    // navigate(`/recipe/search?q=${JSON.stringify(data)}`);
  };

  return (
    <main className="flex h-full items-center justify-center max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <h2 className="text-2xl font-bold">당신의 한끼를 책임집니다!</h2>
        <h3 className="text-xs text-zinc-500 md:text-sm">
          가지고 있는 식재료를 입력하고, 지금 요리할 수 있는 레시피를 알아보세요
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-12 px-4">
            {/* 재료 입력 (텍스트) */}
            <div className="flex w-full items-center gap-2">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem className="relative flex w-full">
                    <FormControl className="flex">
                      <Input
                        placeholder="재료를 쉼표나 미침표(, .)로 구분해서 입력해주세요"
                        className="h-11 grow text-xs md:text-sm lg:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute top-11 left-3.5" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-10.5">
                검색
              </Button>
            </div>

            {/* 양, 시간, 난이도 */}
            <div className="flex w-full justify-center gap-2">
              <FormField
                control={form.control}
                name="serving_size"
                render={({ field }) => (
                  <FormItem className="relative w-1/3">
                    <FormLabel>양</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="- 인분"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="absolute top-8 right-2">인분</FormDescription>
                    <FormMessage className="absolute top-16 left-3.5" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cooking_time"
                render={({ field }) => (
                  <FormItem className="relative w-1/3">
                    <FormLabel>시간</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="- 분"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="absolute top-8 right-2">분</FormDescription>
                    <FormMessage className="absolute top-16 left-3.5" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>난이도</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="난이도를 선택하세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="[--item-height:44px] [&_[data-slot=select-item]]:h-[var(--item-height)]">
                        <SelectItem value="쉬움">쉬움</SelectItem>
                        <SelectItem value="보통">보통</SelectItem>
                        <SelectItem value="어려움">어려움</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
