// import { loginApiTemp } from '@/api/loginApiTemp';
// import { useRecipeQuery, useRecipeStream } from '@/hooks/useAiQuery';
import { RecipeFormInput } from '@/types/ai';
// import { RawAxiosRequestHeaders } from 'axios';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
// import { API_URL } from '@/constants/url';
// import { useRecipeStream } from '@/hooks/tries';
// import { useStreaming2 } from '@/hooks/useStreamingTest';
import { useOnlyFetch } from '@/hooks/onlyfetch';

export default function RecipeResult() {
  const [searchParams] = useSearchParams();
  // const recipeMutation = useRecipeQuery();

  // 받아지지만 한방에
  // const { streamingText, startStreaming } = useRecipeStream();

  // 이것도 한방에
  // const { streamedText, streamMutation } = useStreaming2();

  const { streamText, startStream } = useOnlyFetch();

  useEffect(() => {
    if (!searchParams.get('q')) return;

    const query = searchParams.get('q') as string;
    const userRequest = JSON.parse(decodeURIComponent(query));

    const requestBody: RecipeFormInput = {
      ingredients: userRequest.ingredients,
      serving_size: userRequest.serving_size,
      cooking_time: userRequest.cooking_time,
      difficulty: userRequest.difficulty,
    };

    // recipeMutation.mutation.mutate({
    //   requestBody,
    //   // headers: requestHeader
    // });

    // startStreaming(requestBody);
    // streamMutation.mutate(requestBody);
    startStream(requestBody);
  }, [searchParams]);

  console.log(streamText);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <h2 className="my-4 text-center text-2xl font-bold">검색 결과</h2>
          <section className="w-full border p-4">
            <p>검색한 조건 (쿼리스트링): {searchParams.get('q')}</p>
          </section>
          <section className="mt-4 min-h-[500px] w-full border p-4">
            {/* <p>api 응답 결과</p>
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
            <p>{recipeMutation.recipeStream}</p> */}
            <div>
              {/* 실시간 스트리밍 텍스트 */}
              {/* {isStreaming && (
                <div className="streaming-text">
                  <h3>생성 중...</h3>
                  <pre>{streamingText}</pre>
                </div>
              )} */}

              {/* 최종 레시피 */}
              {/* {finalRecipe && (
                <div className="final-recipe">
                  <h3>완성된 레시피</h3>
                  <h4>{finalRecipe.recipe.name}</h4>
                  <h5>재료:</h5>
                  <ul>
                    {finalRecipe.recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name}: {ingredient.amount}
                      </li>
                    ))}
                  </ul>
                  <h5>조리방법:</h5>
                  <ol>
                    {finalRecipe.recipe.instructions.map((instruction, index) => (
                      <li key={index}>
                        {instruction.step}. {instruction.description}
                      </li>
                    ))}
                  </ol>
                  <button onClick={reset}>새로 만들기</button>
                </div>
              )} */}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
