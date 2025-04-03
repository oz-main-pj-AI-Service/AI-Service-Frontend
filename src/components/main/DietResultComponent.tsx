import { formatDateYMD } from '@/lib/utils';
import { DietMealPlan } from '@/types/ai';

export default function DietResultComponent({
  diet,
  requestType,
  createdAt,
}: {
  diet: DietMealPlan;
  requestType?: string;
  createdAt?: string;
}) {
  return (
    <>
      <h3 className="py-4 text-xl font-bold">최종 결과</h3>

      <div className="flex flex-col items-center">
        {/* 제목 */}
        <div className="flex w-full items-start justify-between pt-8">
          <h3 className="text-lg font-bold whitespace-pre-line text-[var(--point-orange)]">
            {diet.meals.map((meal) => meal.food_name).join('\n')}
          </h3>
          {requestType && (
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {requestType}
            </span>
          )}
        </div>
        {/* 태그 */}
        <div className="flex w-full items-center justify-between border-b py-8">
          <div className="flex gap-2">
            {diet.meals.map((meal) => (
              <span
                key={meal.food_name}
                className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {meal.food_type}
              </span>
            ))}
          </div>
          {createdAt && (
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {formatDateYMD(createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* 추천 이유 */}
      <div className="flex flex-col gap-2 border-b py-8">
        <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">추천 이유</h4>
        <p className="font-extralight text-zinc-600 dark:text-zinc-200">
          {diet.recommendation_reason}
        </p>
      </div>

      {/* 식단 목록 */}
      <ul className="flex flex-col gap-8 py-8">
        {diet.meals.map((meal, index) => (
          <li key={meal.food_name} className="flex flex-col gap-6">
            <h4 className="pb-2 text-lg font-bold text-[var(--point-orange)]">
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
            <p className="flex flex-col gap-2 font-extralight text-zinc-600 dark:text-zinc-200">
              {meal.description}
            </p>
            <div className="border-b pb-8">
              <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">
                - 영양 정보
              </h4>
              <ol className="flex flex-col gap-2 font-extralight text-zinc-600 dark:text-zinc-200">
                <li>칼로리: {meal.nutritional_info.calories} kcal</li>
                <li>탄수화물: {meal.nutritional_info.carbs} g</li>
                <li>지방: {meal.nutritional_info.fat} g</li>
                <li>단백질: {meal.nutritional_info.protein} g</li>
              </ol>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
