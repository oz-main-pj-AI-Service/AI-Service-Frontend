import { loginApiTemp } from '@/api/loginApiTemp';
import { API_URL } from '@/constants/url';
import { RecipeFormInput } from '@/types/ai';
import { useState } from 'react';

interface StreamResponse {
  content?: string;
  done?: boolean;
}

export const useOnlyFetch = () => {
  const [streamText, setStreamText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startStream = async (requestBody: RecipeFormInput) => {
    setIsLoading(true);
    setStreamText('');

    try {
      const response = await fetch(`${API_URL}/ai/recipe-recommendation/?streaming=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
          // Accept: 'text/event-stream', // 이거 넣으면 406
          // 'Cache-Control': 'no-cache', // 이거 넣으면 CORS
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log('Received chunk:', chunk); // 디버깅용

        buffer += chunk;

        // SSE 메시지는 \n\n으로 구분됨
        const messages = buffer.split('\n\n');
        buffer = messages.pop() || ''; // 마지막 항목은 불완전할 수 있음

        for (const message of messages) {
          // 빈 메시지 건너뛰기
          if (!message.trim()) continue;

          // 'data: ' 접두사 확인
          if (message.includes('data: ')) {
            const dataStr = message
              .split('\n')
              .filter((line) => line.startsWith('data: '))
              .map((line) => line.substring(6))
              .join('');

            if (dataStr === '[DONE]') {
              console.log('Stream complete');
              continue;
            }

            try {
              const data: StreamResponse = JSON.parse(dataStr);
              if (data.content) {
                setStreamText((prev) => prev + data.content);
              }
            } catch (e) {
              // JSON이 아닌 경우 텍스트로 처리
              setStreamText((prev) => prev + dataStr);
            }
          } else {
            // 'data: ' 접두사가 없는 경우 (비표준)
            setStreamText((prev) => prev + message);
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { streamText, isLoading, startStream };
};
