import { RawAxiosRequestHeaders } from 'axios';

export type RecipeFormInput = {
  ingredients: string;
  quantity: number;
  minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type DietFormInput = {
  weight: number;
  goal: string;
  frequency: string;
  algergy: string;
  dislike: string;
  startDate: string;
  endDate: string;
};

// goal: 'lose_weight' | 'gain_weight' | 'maintain_weight';

// 저 타입들중에서만 들어갈수있는 배열로 바꾸기
export type MenuFormInput = {
  category: string[];
  type: string[];
  taste: string[];
  goal: string[];
  // category: 'korean' | 'japanese' | 'chinese' | 'western' | 'asian';
  // type: 'rice' | 'noodle' | 'bread';
  // taste: 'sweet' | 'savory' | 'light' | 'spicy';
  // goal: 'healthy' | 'tasty';
  lastMeal: string;
};

// 카멜케이스로 맞춰야하나?
// 아님 그냥 따라가야하나?
// export type AiResult = {
//   id: string;
//   user: string;
//   request_type: 'food' | 'health' | 'recipe';
//   food_name: string;
//   food_type: string;
//   description: string;
//   nutritional_info: string;
//   reccomendation_reason: string;
//   created_at: string;
// };

export type AiResult = {
  id: string;
  request_type: 'food' | 'health' | 'recipe';
  request_data: MenuFormInput | DietFormInput | RecipeFormInput;
  response_data: object;
  created_at: string;
};

export type AiRequestBody = {
  request_type: 'food' | 'health' | 'recipe';
  request_data: MenuFormInput | DietFormInput | RecipeFormInput;
};

export type AiRequest = {
  requestBody: AiRequestBody;
  headers: RawAxiosRequestHeaders;
};

export type MenuResponse = {
  recommendations: {
    recommendations: Menu[];
  };
  request_id: number;
  success: boolean;
};

export type Menu = {
  description: string;
  food_name: string;
  food_type: string;
  nutritional_info: {
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
  };
  reccomendation_reason: string;
};
