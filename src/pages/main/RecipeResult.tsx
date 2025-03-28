import { RecipeFormInput } from '@/types/ai';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { useRecipeStream } from '@/hooks/tries';
// import { useStreaming2 } from '@/hooks/useStreamingTest';
// import { useOnlyFetch } from '@/hooks/onlyfetch';
// import { useRecipeQuery, useStreaming1 } from '@/hooks/useAiQuery';

export default function RecipeResult() {
  const [searchParams] = useSearchParams();

  // fetch만 (JSON 깨짐, SSE) - 상태, 로딩
  // const { textStream, startStream } = useOnlyFetch();

  // 후보 1 (JSON 깨짐, SSE) - 액시오스, 뮤테이션, 상태
  // const { textStream, streamMutation } = useStreaming2();

  // 후보 2 (JSON 제대로) - 액시오스, 뮤테이션, 상태, 어브토컨트롤러, 로딩, 에러 (풀)
  const { textStream, startStream } = useRecipeStream();

  // 후보 3 (JSON 깨짐, SSE) - 액시오스, 뮤테이션, 상태
  // const { textStream, streamMutation } = useStreaming1();

  // 원본 (청크에 객체 들어오다가 Final에서 JSON 깨짐, data: 로 구분하지 않음. 텍스트 다듬지 않고 그대로 들어옴)
  // - 액시오스, 뮤테이션, 상태 (aiApi, 간단)
  // const { recipeStream, mutation } = useRecipeQuery();

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

    // 후보 1, 3
    // streamMutation.mutate(requestBody);

    // onlyFetch, 후보 2
    startStream(requestBody);

    // 원래꺼
    // mutation.mutate({ requestBody });
  }, [searchParams]);

  // console.log(recipeStream);
  console.log(textStream);

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
