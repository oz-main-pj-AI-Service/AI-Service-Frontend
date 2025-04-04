// import { useEffect, useCallback, useRef, useState } from 'react';
// import { AxiosError, AxiosProgressEvent } from 'axios';
// import { useMutation } from '@tanstack/react-query';
// import { Recipe, RecipeFormInput, RecipeStreamResult } from '@/types/ai';
// import api from '@/api/TokenApi';

// // 임시 확정
// export const useRecipeStream = (): RecipeStreamResult => {
//   const [textStream, setTextStream] = useState<string>('');
//   const [finalRecipe, setFinalRecipe] = useState<{ recommendation: Recipe } | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [abortController, setAbortController] = useState<AbortController | null>(null);
//   const prevResponseTextRef = useRef<string>('');

//   // 중요: 전역 변수로 마커 감지 상태 관리 (useState 대신 useRef 사용)
//   const jsonMarkerFoundRef = useRef<boolean>(false);

//   // 새 요청에서 항상 초기화
//   const reset = useCallback(() => {
//     if (abortController) {
//       abortController.abort();
//       setAbortController(null);
//     }
//     setTextStream('');
//     setFinalRecipe(null);
//     setError(null);
//     setIsStreaming(false);
//     prevResponseTextRef.current = '';
//     jsonMarkerFoundRef.current = false; // JSON 마커 감지 상태 초기화
//   }, [abortController]);

//   const { mutate } = useMutation({
//     mutationFn: async (requestData: RecipeFormInput) => {
//       // 초기화
//       reset();
//       setIsStreaming(true);

//       try {
//         await api.post('/ai/recipe-recommendation/?streaming=true', requestData, {
//           responseType: 'text',
//           signal: abortController?.signal,
//           onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
//             const xhr = progressEvent.event.target as XMLHttpRequest;
//             if (!xhr || !xhr.responseText) return;

//             const fullResponseText = xhr.responseText;
//             // 새 텍스트만 추출
//             const newText = fullResponseText.substring(prevResponseTextRef.current.length);
//             prevResponseTextRef.current = fullResponseText;

//             if (!newText) return;

//             // 텍스트 처리
//             processNewChunk(newText);
//           },
//         });

//         setIsStreaming(false);
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           if (error.code === 'ERR_CANCELED') {
//             console.log('Request was aborted');
//             return;
//           }
//           throw new Error(error.response?.data?.error || error.message);
//         }
//         throw error;
//       } finally {
//         setAbortController(null);
//       }
//     },
//     onError: (error) => {
//       setError(error as Error);
//       setIsStreaming(false);
//     },
//   });

//   // 텍스트 청크 처리 함수 분리
//   const processNewChunk = useCallback((chunk: string) => {
//     // 이미 JSON 마커가 발견된 경우, 텍스트 추가를 완전히 중단
//     if (jsonMarkerFoundRef.current) {
//       // JSON 관련 처리만 수행 (필요시)
//       const lines = chunk.split('\n');
//       for (const line of lines) {
//         if (line.startsWith('data: ') && line.includes('FINAL_JSON:')) {
//           try {
//             const jsonStr = line.slice(6).replace('FINAL_JSON:', '');
//             const jsonData = JSON.parse(jsonStr);
//             setFinalRecipe(jsonData);
//           } catch (err) {
//             console.error('Final JSON 파싱 오류:', err);
//           }
//         }
//       }
//       return;
//     }

//     // JSON 마커를 검사하고 그 이전 부분만 텍스트에 추가
//     if (chunk.includes('###JSON###')) {
//       const beforeMarker = chunk.split('###JSON###')[0];

//       // 마커 이전의 텍스트를 줄 단위로 처리
//       const lines = beforeMarker.split('\n');
//       for (const line of lines) {
//         if (line.startsWith('data: ')) {
//           setTextStream((prev) => prev + line.slice(6));
//         }
//       }

//       // 마커 발견 상태 설정 (이후의 모든 데이터는 텍스트에 추가하지 않음)
//       jsonMarkerFoundRef.current = true;
//       return;
//     }

//     // 일반적인 텍스트 처리 (마커를 아직 발견하지 않은 경우)
//     const lines = chunk.split('\n');
//     for (const line of lines) {
//       if (line.startsWith('data: ')) {
//         const data = line.slice(6);

//         if (data === '[DONE]') {
//           setIsStreaming(false);
//           return;
//         }

//         if (data.startsWith('FINAL_JSON:')) {
//           try {
//             const jsonData = JSON.parse(data.replace('FINAL_JSON:', ''));
//             setFinalRecipe(jsonData);
//           } catch (err) {
//             setError(err as Error);
//           }
//           continue;
//         }

//         if (data.startsWith('JSON_ERROR:')) {
//           setError(new Error(data.replace('JSON_ERROR:', '')));
//           continue;
//         }

//         // 일반 텍스트 추가
//         setTextStream((prev) => prev + data);
//       }
//     }
//   }, []);

//   const startStream = useCallback(
//     (requestData: RecipeFormInput) => {
//       mutate(requestData);
//     },
//     [mutate],
//   );

//   // 컴포넌트 언마운트 시 요청 취소
//   useEffect(() => {
//     return () => {
//       if (abortController) {
//         abortController.abort();
//       }
//     };
//   }, [abortController]);

//   return {
//     textStream,
//     finalRecipe,
//     error,
//     isStreaming,
//     startStream,
//     reset,
//   };
// };
