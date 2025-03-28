import { API_URL } from '@/constants/url';
import axios, { RawAxiosRequestHeaders } from 'axios';
import { Report, ReportFormInput, ReportResponse } from '@/types/report';
import { PAGE_SIZE } from '@/constants/common';

export const reportApi = {
  getReports: async ({ headers, page }: { headers: RawAxiosRequestHeaders; page: string }) => {
    const response = await axios.get<ReportResponse>(`${API_URL}/reports/`, {
      headers: headers,
      params: {
        page: parseInt(page),
        page_size: PAGE_SIZE,
      },
    });
    return response.data;
  },

  getSingleReport: async ({
    params,
    headers,
  }: {
    params: { report_id: string };
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.get<Report>(`${API_URL}/reports/${params.report_id}/`, {
      headers: headers,
    });
    return response.data;
  },

  postReport: async ({
    report,
    headers,
  }: {
    report: ReportFormInput;
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.post<Report>(`${API_URL}/reports/`, report, {
      headers: headers,
    });
    return response.data;
  },

  editReport: async ({
    params,
    report,
    headers,
  }: {
    params: { report_id: string };
    report: ReportFormInput;
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.patch<Report>(`${API_URL}/reports/${params.report_id}/`, report, {
      headers: headers,
      params: {
        id: params.report_id,
      },
    });
    return response.data;
  },

  deleteReport: async ({
    params,
    headers,
  }: {
    params: { report_id: string };
    headers: RawAxiosRequestHeaders;
  }) => {
    const response = await axios.delete<{ id: string; deleted_at: string }>(
      `${API_URL}/reports/${params.report_id}/`,
      {
        headers: headers,
        params: {
          id: params.report_id,
        },
      },
    );
    return response.data;
  },
};
