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
  recipe: {
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
    nutritional_info: NutritionInfo;
  };
};

export type Recipe = {
  recipe_name: string;
  recipe_url: string;
  recipe_image_url: string;
  recipe_description: string;
};

export type MenuResponse = {
  request_id: number;
  success: boolean;
  recommendations: {
    recommendations: Menu[];
  };
};

export type Menu = {
  food_name: string;
  food_type: string;
  description: string;
  nutritional_info: NutritionInfo;
  reccomendation_reason: string;
};

export type DietResponse = {
  request_id: number;
  success: boolean;
  meal_plan: {
    daily_calorie_target: number;
    protein_target: number;
    meals: Diet[];
  };
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
