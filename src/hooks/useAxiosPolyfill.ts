// import { useEffect } from 'react';
// import api from '@/api/TokenApi';
// import { API_URL } from '@/constants/url';
// import { Recipe, RecipeFormInput, RecipeStreamResult } from '@/types/ai';
// import { useCallback, useRef, useState } from 'react';
// import { EventSourcePolyfill } from 'event-source-polyfill';

// export const useEventSourceRecipeStream = (): RecipeStreamResult => {
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
//     async (requestData: RecipeFormInput) => {
//       reset();
//       setIsStreaming(true);

//       try {
//         // 1. 먼저 api 인스턴스를 통해 토큰 상태 확인
//         // 이 요청은 실제 전송되지 않고, 인터셉터만 통과시킬 목적
//         await api.request({
//           url: '/_check_auth',
//           method: 'HEAD',
//           _dryRun: true, // 실제로 요청을 보내지 않는 플래그 (인터셉터에서 처리 필요)
//         });

//         // 여기까지 오면 토큰이 유효하다는 의미
//         const token = localStorage.getItem('access_temp');

//         // API URL 설정
//         const url = `${API_URL}/api/ai/recipe-recommendation/?streaming=true`;

//         // EventSource 생성 (토큰 직접 적용)
//         const eventSource = new EventSourcePolyfill(url, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
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
//         // 인터셉터에서 토큰 오류가 발생하면 여기서 처리됨
//         // 이미 TokenApi 인터셉터에서 리다이렉트 등의 처리가 되었을 것
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
