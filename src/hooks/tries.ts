import api from '@/api/TokenApi';
// import { useRecipeStreamStore } from '@/stores/streamStore';
import { RecipeFormInput, RecipeResponse } from '@/types/ai';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosProgressEvent } from 'axios';
import { useCallback, useEffect, useState } from 'react';

// 후보 2
interface UseRecipeStreamResult {
  textStream: string;
  finalRecipe: RecipeResponse | null;
  error: Error | null;
  isStreaming: boolean;
  startStream: (requestData: RecipeFormInput) => void;
  reset: () => void;
}

export const useRecipeStream = (): UseRecipeStreamResult => {
  const [textStream, setTextStream] = useState<string>('');
  const [finalRecipe, setFinalRecipe] = useState<RecipeResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const reset = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setTextStream('');
    setFinalRecipe(null);
    setError(null);
    setIsStreaming(false);
  }, [abortController]);

  const { mutate } = useMutation({
    mutationFn: async (requestData: RecipeFormInput) => {
      // 이전 요청이 있다면 취소
      if (abortController) {
        abortController.abort();
      }
      const controller = new AbortController();
      setAbortController(controller);

      try {
        await api.post('/ai/recipe-recommendation/?streaming=true', requestData, {
          responseType: 'text',
          signal: controller.signal,
          onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            const chunk = progressEvent.event.target?.responseText;
            if (!chunk) return;

            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);

                if (data === '[DONE]') {
                  setIsStreaming(false);
                  return;
                }

                if (data.startsWith('FINAL_JSON:')) {
                  try {
                    const jsonData = JSON.parse(data.replace('FINAL_JSON:', ''));
                    setFinalRecipe(jsonData);
                  } catch (error) {
                    setError(error as Error);
                  }
                  continue;
                }

                if (data.startsWith('JSON_ERROR:')) {
                  setError(new Error(data.replace('JSON_ERROR:', '')));
                  continue;
                }

                setTextStream((prev) => prev + data);
              }
            }
          },
        });

        setIsStreaming(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.code === 'ERR_CANCELED') {
            console.log('Request was aborted');
            return;
          }
          throw new Error(error.response?.data?.error || error.message);
        }
        throw error;
      } finally {
        setAbortController(null);
      }
    },
    onError: (error) => {
      setError(error as Error);
      setIsStreaming(false);
    },
  });

  const startStream = useCallback(
    (requestData: RecipeFormInput) => {
      reset();
      setIsStreaming(true);
      mutate(requestData);
    },
    [mutate, reset],
  );

  // 컴포넌트 언마운트 시 요청 취소
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  return {
    textStream,
    finalRecipe,
    error,
    isStreaming,
    startStream,
    reset,
  };
};

// -------------------------------------------------------------

// zustand 전역 상태로?
// 세가지를 어떻게 묶을수 있을것같음
// export const useRecipeStream = () => {
//   // Zustand 스토어에서 상태와 액션 가져오기
//   const {
//     streamingText,
//     finalRecipe,
//     error,
//     isStreaming,
//     addChunk,
//     setFinalRecipe,
//     setError,
//     setIsStreaming,
//     reset,
//   } = useRecipeStreamStore();

//   // 요청 취소를 위한 ref
//   const abortControllerRef = useRef<AbortController | null>(null);

//   // 컴포넌트 언마운트 시 요청 취소
//   useEffect(() => {
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, []);

//   const { mutate } = useMutation({
//     mutationFn: async (requestData: RecipeFormInput) => {
//       // 이전 요청이 있다면 취소
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }

//       const controller = new AbortController();
//       abortControllerRef.current = controller;

//       try {
//         await api.post('/ai/recipe-recommendation/?streaming=true', requestData, {
//           responseType: 'text',
//           signal: controller.signal,
//           onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
//             const xhr = progressEvent.event.target as XMLHttpRequest;
//             if (!xhr || !xhr.responseText) return;

//             const responseText = xhr.responseText;
//             const lines = responseText.split('\n');

//             // 이전에 처리한 라인 수를 추적
//             const processedLines = (xhr as any)._processedLines || 0;

//             // 새로운 라인만 처리
//             for (let i = processedLines; i < lines.length; i++) {
//               const line = lines[i];
//               if (line.startsWith('data: ')) {
//                 const data = line.slice(6);

//                 if (data === '[DONE]') {
//                   setIsStreaming(false);
//                   continue;
//                 }

//                 if (data.startsWith('FINAL_JSON:')) {
//                   try {
//                     const jsonData = JSON.parse(data.replace('FINAL_JSON:', ''));
//                     setFinalRecipe(jsonData);
//                   } catch (err) {
//                     setError(err instanceof Error ? err : new Error(String(err)));
//                   }
//                   continue;
//                 }

//                 if (data.startsWith('JSON_ERROR:')) {
//                   setError(new Error(data.replace('JSON_ERROR:', '')));
//                   continue;
//                 }

//                 // 텍스트 청크 추가
//                 addChunk(data);
//               }
//             }

//             // 처리한 라인 수 업데이트
//             (xhr as any)._processedLines = lines.length;
//           },
//         });

//         setIsStreaming(false);
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log('Request was aborted');
//           return;
//         }
//         throw error;
//       } finally {
//         abortControllerRef.current = null;
//       }
//     },
//     onError: (error) => {
//       setError(error instanceof Error ? error : new Error(String(error)));
//       setIsStreaming(false);
//     },
//   });

//   const startStreaming = useCallback(
//     (requestData: RecipeFormInput) => {
//       reset();
//       setIsStreaming(true);
//       mutate(requestData);
//     },
//     [mutate, reset, setIsStreaming],
//   );

//   return {
//     streamingText,
//     finalRecipe,
//     error,
//     isStreaming,
//     startStreaming,
//     reset,
//   };
// };
