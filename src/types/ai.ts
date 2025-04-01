import { z } from 'zod';
import { recipeFormSchema } from './aiSchema';

// 요청
export type Option = {
  id: string;
  label: string;
};

// zod 스키마로 타입 추론
export type RecipeFormInput = z.infer<typeof recipeFormSchema>;
// export type RecipeFormInput = {
//   ingredients: ''; // 받아서 배열로 고쳐서 넘기기 (아마 그럼 입력은 문자열로 받고, 요청할때 배열로 바꿔주기)
//   serving_size: number;
//   cooking_time: number;
//   difficulty: '쉬움' | '보통' | '어려움';
// };

export type StreamResult<T = RecipeFormInput, R = { recommendation: Recipe }> = {
  textStream: string;
  finalRecipe: R | null;
  error: Error | null;
  isStreaming: boolean;
  startStream: (requestData: T) => void;
  reset: () => void;
};

export type RecipeStreamResult = StreamResult<RecipeFormInput, { recommendation: Recipe }>;

export type DietFormInput = {
  weight: number;
  goal: Option['label'][];
  exercise_frequency: Option['label'][];
  algergies: string;
  disliked_foods: string;
};

export type MenuFormInput = {
  cuisine_type: Option['label'][];
  food_base: Option['label'][];
  taste: Option['label'][];
  dietary_type: Option['label'][];
  last_meal: string;
};

export type MenuFormRequest = {
  cuisine_type: string;
  food_base: string;
  taste: string;
  dietary_type: string;
  last_meal: string;
};

// 응답
export type NutritionInfo = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

export type Ingredient = {
  name: string;
  amount: string;
};

export type CookingStep = {
  step: number;
  description: string;
};

export type RecipeResponse = {
  recipe_id: number;
  success: boolean;
  recipe: Recipe;
};

// 이거 없어도 되는거 맞나 확인하기
// export type Recipe = {
//   recipe_name: string;
//   recipe_url: string;
//   recipe_image_url: string;
//   recipe_description: string;
// };

export type Recipe = {
  name: string;
  description: string;
  cuisine_type: string;
  meal_type: string;
  preparation_time: number;
  cooking_time: number;
  serving_size: number;
  difficulty: string;
  ingredients: Ingredient[];
  instructions: CookingStep[];
  nutrition_info: NutritionInfo;
};

export type MenuResponse = {
  recommendation: Menu;
};

// export type MenuResponse = {
//   request_id: number;
//   success: boolean;
//   recommendation: {
//     recommendation: Menu;
//   };
// };

export type Menu = {
  food_name: string;
  food_type: string;
  description: string;
  nutritional_info: NutritionInfo;
  recommendation_reason: string;
};

// export type DietResponse = {
//   request_id: number;
//   success: boolean;
//   meal_plan: DietMealPlan;
// };

export type DietResponse = {
  daily_calorie_target: number;
  protein_target: number;
  meals: Diet[];
  recommendation_reason: string;
};

export type DietMealPlan = {
  daily_calorie_target: number;
  protein_target: number;
  meals: Diet[];
  recommendation_reason: string;
};

export type Diet = {
  type: string;
  food_name: string;
  food_type: string;
  description: string;
  nutritional_info: NutritionInfo;
};

// 검색 타입
export type SearchType = 'all' | 'recipe' | 'menu' | 'diet';

export type HistoryResponse = {
  results: History[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type History = {
  id: string;
  user: string;
  created_at: string;
} & (
  | {
      request_type: 'RECIPE';
      request_data: Omit<RecipeFormInput, 'ingredients'> & {
        ingredients: string[];
      };
      response_data: Recipe;
    }
  | {
      request_type: 'HEALTH';
      request_data: DietFormInput;
      response_data: DietMealPlan;
    }
  | {
      request_type: 'FOOD';
      request_data: MenuFormRequest;
      response_data: {
        recommendation: Menu;
      };
    }
);
