import { aiApi } from '@/api/aiApi';
import { API_URL } from '@/constants/url';
import {
  DietFormInput,
  DietResponse,
  MenuFormRequest,
  // MenuResponse,
  RecipeFormInput,
  // RecipeResponse,
} from '@/types/ai';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

export const useRecipeQuery = () => {
  const [recipeStream, setRecipeStream] = useState<string>('');

  const mutation = useMutation<
    string,
    AxiosError,
    {
      requestBody: RecipeFormInput;
      // headers: RawAxiosRequestHeaders
    }
  >({
    mutationFn: ({
      requestBody,
      // headers
    }) =>
      aiApi.getRecipe({
        requestBody,
        // headers,
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

// 406 에러 발생
export const useStreaming1 = () => {
  const [streamedText, setStreamedText] = useState<string>('');

  // SSE 형식 처리를 위한 mutation
  const streamMutation = useMutation({
    mutationFn: async (input: RecipeFormInput) => {
      setStreamedText('');

      // Axios 요청 생성
      const response = await axios.post(
        `${API_URL}/ai/recipe-recommendation/?streaming=true`,
        { query: input },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream', // SSE 형식 명시
          },
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

              setStreamedText(accumulatedText);
            }
          },
        },
      );

      return response.data;
    },
  });
  return {
    streamedText,
    streamMutation,
  };
};
