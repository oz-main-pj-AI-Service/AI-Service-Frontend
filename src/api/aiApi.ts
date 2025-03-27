import { API_URL } from '@/constants/url';
import {
  DietFormInput,
  DietResponse,
  MenuFormRequest,
  MenuResponse,
  RecipeFormInput,
  RecipeResponse,
} from '@/types/ai';
import axios, { RawAxiosRequestHeaders } from 'axios';

export const aiApi = {
  getMenu: async ({
    requestBody,
    headers,
  }: {
    requestBody: MenuFormRequest;
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.post<MenuResponse>(
      `${API_URL}/ai/food-recommendation/`,
      requestBody,
      { headers },
    );
    return response.data;
  },

  getDiet: async ({
    requestBody,
    headers,
  }: {
    requestBody: DietFormInput;
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.post<DietResponse>(
      `${API_URL}/ai/health-recommendation/`,
      requestBody,
      { headers },
    );
    return response.data;
  },

  getRecipe: async ({
    requestBody,
    headers,
  }: {
    requestBody: RecipeFormInput;
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.post<RecipeResponse>(
      `${API_URL}/ai/recipe-recommendation/`,
      requestBody,
      { headers },
    );
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
