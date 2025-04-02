import { RecipeFormInput } from '@/types/ai';
import { useSearchParams } from 'react-router';
import { useEffect, useRef } from 'react';
import { useRecipeQuery } from '@/hooks/useAiQuery';
import { formatStreamText } from '@/lib/utils';
import RecipeResultComponent from '@/components/main/RecipeResultComponent';
// import { useStreaming2 } from '@/hooks/useStreamingTest';
// import { useOnlyFetch } from '@/hooks/onlyfetch';
// import { useRecipeQuery, useStreaming1 } from '@/hooks/useAiQuery';

export default function RecipeResult() {
  const [searchParams] = useSearchParams();
  const userRequest = JSON.parse(decodeURIComponent(searchParams.get('q') as string));

  // fetch만 (JSON 깨짐, SSE) - 상태, 로딩
  // const { textStream, startStream } = useOnlyFetch();

  // 후보 1 (JSON 깨짐, SSE) - 액시오스, 뮤테이션, 상태
  // const { textStream, streamMutation } = useStreaming2();

  // 후보 2 (JSON 제대로) - 액시오스, 뮤테이션, 상태, 어브토컨트롤러, 로딩, 에러 (풀)
  // const { textStream, finalRecipe, startStream } = useRecipeQuery();

  // 후보 3 (JSON 깨짐, SSE) - 액시오스, 뮤테이션, 상태
  // const { textStream, streamMutation } = useStreaming1();

  // 원본 (청크에 객체 들어오다가 Final에서 JSON 깨짐, data: 로 구분하지 않음. 텍스트 다듬지 않고 그대로 들어옴)
  // - 액시오스, 뮤테이션, 상태 (aiApi, 간단)
  // const { recipeStream, mutation } = useRecipeQuery();

  // isStreaming, error 받아와서 로딩 에러 처리 하기
  const { startStream, finalRecipe, textStream } = useRecipeQuery();

  useEffect(() => {
    if (!searchParams.get('q')) return;

    // 유즈이펙트 바깥으로 뺌 (작동하나 확인 후 삭제)
    // const query = searchParams.get('q') as string;
    // const userRequest = JSON.parse(decodeURIComponent(query));

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
    // 이거 주석 해제 하기

    // 원래꺼
    // mutation.mutate({ requestBody });
  }, [searchParams]);

  // console.log(recipeStream);
  console.log(textStream);
  console.log(finalRecipe);

  const streamDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((textStream || finalRecipe) && streamDivRef.current) {
      streamDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [textStream, finalRecipe]);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
          <h2 className="my-4 text-center text-2xl font-bold">검색 결과</h2>

          {/* 요청 내용 */}
          <section className="flex flex-col gap-2 border p-4">
            <h4 className="pb-2 text-xl font-bold text-zinc-600 dark:text-zinc-200">요청 내용</h4>
            <p className="font-extralight text-zinc-600 dark:text-zinc-200">
              재료: {userRequest.ingredients.join(', ')}
            </p>
            <p className="font-extralight text-zinc-600 dark:text-zinc-200">
              양: {userRequest.serving_size}인분
            </p>
            <p className="font-extralight text-zinc-600 dark:text-zinc-200">
              시간: {userRequest.cooking_time}분
            </p>
          </section>

          <section className="flex flex-col border p-4">
            {/* 실시간 스트리밍 텍스트 */}
            <div className="min-h-[500px] py-2" ref={streamDivRef}>
              {/* <p>{textStream}</p> */}
              <pre className="font-extralight whitespace-pre-wrap text-zinc-600 dark:text-zinc-200">
                {formatStreamText(textStream)}
              </pre>
            </div>
          </section>

          <section className="flex flex-col border p-4">
            {/* 최종 레시피 */}
            {finalRecipe && (
              <div className="py-2">
                <h3 className="py-2 text-xl font-bold">완성된 레시피</h3>
                <RecipeResultComponent recipe={finalRecipe} />
                {/* <button onClick={reset}>새로 만들기</button> */}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
