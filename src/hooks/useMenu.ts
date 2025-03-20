import { aiApi } from '@/api/aiApi';
import { AiRequest, MenuResponse } from '@/types/ai';
// import { AiRequestBody } , RawAxiosRequestHeadersfrom '@/types/ai';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
// import { RawAxiosRequestHeaders } from 'axios';

export const useMenu = () => {
  return useMutation<MenuResponse, AxiosError, AiRequest>({
    mutationFn: aiApi.getMenu,
    // onSuccess: () => {}
  });
};
