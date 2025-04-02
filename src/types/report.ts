export type ReportType = 'ERROR' | 'QUESTION' | 'FEATURE_REQUEST' | 'OTHER';

export type ReportFormInput = Pick<Report, 'title' | 'description' | 'type'>;

// ReportFormInput 이랑 Report랑 연결하기

export type ReportStatus = 'OPEN' | 'CLOSED' | 'IN_PROGRESS' | 'RESOLVED';

export type Report = {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  user_id: string;
  status: ReportStatus;
  created_at: string;
  admin_id: string | null;
  admin_comment: string | null;
};

export type ReportResponse = {
  results: Report[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type ReportAnswerFormInput = Pick<
  Report,
  'title' | 'description' | 'type' | 'admin_comment' | 'status'
>;
