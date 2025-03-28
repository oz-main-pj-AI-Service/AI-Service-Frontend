// import { loginApiTemp } from '@/api/loginApiTemp';
// import { useState, useCallback } from 'react';

// 스트리밍 데이터를 처리하는 커스텀 훅
// export default function useStreamingData() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const startStream = useCallback(async (url: string, requestData: any) => {
//     setIsLoading(true);
//     setError(null);
//     setMessages([]);

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           // Accept: 'text/event-stream',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       if (!response.body) {
//         throw new Error('ReadableStream not supported in this browser.');
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value, { stream: true });
//         const lines = chunk.split('\n').filter((line) => line.trim() !== '');

//         for (const line of lines) {
//           if (line.startsWith('data: ')) {
//             try {
//               const data = line.substring(6).trim();
//               if (data === '[DONE]') {
//                 // 스트림 종료 신호 처리
//                 break;
//               }

//               const parsedData = JSON.parse(data);
//               setMessages((prev) => [...prev, parsedData]);
//             } catch (e) {
//               // JSON이 아닌 경우 원본 텍스트 추가
//               const textData = line.substring(6);
//               setMessages((prev) => [...prev, textData]);
//             }
//           }
//         }
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const clearMessages = useCallback(() => {
//     setMessages([]);
//   }, []);

//   return {
//     messages,
//     isLoading,
//     error,
//     startStream,
//     clearMessages,
//   };
// }

import { useState } from 'react';
import { AxiosProgressEvent } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { RecipeFormInput } from '@/types/ai';
// import { API_URL } from '@/constants/url';
import api from '@/api/TokenApi';

// 후보 1
export const useStreaming2 = () => {
  const [textStream, setTextStream] = useState<string>('');

  // SSE 형식 처리를 위한 mutation
  const streamMutation = useMutation({
    mutationFn: async (input: RecipeFormInput) => {
      setTextStream('');

      // Axios 요청 생성
      const response = await api.post(`/ai/recipe-recommendation/?streaming=true`, input, {
        responseType: 'text', // 텍스트 형식으로 받기
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          const xhr = progressEvent.event.target as XMLHttpRequest;
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

  return { textStream, streamMutation };
};
