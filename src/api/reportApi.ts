import { API_URL } from '@/constants/url';
import axios, { RawAxiosRequestHeaders } from 'axios';
// import { loginApiTemp } from './loginApiTemp';
import { ReportFormInput } from '@/types/report';

// const headers: RawAxiosRequestHeaders = {
//   Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
// };

// const headersWithContent: RawAxiosRequestHeaders = {
//   Authorization: `Bearer ${loginApiTemp.getAccessTokenTemp()}`,
//   'Content-Type': 'application/json',
// };

export const reportApi = {
  getReports: async ({ headers }: { headers: RawAxiosRequestHeaders }) => {
    const response = await axios.get<Report[]>(`${API_URL}/reports/`, {
      headers: headers,
      params: {
        page: 1,
        page_size: 10,
      },
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
};
