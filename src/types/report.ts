export type ReportType = 'ERROR' | 'QUESTION' | 'FEATURE_REQUEST' | 'OTHER';

export type ReportFormInput = {
  title: string;
  description: string;
  type: ReportType;
};

// ReportFormInput 이랑 Report랑 연결하기

export type ReportStatus = 'OPEN' | 'CLOSED' | 'IN_PROGRESS' | 'RESOLVED';

export type Report = ReportFormInput & {
  id: string;
  user_id: string;
  status: ReportStatus;
  created_at: string;
  admin_id: string | null;
  admin_comment: string | null;
};

export type ReportResponse = {
  results: Report[];
  count: number;
  next: string | null; // URL이 들어옴;; 그 페이지 요청할 주소인듯
  previous: string | null; // 얘도
};
