import { useParams } from 'react-router';
import { History } from '@/types/ai';
import DietResultComponent from '@/components/main/DietResultComponent';
import MenuResultComponent from '@/components/main/MenuResultComponent';
import RecipeResultComponent from '@/components/main/RecipeResultComponent';

export default function HistoryDetail() {
  const { id } = useParams() as { id: string };
  const content: History = JSON.parse(decodeURIComponent(id));

  console.log(content);

  // 이거 정리하고 분리해서 컴포넌트화 (그리고 추천 검색 결과 컴포넌트에 마지막 결과에 재활용?)
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-16 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8 sm:px-6">
          <h2 className="pb-4 text-center text-2xl font-bold">추천 기록 상세 정보</h2>
          {/* 레시피 */}
          {content.request_type === 'RECIPE' && (
            <>
              <RecipeResultComponent
                recipe={content.response_data}
                requestType={content.request_type}
                createdAt={content.created_at}
              />

              {/* 요청 내용 */}
              <div className="border-t pt-8">
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">요청 내용</h4>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  재료: {content.request_data.ingredients.join(', ')}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  양: {content.request_data.serving_size}인분
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  시간: {content.request_data.cooking_time}분
                </p>
              </div>
            </>
          )}

          {/* 메뉴 */}
          {content.request_type === 'FOOD' && (
            <>
              <MenuResultComponent
                menu={content.response_data.recommendation}
                requestType={content.request_type}
                createdAt={content.created_at}
              />

              {/* 요청 내용 (한글로 바꿔주기) */}
              <div className="border-t pt-8">
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">요청 내용</h4>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  나라별 음식: {content.request_data.cuisine_type}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  음식 종류: {content.request_data.food_base}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  맛: {content.request_data.taste}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  건강: {content.request_data.dietary_type}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  마지막 식사 메뉴: {content.request_data.last_meal}
                </p>
              </div>
            </>
          )}

          {/* 식단 */}
          {content.request_type === 'HEALTH' && (
            <>
              <DietResultComponent
                diet={content.response_data}
                requestType={content.request_type}
                createdAt={content.created_at}
              />

              {/* 요청 내용 */}
              <div>
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">요청 내용</h4>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  체중: {content.request_data.weight}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  목표: {content.request_data.goal}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  운동 빈도: {content.request_data.exercise_frequency}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  알레르기: {content.request_data.algergies}
                </p>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  싫어하는 음식: {content.request_data.disliked_foods}
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
