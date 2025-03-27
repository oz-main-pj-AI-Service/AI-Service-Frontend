import { loginApiTemp } from '@/api/loginApiTemp';
import { reportApi } from '@/api/reportApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Report, ReportFormInput, ReportResponse } from '@/types/report';

export const useReportsQuery = (page: string) => {
  return useQuery<ReportResponse, AxiosError>({
    queryKey: ['reports', page],
    queryFn: () =>
      reportApi.getReports({
        headers: {
          Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
        },
        page: page,
      }),
    enabled: !!loginApiTemp.getAccessTokenTemp(),
  });
};

export const useSingleReportQuery = (id: string) => {
  return useQuery<Report, AxiosError>({
    queryKey: ['reports', id],
    queryFn: () =>
      reportApi.getSingleReport({
        params: {
          report_id: id,
        },
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

export const useEditReportQuery = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Report, AxiosError, ReportFormInput>({
    mutationFn: (report) =>
      reportApi.editReport({
        params: { report_id: id },
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

export const useDeleteReportQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<{ id: string; deleted_at: string }, AxiosError, string>({
    mutationFn: (id) =>
      reportApi.deleteReport({
        params: { report_id: id },
        headers: {
          Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};
