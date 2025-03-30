import { formatDateYMD } from '@/lib/utils';
import { History } from '@/types/ai';
import { Link } from 'react-router';

export default function LogContentCard({ content }: { content: History }) {
  // console.log(content);

  return (
    <li className="w-full border-b hover:cursor-pointer hover:text-[#FFA500] hover:opacity-70">
      <Link
        to={`/admin/ai/detail/${encodeURIComponent(JSON.stringify(content))}`}
        className="flex flex-col gap-4 pt-3 pb-4"
      >
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
              <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                유저id: {content.user}
              </p>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {formatDateYMD(content.created_at)}
              </span>
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
            <div className="flex items-center justify-between">
              <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                유저id: {content.user}
              </p>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {formatDateYMD(content.created_at)}
              </span>
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
            <div className="flex items-center justify-between">
              <p className="font-extralight text-zinc-600 dark:text-zinc-200">
                유저id: {content.user}
              </p>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {formatDateYMD(content.created_at)}
              </span>
            </div>
          </>
        )}
      </Link>
    </li>
  );
}
