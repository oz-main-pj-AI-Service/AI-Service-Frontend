// import { Recipe, RecipeFormInput, RecipeStreamResult } from '@/types/ai';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { EventSourcePolyfill } from 'event-source-polyfill';

// // EventSource Polyfill을 사용한 새로운 구현
// export const useRecipeStream = (): RecipeStreamResult => {
//   const [textStream, setTextStream] = useState<string>('');
//   const [finalRecipe, setFinalRecipe] = useState<Recipe | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
//   const jsonMarkerFoundRef = useRef<boolean>(false);

//   const reset = useCallback(() => {
//     if (eventSourceRef.current) {
//       eventSourceRef.current.close();
//       eventSourceRef.current = null;
//     }
//     setTextStream('');
//     setFinalRecipe(null);
//     setError(null);
//     setIsStreaming(false);
//     jsonMarkerFoundRef.current = false;
//   }, []);

//   // 텍스트 청크 처리 함수
//   const processNewChunk = useCallback((chunk: string) => {
//     // 이미 JSON 마커가 발견된 경우, 텍스트 추가를 완전히 중단
//     if (jsonMarkerFoundRef.current) {
//       // JSON 관련 처리만 수행 (필요시)
//       if (chunk.includes('FINAL_JSON:')) {
//         try {
//           const jsonStr = chunk.replace('FINAL_JSON:', '');
//           const jsonData = JSON.parse(jsonStr);
//           setFinalRecipe(jsonData);
//         } catch (err) {
//           console.error('Final JSON 파싱 오류:', err);
//         }
//       }
//       return;
//     }

//     // JSON 마커를 검사하고 그 이전 부분만 텍스트에 추가
//     if (chunk.includes('###JSON###')) {
//       const beforeMarker = chunk.split('###JSON###')[0];
//       setTextStream((prev) => prev + beforeMarker);

//       // 마커 발견 상태 설정 (이후의 모든 데이터는 텍스트에 추가하지 않음)
//       jsonMarkerFoundRef.current = true;
//       return;
//     }

//     // 일반적인 텍스트 처리
//     if (chunk === '[DONE]') {
//       setIsStreaming(false);
//       return;
//     }

//     if (chunk.startsWith('FINAL_JSON:')) {
//       try {
//         const jsonData = JSON.parse(chunk.replace('FINAL_JSON:', ''));
//         setFinalRecipe(jsonData);
//       } catch (err) {
//         setError(err as Error);
//       }
//       return;
//     }

//     if (chunk.startsWith('JSON_ERROR:')) {
//       setError(new Error(chunk.replace('JSON_ERROR:', '')));
//       return;
//     }

//     // 일반 텍스트 추가
//     setTextStream((prev) => prev + chunk);
//   }, []);

//   const startStream = useCallback(
//     (requestData: RecipeFormInput) => {
//       // 초기화
//       reset();
//       setIsStreaming(true);

//       try {
//         // API URL 설정
//         const url = '/api/ai/recipe-recommendation/?streaming=true';

//         // EventSource 생성
//         const eventSource = new EventSourcePolyfill(url, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           method: 'POST',
//           body: JSON.stringify(requestData),
//           withCredentials: true,
//         });

//         // 이벤트 핸들러 설정
//         eventSource.onmessage = (event: MessageEvent) => {
//           const data = event.data;
//           processNewChunk(data);
//         };

//         eventSource.onerror = (event: Event) => {
//           console.error('EventSource error:', event);
//           setError(new Error('스트리밍 연결 오류가 발생했습니다.'));
//           setIsStreaming(false);
//           eventSource.close();
//         };

//         eventSource.onopen = () => {
//           console.log('EventSource connection opened');
//         };

//         // 참조 저장
//         eventSourceRef.current = eventSource;
//       } catch (error) {
//         setError(error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.'));
//         setIsStreaming(false);
//       }
//     },
//     [reset, processNewChunk],
//   );

//   // 컴포넌트 언마운트 시 연결 종료
//   useEffect(() => {
//     return () => {
//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//       }
//     };
//   }, []);

//   return {
//     textStream,
//     finalRecipe,
//     error,
//     isStreaming,
//     startStream,
//     reset,
//   };
// };
