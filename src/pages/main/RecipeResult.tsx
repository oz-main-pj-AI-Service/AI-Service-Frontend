import { RecipeFormInput } from '@/types/ai';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { useRecipeStream } from '@/hooks/useAiQuery';
import { formatText } from '@/lib/utils';
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
  const { textStream, finalRecipe, startStream } = useRecipeStream();

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
  console.log(finalRecipe);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <h2 className="my-4 text-center text-2xl font-bold">검색 결과</h2>
          <section className="w-full border p-4">
            <p>검색한 조건 (쿼리스트링): {searchParams.get('q')}</p>
          </section>
          <section className="mt-4 min-h-[500px] w-full border p-4">
            {/* 실시간 스트리밍 텍스트 */}
            <div className="border-b py-4">
              <h3>생성 중...</h3>
              {/* <p>{textStream}</p> */}
              <pre className="whitespace-pre-wrap">{formatText(textStream)}</pre>
            </div>

            {/* 최종 레시피 */}
            <div>
              <h3>완성된 레시피</h3>
              <h4>{finalRecipe?.name}</h4>
              <h5>재료:</h5>
              <ul>
                {finalRecipe?.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name}: {ingredient.amount}
                  </li>
                ))}
              </ul>
              <h5>조리방법:</h5>
              <ol>
                {finalRecipe?.instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction.step}. {instruction.description}
                  </li>
                ))}
              </ol>
              {/* <button onClick={reset}>새로 만들기</button> */}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
