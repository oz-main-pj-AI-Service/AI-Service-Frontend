import { aiApi } from '@/api/aiApi';
import {
  DietFormInput,
  DietResponse,
  MenuFormRequest,
  MenuResponse,
  RecipeFormInput,
  RecipeResponse,
} from '@/types/ai';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, RawAxiosRequestHeaders } from 'axios';

export const useRecipeQuery = () => {
  return useMutation<
    RecipeResponse,
    AxiosError,
    { requestBody: RecipeFormInput; headers: RawAxiosRequestHeaders }
  >({
    mutationFn: aiApi.getRecipe,
    // onSuccess: () => {}
  });
};

export const useMenuQuery = () => {
  return useMutation<
    MenuResponse,
    AxiosError,
    { requestBody: MenuFormRequest; headers: RawAxiosRequestHeaders }
  >({
    mutationFn: aiApi.getMenu,
  });
};

export const useDietQuery = () => {
  return useMutation<
    DietResponse,
    AxiosError,
    { requestBody: DietFormInput; headers: RawAxiosRequestHeaders }
  >({
    mutationFn: aiApi.getDiet,
  });
};

// 존재의 의미를 고민하기: 뮤태이션쿼리는 무조건 필요하지만 이게 꼭 훅이어야하나?
