import {
  DietFormInput,
  HistoryResponse,
  MenuFormRequest,
  RecipeFormInput,
  SearchType,
} from '@/types/ai';
import api from './TokenApi';
import { PAGE_SIZE } from '@/constants/common';
import { AxiosError } from 'axios';

// 스트림 처리를 위한 타입 정의
export type StreamOptions = {
  onChunk: (chunk: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
};

// 스트림 응답 타입 정의
export type StreamResponse = {
  success: boolean;
};

export const aiApi = {
  // 스트림 데이터 요청 함수
  fetchStream: async (
    url: string,
    requestData: any, // :TODO any 정리
    signal: AbortSignal,
    options: StreamOptions,
  ): Promise<StreamResponse> => {
    console.log(`fetchStream 시작: ${url}`, requestData);

    try {
      const response = await api.request({
        url,
        method: 'POST',
        data: requestData,
        responseType: 'stream',
        signal,
        adapter: 'fetch',
      });

      console.log('스트림 응답 받음:', response.status);

      // 콘솔 로그에서 확인된 구조: data는 직접 ReadableStream
      if (!response.data) {
        throw new Error('응답 데이터가 없습니다');
      }

      const stream = response.data;

      // getReader 메서드 확인 (굳이)
      if (typeof stream.getReader !== 'function') {
        console.error('getReader 메서드를 찾을 수 없음:', stream);
        throw new Error('유효한 ReadableStream이 아닙니다');
      }

      // 스트림 처리
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamCompleted = false;

      try {
        while (!streamCompleted) {
          const { done, value } = await reader.read();

          if (done) {
            console.log('스트림 읽기 완료 (done=true)');
            if (buffer.trim()) {
              const data = buffer.startsWith('data: ') ? buffer.substring(6) : buffer;
              if (data.trim()) {
                options.onChunk(data);
              }
            }
            options.onComplete?.();
            break;
          }

          // 바이트 배열을 텍스트로 디코딩
          const text = decoder.decode(value, { stream: true });
          buffer += text;

          // 완전한 라인만 처리하기 위한 로직
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            // SSE 형식 처리
            const data = line.startsWith('data: ') ? line.substring(6) : line;

            // 완료 메시지 확인
            if (data.trim() === '[DONE]') {
              console.log('스트림 완료 메시지 받음: [DONE]');
              streamCompleted = true;
              options.onComplete?.();
              break;
            }

            if (data.trim()) {
              options.onChunk(data);
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('스트림 읽기 중단됨');
        } else {
          console.error('스트림 읽기 오류:', err);
          if (err instanceof Error) {
            options.onError?.(err);
          }
          throw err;
        }
      } finally {
        console.log('스트림 읽기 정리 작업');
        reader.releaseLock();
      }

      return { success: true };
    } catch (error) {
      if (error instanceof AxiosError && error.code === 'ERR_CANCELED') {
        console.log('요청이 중단됨');
      } else if (error instanceof Error) {
        console.error('스트림 요청 오류:', error.message);
        options.onError?.(error);
      }
      throw error;
    }
  },

  // 각 엔드포인트별 스트림 요청 함수
  getRecipeStream: (
    requestData: RecipeFormInput,
    signal: AbortSignal,
    options: StreamOptions,
  ): Promise<StreamResponse> => {
    return aiApi.fetchStream(
      '/ai/recipe-recommendation/?streaming=true',
      requestData,
      signal,
      options,
    );
  },

  getMenuStream: (
    requestData: MenuFormRequest,
    signal: AbortSignal,
    options: StreamOptions,
  ): Promise<StreamResponse> => {
    return aiApi.fetchStream(
      '/ai/food-recommendation/?streaming=true',
      requestData,
      signal,
      options,
    );
  },

  getDietStream: (
    requestData: DietFormInput,
    signal: AbortSignal,
    options: StreamOptions,
  ): Promise<StreamResponse> => {
    return aiApi.fetchStream(
      '/ai/health-recommendation/?streaming=true',
      requestData,
      signal,
      options,
    );
  },

  // getHistory: async (
  //   page: string,
  //   requestType: SearchType = 'all',
  //   search?: string | null,
  // ) => {
  //   const response = await api.get<HistoryResponse>(`/ai/food-result/`, {
  //     params: {
  //       page: parseInt(page),
  //       page_size: PAGE_SIZE,
  //       request_type: requestType,
  //     },
  //   });
  //   return response.data;
  // },
  getHistory: async (page: string, requestType: SearchType = 'all', search?: string | null) => {
    const params: any = {
      page: parseInt(page),
      page_size: PAGE_SIZE,
      request_type: requestType,
    };

    if (search) params.search = search;

    const response = await api.get<HistoryResponse>(`/ai/food-result/`, {
      params,
    });
    return response.data;
  },
};

// 구글 genai 설치해야함
// import { GoogleGenAI } from '@google/genai';
// import { useEffect, useState } from 'react';

// const API_KEY = 'AIzaSyC8NCjtnxjXO7iJI9sl-hZ87uvg7U_e3WY';

// export default function App() {
//   const [data, setData] = useState();
//   const ai = new GoogleGenAI({ apiKey: API_KEY });

//   const generate = async (prompt) => {
//     const response = await ai.models.generateContentStream({
//       model: 'gemini-2.0-flash-001',
//       contents: prompt,
//     });

//     for await (const chunk of response) {
//       console.log(chunk.text);
//       setData((prev) => prev + chunk.text);
//       // return chunk.text;
//     }
//     // console.log(response.text);
//     // console.log(response)
//   };

//   useEffect(() => {
//     generate('감자 당근 양파 기본양념으로 만들 수 있는 레시피 5개 알려줘');
//   }, []);

//   return (
//     <p>{data}</p>
//   );
// }

// https://googleapis.github.io/js-genai/
// 여기 참고
// 스트리밍. 이걸 리팩토링해서 하나의 훅으로
// 탠스택 쿼리로 씌워서 더 깔끔하게
