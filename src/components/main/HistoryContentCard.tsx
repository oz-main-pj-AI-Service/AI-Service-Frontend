import { formatDateMD, formatDateYMD, formatTypeToText } from '@/lib/utils';
import { History } from '@/types/ai';
import { Link } from 'react-router';

export default function HistoryContentCard({ content }: { content: History }) {
  // console.log(content);

  return (
    <li className="w-full border-b hover:cursor-pointer hover:text-[var(--point-orange)] hover:opacity-70">
      <Link
        to={`/history/detail/${encodeURIComponent(JSON.stringify(content))}`}
        className="flex flex-col gap-4 pt-3 pb-4"
      >
        {/* 레시피 */}
        {content.request_type === 'RECIPE' && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{content.response_data.name}</h3>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {formatTypeToText(content.request_type)}
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
                {formatDateYMD(content.created_at)}
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
                {formatTypeToText(content.request_type)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {content.response_data.recommendation.food_type}
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {formatDateYMD(content.created_at)}
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
                {formatTypeToText(content.request_type)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
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
                {formatDateMD(content.created_at)}
              </span>
            </div>
          </>
        )}
      </Link>
    </li>
  );
}
