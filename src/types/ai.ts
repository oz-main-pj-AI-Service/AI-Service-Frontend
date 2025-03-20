// 요청
export type Option = {
  id: string;
  label: string;
};

export type RecipeFormInput = {
  ingredients: string[]; // 이거 배열로 받으실건지 다시 체크
  serving_size: number;
  cooking_time: number;
  difficulty: 'easy' | 'medium' | 'hard'; // 이거 배열로 되어있는거 체크
};

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

// export type AiResult = {
//   id: string;
//   request_type: 'food' | 'health' | 'recipe';
//   request_data: MenuFormInput | DietFormInput | RecipeFormInput;
//   response_data: object;
//   created_at: string;
// };

// 응답
export type NutritionInfo = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

export type Ingredient = {
  name: string;
  quantity: string;
};

export type CookingStep = {
  step: number;
  description: string;
};

// request_id가 아니고 recipe_id 인거 맞는지 확인
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
