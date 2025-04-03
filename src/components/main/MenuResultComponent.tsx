import { formatDateYMD } from '@/lib/utils';
import { Menu } from '@/types/ai';

export default function MenuResultComponent({
  menu,
  requestType,
  createdAt,
}: {
  menu: Menu;
  requestType?: string;
  createdAt?: string;
}) {
  return (
    <>
      <h3 className="py-4 text-xl font-bold">최종 결과</h3>

      <div className="flex flex-col items-center">
        {/* 제목 */}
        <div className="flex w-full justify-between pt-8">
          <h3 className="text-lg font-bold text-[var(--point-orange)]">{menu.food_name}</h3>
          {requestType && (
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {requestType}
            </span>
          )}
        </div>
        {/* 태그 */}
        <div className="flex w-full items-center justify-between border-b py-8">
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {menu.food_type}
          </span>
          {createdAt && (
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {formatDateYMD(createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="flex flex-col gap-8 py-8">
        <div>
          <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">상세 정보</h4>
          <p className="font-extralight text-zinc-600 dark:text-zinc-200">{menu.description}</p>
        </div>
        <div>
          <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">추천 이유</h4>
          <p className="font-extralight text-zinc-600 dark:text-zinc-200">
            {menu.recommendation_reason}
          </p>
        </div>
        <div>
          <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">영양 정보</h4>
          <ol className="flex flex-col gap-2 font-extralight text-zinc-600 dark:text-zinc-200">
            <li>칼로리: {menu.nutritional_info.calories} kcal</li>
            <li>탄수화물: {menu.nutritional_info.carbs} g</li>
            <li>지방: {menu.nutritional_info.fat} g</li>
            <li>단백질: {menu.nutritional_info.protein} g</li>
          </ol>
        </div>
      </div>
    </>
  );
}
