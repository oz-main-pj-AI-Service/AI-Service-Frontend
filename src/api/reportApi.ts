import { API_URL } from '@/constants/url';
import { Report, ReportFormInput, ReportResponse } from '@/types/report';
import { PAGE_SIZE } from '@/constants/common';
import api from './TokenApi';

export const reportApi = {
  getReports: async ({ page }: { page: string }) => {
    const response = await api.get<ReportResponse>(`${API_URL}/reports/`, {
      params: {
        page: parseInt(page),
        page_size: PAGE_SIZE,
      },
    });
    console.log(response.data);
    return response.data;
  },

  getSingleReport: async ({ params }: { params: { report_id: string } }) => {
    const response = await api.get<Report>(`${API_URL}/reports/${params.report_id}/`);
    return response.data;
  },

  postReport: async ({ report }: { report: ReportFormInput }) => {
    const response = await api.post<Report>(`${API_URL}/reports/`, report);
    return response.data;
  },

  editReport: async ({
    params,
    report,
  }: {
    params: { report_id: string };
    report: ReportFormInput;
  }) => {
    const response = await api.patch<Report>(`${API_URL}/reports/${params.report_id}/`, report, {
      params: {
        id: params.report_id,
      },
    });
    return response.data;
  },

  deleteReport: async ({ params }: { params: { report_id: string } }) => {
    const response = await api.delete<{ id: string; deleted_at: string }>(
      `${API_URL}/reports/${params.report_id}/`,
      {
        params: {
          id: params.report_id,
        },
      },
    );
    return response.data;
  },
};
