import { loginApiTemp } from '@/api/loginApiTemp';
import { reportApi } from '@/api/reportApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReportFormInput } from '@/types/report';

export const useReportsQuery = () => {
  return useQuery<Report[], AxiosError>({
    queryKey: ['reports'],
    queryFn: () =>
      reportApi.getReports({
        headers: {
          Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
        },
      }),
    enabled: !!loginApiTemp.getAccessTokenTemp(),
  });
};

export const usePostReportQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<Report, AxiosError, ReportFormInput>({
    mutationFn: (report) =>
      reportApi.postReport({
        report,
        headers: {
          Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};
