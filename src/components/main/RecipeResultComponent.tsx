import { formatDateYMD } from '@/lib/utils';
import { Recipe } from '@/types/ai';

export default function RecipeResultComponent({
  recipe,
  requestType,
  createdAt,
}: {
  recipe: Recipe;
  requestType?: 'RECIPE' | 'HEALTH' | 'FOOD';
  createdAt?: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        {/* 제목, 태그 */}
        <h3 className="text-lg font-bold">{recipe.name}</h3>
        {requestType && (
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {requestType}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between border-b pb-8">
        <div className="flex gap-2">
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {recipe.cuisine_type}
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {recipe.meal_type}
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {recipe.difficulty}
          </span>
        </div>
        {createdAt && (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {formatDateYMD(createdAt)}
          </span>
        )}
      </div>

      {/* 간단 설명, 시간, 양 */}
      <div className="flex flex-col gap-2 border-b pb-8">
        <p className="font-extralight text-zinc-600 dark:text-zinc-200">{recipe.description}</p>
        <p className="font-extralight text-zinc-600 dark:text-zinc-200">
          총 시간: {recipe.preparation_time + recipe.cooking_time}분 (준비 {recipe.preparation_time}
          분 + 조리 {recipe.cooking_time}분)
        </p>
        <p className="font-extralight text-zinc-600 dark:text-zinc-200">
          양: {recipe.serving_size}인분
        </p>
      </div>

      {/* 상세 설명 */}
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">재료</h4>
          <ol className="flex flex-col gap-2 font-extralight text-zinc-600 dark:text-zinc-200">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={ingredient.name}>
                {index + 1}. {ingredient.name}: {ingredient.amount}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">조리 순서</h4>
          <ol className="flex flex-col gap-2 font-extralight text-zinc-600 dark:text-zinc-200">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.step}>
                {instruction.step}. {instruction.description}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="pb-2 text-lg font-bold text-zinc-600 dark:text-zinc-200">영양 정보</h4>
          <ol className="font-extralight text-zinc-600 dark:text-zinc-200">
            <li>칼로리: {recipe.nutrition_info.calories} kcal</li>
            <li>탄수화물: {recipe.nutrition_info.carbs} g</li>
            <li>지방: {recipe.nutrition_info.fat} g</li>
            <li>단백질: {recipe.nutrition_info.protein} g</li>
          </ol>
        </div>
      </div>
    </>
  );
}
