import { aiApi } from '@/api/aiApi';
import api from '@/api/TokenApi';
import {
  DietFormInput,
  DietResponse,
  HistoryResponse,
  MenuFormRequest,
  // MenuResponse,
  RecipeFormInput,
  // RecipeResponse,
} from '@/types/ai';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

// 원본
export const useRecipeQuery = () => {
  const [recipeStream, setRecipeStream] = useState<string>('');

  const mutation = useMutation<
    string,
    AxiosError,
    {
      requestBody: RecipeFormInput;
    }
  >({
    mutationFn: ({ requestBody }) =>
      aiApi.getRecipe({
        requestBody,
        onChunk: (chunk) => setRecipeStream((prev) => prev + chunk),
      }),
    // onSuccess: () => {}
  });

  return { recipeStream, mutation };
};

export const useMenuQuery = () => {
  return useMutation<string | undefined, AxiosError, { requestBody: MenuFormRequest }>({
    mutationFn: aiApi.getMenu,
  });
};

export const useDietQuery = () => {
  return useMutation<DietResponse, AxiosError, { requestBody: DietFormInput }>({
    mutationFn: aiApi.getDiet,
  });
};

export const useHistoryQuery = () => {
  return useQuery<HistoryResponse, AxiosError>({
    queryKey: ['history'],
    queryFn: aiApi.getHistory,
  });
};

// 후보 3
export const useStreaming1 = () => {
  const [textStream, setTextStream] = useState<string>('');

  // SSE 형식 처리를 위한 mutation
  const streamMutation = useMutation({
    mutationFn: async (input: RecipeFormInput) => {
      setTextStream('');

      // Axios 요청 생성
      const response = await api.post(`/ai/recipe-recommendation/?streaming=true`, input, {
        responseType: 'text', // 텍스트 형식으로 받기
        onDownloadProgress: (progressEvent) => {
          const xhr = progressEvent.event?.target as XMLHttpRequest;
          const responseText = xhr.responseText;

          if (responseText) {
            // SSE 형식 파싱 (data: 로 시작하는 라인)
            const lines = responseText.split('\n');
            let accumulatedText = '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.substring(6);

                if (data === '[DONE]') continue;

                try {
                  // JSON 파싱 시도
                  const parsedData = JSON.parse(data);
                  const content =
                    parsedData.content ||
                    parsedData.text ||
                    parsedData.choices?.[0]?.delta?.content ||
                    '';
                  accumulatedText += content;
                } catch {
                  // JSON 아닌 경우 그냥 텍스트 추가
                  accumulatedText += data;
                }
              }
            }

            setTextStream(accumulatedText);
          }
        },
      });

      return response.data;
    },
  });
  return {
    textStream,
    streamMutation,
  };
};
