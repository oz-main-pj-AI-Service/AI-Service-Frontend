// import { useRecipeStreamStore } from '@/stores/streamStore';
import api from '@/api/TokenApi';
import { Recipe, RecipeFormInput } from '@/types/ai';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosProgressEvent } from 'axios';
import { useCallback, useEffect, useState, useRef } from 'react';

// 후보 2 (임시 결정)
interface RecipeStreamResult {
  textStream: string;
  finalRecipe: Recipe | null;
  error: Error | null;
  isStreaming: boolean;
  startStream: (requestData: RecipeFormInput) => void;
  reset: () => void;
}

export const useRecipeStream = (): RecipeStreamResult => {
  const [textStream, setTextStream] = useState<string>('');
  const [finalRecipe, setFinalRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const prevResponseTextRef = useRef<string>('');

  // 중요: 전역 변수로 마커 감지 상태 관리 (useState 대신 useRef 사용)
  const jsonMarkerFoundRef = useRef<boolean>(false);

  // 새 요청에서 항상 초기화
  const reset = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setTextStream('');
    setFinalRecipe(null);
    setError(null);
    setIsStreaming(false);
    prevResponseTextRef.current = '';
    jsonMarkerFoundRef.current = false; // JSON 마커 감지 상태 초기화
  }, [abortController]);

  const { mutate } = useMutation({
    mutationFn: async (requestData: RecipeFormInput) => {
      // 초기화
      reset();
      setIsStreaming(true);

      try {
        await api.post('/ai/recipe-recommendation/?streaming=true', requestData, {
          responseType: 'text',
          signal: abortController?.signal,
          onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            const xhr = progressEvent.event.target as XMLHttpRequest;
            if (!xhr || !xhr.responseText) return;

            const fullResponseText = xhr.responseText;
            // 새 텍스트만 추출
            const newText = fullResponseText.substring(prevResponseTextRef.current.length);
            prevResponseTextRef.current = fullResponseText;

            if (!newText) return;

            // 텍스트 처리
            processNewChunk(newText);
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

  // 텍스트 청크 처리 함수 분리
  const processNewChunk = useCallback((chunk: string) => {
    // 이미 JSON 마커가 발견된 경우, 텍스트 추가를 완전히 중단
    if (jsonMarkerFoundRef.current) {
      // JSON 관련 처리만 수행 (필요시)
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ') && line.includes('FINAL_JSON:')) {
          try {
            const jsonStr = line.slice(6).replace('FINAL_JSON:', '');
            const jsonData = JSON.parse(jsonStr);
            setFinalRecipe(jsonData);
          } catch (err) {
            console.error('Final JSON 파싱 오류:', err);
          }
        }
      }
      return;
    }

    // JSON 마커를 검사하고 그 이전 부분만 텍스트에 추가
    if (chunk.includes('###JSON###')) {
      const beforeMarker = chunk.split('###JSON###')[0];

      // 마커 이전의 텍스트를 줄 단위로 처리
      const lines = beforeMarker.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          setTextStream((prev) => prev + line.slice(6));
        }
      }

      // 마커 발견 상태 설정 (이후의 모든 데이터는 텍스트에 추가하지 않음)
      jsonMarkerFoundRef.current = true;
      return;
    }

    // 일반적인 텍스트 처리 (마커를 아직 발견하지 않은 경우)
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
          } catch (err) {
            setError(err as Error);
          }
          continue;
        }

        if (data.startsWith('JSON_ERROR:')) {
          setError(new Error(data.replace('JSON_ERROR:', '')));
          continue;
        }

        // 일반 텍스트 추가
        setTextStream((prev) => prev + data);
      }
    }
  }, []);

  const startStream = useCallback(
    (requestData: RecipeFormInput) => {
      mutate(requestData);
    },
    [mutate],
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
