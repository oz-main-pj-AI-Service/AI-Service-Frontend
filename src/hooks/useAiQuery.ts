import { useState, useEffect, useRef, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { aiApi, StreamOptions, StreamResponse } from '@/api/aiApi';

import {
  Recipe,
  RecipeFormInput,
  MenuFormRequest,
  // Menu,
  MenuResponse,
  DietFormInput,
  DietResponse,
  HistoryResponse,
  StreamResult,
  // DietMealPlan,
} from '@/types/ai';

// 원본
// export const useRecipeQuery = () => {
//   const [recipeStream, setRecipeStream] = useState<string>('');

//   const mutation = useMutation<
//     string,
//     AxiosError,
//     {
//       requestBody: RecipeFormInput;
//     }
//   >({
//     mutationFn: ({ requestBody }) =>
//       aiApi.getRecipe({
//         requestBody,
//         onChunk: (chunk) => setRecipeStream((prev) => prev + chunk),
//       }),
//     // onSuccess: () => {}
//   });

//   return { recipeStream, mutation };
// };

// export const useMenuQuery = () => {
//   return useMutation<string | undefined, AxiosError, { requestBody: MenuFormRequest }>({
//     mutationFn: aiApi.getMenu,
//   });
// };

// export const useDietQuery = () => {
//   return useMutation<DietResponse, AxiosError, { requestBody: DietFormInput }>({
//     mutationFn: aiApi.getDiet,
//   });
// };

export const useHistoryQuery = (page: string = '1') => {
  return useQuery<HistoryResponse, AxiosError>({
    queryKey: ['history', page],
    queryFn: () => aiApi.getHistory(page),
  });
};

// 공통 스트림 쿼리 훅
export const useStreamQuery = <T extends object, R>(
  streamFn: (
    requestData: T,
    signal: AbortSignal,
    options: StreamOptions,
  ) => Promise<StreamResponse>,
  options: {
    onSuccess?: (data: R | null) => void;
    onError?: (error: Error) => void;
    retryCount?: number;
  } = {},
): StreamResult<T, R> & { mutation: any } => {
  const [textStream, setTextStream] = useState<string>('');
  const [finalRecipe, setFinalRecipe] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const jsonMarkerFoundRef = useRef<boolean>(false);

  // const MAX_RECONNECT_ATTEMPTS = options.retryCount ?? 3;

  // 상태 초기화 함수
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setTextStream('');
    setFinalRecipe(null);
    setError(null);
    setIsStreaming(false);
    jsonMarkerFoundRef.current = false;
  }, []);

  // 텍스트 청크 처리 함수
  const processNewChunk = useCallback(
    (chunk: string) => {
      // 이미 JSON 마커가 발견된 경우, 텍스트 추가를 완전히 중단
      if (jsonMarkerFoundRef.current) {
        // JSON 관련 처리만 수행 (필요시)
        if (chunk.includes('FINAL_JSON:')) {
          try {
            const jsonStr = chunk.replace('FINAL_JSON:', '');
            const jsonData = JSON.parse(jsonStr);
            setFinalRecipe(jsonData);
            options.onSuccess?.(jsonData as R);
          } catch (err) {
            console.error('Final JSON 파싱 오류:', err);
          }
        }
        return;
      }

      // JSON 마커를 검사하고 그 이전 부분만 텍스트에 추가
      if (chunk.includes('###JSON###')) {
        const beforeMarker = chunk.split('###JSON###')[0];
        setTextStream((prev) => prev + beforeMarker);

        // 마커 발견 상태 설정 (이후의 모든 데이터는 텍스트에 추가하지 않음)
        jsonMarkerFoundRef.current = true;
        return;
      }

      // 일반적인 텍스트 처리
      if (chunk === '[DONE]') {
        setIsStreaming(false);
        return;
      }

      if (chunk.startsWith('FINAL_JSON:')) {
        try {
          const jsonData = JSON.parse(chunk.replace('FINAL_JSON:', ''));
          setFinalRecipe(jsonData as R);
          options.onSuccess?.(jsonData as R);
        } catch (err) {
          const error = err as Error;
          setError(error);
          options.onError?.(error);
        }
        return;
      }

      if (chunk.startsWith('JSON_ERROR:')) {
        const errorMsg = chunk.replace('JSON_ERROR:', '');
        const error = new Error(errorMsg);
        setError(error);
        options.onError?.(error);
        return;
      }

      // 일반 텍스트 추가
      setTextStream((prev) => prev + chunk);
    },
    [options],
  );

  // useMutation을 사용한 스트림 처리
  const mutation = useMutation({
    mutationFn: async (requestData: T) => {
      // 초기화
      reset();
      setIsStreaming(true);
      console.log('시작: 스트리밍 요청');

      // AbortController 생성
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        // aiApi의 스트림 함수 호출
        await streamFn(requestData, abortController.signal, {
          onChunk: processNewChunk,
          onError: (err) => {
            console.error('청크 처리 중 오류:', err);
            setError(err);
            options.onError?.(err);
          },
          onComplete: () => {
            console.log('완료: 스트리밍 응답');
            setIsStreaming(false);
          },
        });

        // 최종 결과 반환
        return finalRecipe;
      } catch (error) {
        console.error('스트림 처리 오류:', error);
        throw error; // 재시도를 위해 오류 전파
      }
    },
    onMutate: () => {
      setIsStreaming(true);
      console.log('Mutation 시작');
    },
    onError: (error: Error) => {
      console.error('Mutation 오류:', error);
      setError(error);
      setIsStreaming(false);
      options.onError?.(error);
    },
    onSuccess: () => {
      console.log('Mutation 성공');
      setIsStreaming(false);
    },
    retry: false, // 재시도 비활성화 - 스트리밍에서는 재시도가 유용하지 않을 수 있음
    // 또는 제한된 조건에서만 재시도:
    // retry: (failureCount, error) => {
    //   if (error instanceof AxiosError && error.code === 'ERR_CANCELED') {
    //     return false;
    //   }
    //   return failureCount < MAX_RECONNECT_ATTEMPTS;
    // },
  });

  // 스트림 시작 함수 (외부용) (굳이?)
  const startStream = useCallback(
    (requestData: T) => {
      mutation.mutate(requestData);
    },
    [mutation],
  );

  // 컴포넌트 언마운트 시 연결 종료
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // 리턴할거 정리하기
  return {
    textStream,
    finalRecipe,
    error,
    isStreaming,
    startStream,
    reset,
    mutation,
  };
};

// 기존 쿼리를 대체하는 스트림 쿼리 훅들
export const useRecipeQuery = (
  options: {
    onSuccess?: (data: Recipe | null) => void;
    onError?: (error: Error) => void;
    retryCount?: number;
  } = {},
) => {
  return useStreamQuery<RecipeFormInput, Recipe>(aiApi.getRecipeStream, options);
};

export const useMenuQuery = (
  options: {
    onSuccess?: (data: MenuResponse | null) => void;
    onError?: (error: Error) => void;
    retryCount?: number;
  } = {},
) => {
  return useStreamQuery<MenuFormRequest, MenuResponse>(aiApi.getMenuStream, options);
};

export const useDietQuery = (
  options: {
    onSuccess?: (data: DietResponse | null) => void;
    onError?: (error: Error) => void;
    retryCount?: number;
  } = {},
) => {
  return useStreamQuery<DietFormInput, DietResponse>(aiApi.getDietStream, options);
};

// 그냥 useStreamMutation으로 다 통일해서 쓰는 방법도...
