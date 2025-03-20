import { loginApiTemp } from '@/api/loginApiTemp';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRecipeQuery } from '@/hooks/useAiQuery';
import { RecipeFormInput } from '@/types/ai';
import { UserToken } from '@/types/user';
import { RawAxiosRequestHeaders } from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Recipe() {
  const [userToken, setUserToken] = useState<UserToken | null>(null);

  const recipeMutation = useRecipeQuery();

  const form = useForm<RecipeFormInput>({
    defaultValues: {
      ingredients: [],
      serving_size: 1,
      cooking_time: 30,
      difficulty: 'easy',
    },
  });
  console.log(form);
  // 유효성 검사

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    // 나중에 로그인 구현 기능 끝나면 정리
    const requestHeader: RawAxiosRequestHeaders = {
      Authorization: `Bearer ${userToken?.access_token}`,
      'Content-Type': 'application/json',
    };

    const requestBody: RecipeFormInput = {
      ingredients: data.ingredients,
      serving_size: data.serving_size,
      cooking_time: data.cooking_time,
      difficulty: data.difficulty,
    };

    recipeMutation.mutate({ requestBody, headers: requestHeader });
  };

  return (
    <main className="flex h-full items-center justify-center pt-14 pl-[200px]">
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <h2 className="text-2xl font-bold">당신의 한끼를 책임집니다!</h2>
        <h3 className="text-sm text-zinc-500">
          가지고 있는 식재료를 입력하고 지금 요리할 수 있는 레시피를 알아보세요
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 px-4">
            {/* 재료 입력 (텍스트) */}
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <FormItem className="flex w-full">
                      {/* <FormLabel>재료</FormLabel> */}
                      <FormControl className="flex">
                        <Input
                          placeholder="재료를 입력하시면, AI가 레시피를 추천해드려요"
                          className="grow"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>This is your public display name.</FormDescription> */}
                      {/* <FormMessage /> */}
                    </FormItem>
                  );
                }}
              />
              <Button type="submit">검색</Button>
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
                      <Input placeholder="- 인분" {...field} />
                    </FormControl>
                    <FormDescription className="absolute top-8 right-2">인분</FormDescription>
                    {/* <FormMessage /> */}
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
                      <Input placeholder="- 분" {...field} />
                    </FormControl>
                    <FormDescription className="absolute top-8 right-2">분</FormDescription>
                    {/* <FormMessage /> */}
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
                      <SelectContent>
                        <SelectItem value="easy">쉬움</SelectItem>
                        <SelectItem value="medium">보통</SelectItem>
                        <SelectItem value="hard">어려움</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>난이도</FormDescription> */}
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
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
      </div>
    </main>
  );
}
