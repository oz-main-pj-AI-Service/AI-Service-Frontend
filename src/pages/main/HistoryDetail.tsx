import RecipeResult from '@/components/main/RecipeResultComponent';
import { formatDateYMD } from '@/lib/utils';
import { History } from '@/types/ai';
import { useParams } from 'react-router';

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
              <RecipeResult
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  {content.response_data.recommendation.food_name}
                </h3>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {content.request_type}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-8">
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {content.response_data.recommendation.food_type}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {formatDateYMD(content.created_at)}
                </span>
              </div>

              <div>
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">상세 정보</h4>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  {content.response_data.recommendation.description}
                </p>
              </div>
              <div>
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">추천 이유</h4>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  {content.response_data.recommendation.recommendation_reason}
                </p>
              </div>
              <div className="border-b pb-8">
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">영양 정보</h4>
                <ol className="font-extralight text-zinc-600 dark:text-zinc-200">
                  <li>
                    칼로리: {content.response_data.recommendation.nutritional_info.calories} kcal
                  </li>
                  <li>탄수화물: {content.response_data.recommendation.nutritional_info.carbs} g</li>
                  <li>지방: {content.response_data.recommendation.nutritional_info.fat} g</li>
                  <li>단백질: {content.response_data.recommendation.nutritional_info.protein} g</li>
                </ol>
              </div>

              {/* 요청 내용 (한글로 바꿔주기) */}
              <div>
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
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold whitespace-pre-line">
                  {content.response_data.meals.map((meal) => meal.food_name).join('\n')}
                </h3>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {content.request_type}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-8">
                <div className="flex gap-2">
                  {content.response_data.meals.map((meal) => (
                    <span
                      key={meal.food_name}
                      className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {meal.food_type}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {formatDateYMD(content.created_at)}
                </span>
              </div>

              <div className="border-b pb-8">
                <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">추천 이유</h4>
                <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                  {content.response_data.recommendation_reason}
                </p>
              </div>
              <ul className="flex flex-col gap-8">
                {content.response_data.meals.map((meal, index) => (
                  <li key={meal.food_name} className="flex flex-col gap-4">
                    <h4 className="font-bold text-zinc-600 dark:text-zinc-200">
                      {index + 1}. {meal.food_name}
                    </h4>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {meal.food_type}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {meal.type}
                      </span>
                    </div>
                    <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                      {meal.description}
                    </p>
                    <div className="border-b pb-8">
                      <h4 className="pb-2 font-bold text-zinc-600 dark:text-zinc-200">
                        - 영양 정보
                      </h4>
                      <ol className="font-extralight text-zinc-600 dark:text-zinc-200">
                        <li>칼로리: {meal.nutritional_info.calories} kcal</li>
                        <li>탄수화물: {meal.nutritional_info.carbs} g</li>
                        <li>지방: {meal.nutritional_info.fat} g</li>
                        <li>단백질: {meal.nutritional_info.protein} g</li>
                      </ol>
                    </div>
                  </li>
                ))}
              </ul>

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
