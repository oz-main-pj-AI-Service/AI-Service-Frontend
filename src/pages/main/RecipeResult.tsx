import { loginApiTemp } from '@/api/loginApiTemp';
import { useRecipeQuery } from '@/hooks/useAiQuery';
import { RecipeFormInput } from '@/types/ai';
import { RawAxiosRequestHeaders } from 'axios';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

export default function RecipeResult() {
  const [searchParams] = useSearchParams();
  const recipeMutation = useRecipeQuery();

  useEffect(() => {
    if (!searchParams.get('q')) return;

    const query = searchParams.get('q') as string;
    const recipe = JSON.parse(decodeURIComponent(query));

    // 나중에 로그인 구현 기능 끝나면 정리
    const requestHeader: RawAxiosRequestHeaders = {
      Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
      'Content-Type': 'application/json',
    };

    const requestBody: RecipeFormInput = {
      ingredients: recipe.ingredients,
      serving_size: recipe.serving_size,
      cooking_time: recipe.cooking_time,
      difficulty: recipe.difficulty,
    };

    recipeMutation.mutate({ requestBody, headers: requestHeader });
  }, [searchParams]);

  console.log(recipeMutation);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <h2 className="my-4 text-center text-2xl font-bold">검색 결과</h2>
          <section className="w-full border p-4">
            <p>검색한 조건 (쿼리스트링): {searchParams.get('q')}</p>
          </section>
          <section className="mt-4 min-h-[500px] w-full border p-4">
            <p>api 응답 결과</p>
            <p>{recipeMutation.data?.recipe.name}</p>
            <p>{recipeMutation.data?.recipe.description}</p>
            <p>{recipeMutation.data?.recipe.cuisine_type}</p>
            <p>{recipeMutation.data?.recipe.meal_type}</p>
            <p>{recipeMutation.data?.recipe.preparation_time}</p>
            <p>{recipeMutation.data?.recipe.cooking_time}</p>
            <p>{recipeMutation.data?.recipe.serving_size}</p>
            <p>{recipeMutation.data?.recipe.difficulty}</p>
            {recipeMutation.data?.recipe.ingredients.map((ingredient) => (
              <p key={ingredient.name}>
                {ingredient.name}: {ingredient.amount}
              </p>
            ))}
            {recipeMutation.data?.recipe.instructions.map((instruction) => (
              <p key={instruction.step}>
                {instruction.step}. {instruction.description}
              </p>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
