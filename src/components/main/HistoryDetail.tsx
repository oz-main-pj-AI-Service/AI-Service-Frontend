import { History } from '@/types/ai';
import { useParams } from 'react-router';

export default function HistoryDetail() {
  const { id } = useParams() as { id: string };
  const content: History = JSON.parse(decodeURIComponent(id));

  console.log(content);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">추천 기록 상세 정보</h2>
          {/* 레시피 */}
          {content.request_type === 'RECIPE' && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{content.response_data.name}</h3>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {content.request_type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {content.response_data.cuisine_type}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {content.response_data.meal_type}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {content.response_data.difficulty}
                  </span>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {content.created_at}
                </span>
              </div>
              <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                {content.response_data.description}
              </p>
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
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {content.response_data.recommendation.food_type}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {content.created_at}
                </span>
              </div>
              <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                {content.response_data.recommendation.description}
              </p>
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
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {content.response_data.meals.map((meal) => (
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {meal.food_type}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {content.created_at}
                </span>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
