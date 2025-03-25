export type ReportType = 'ERROR' | 'QUESTION' | 'FEATURE_REQUEST' | 'OTHER';

export type ReportFormInput = {
  title: string;
  description: string;
  type: ReportType;
};

export type ReportStatus = 'OPEN' | 'CLOSED' | 'IN_PROGRESS' | 'RESOLVED';

export type Report = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: ReportStatus;
  type: ReportType;
  created_at: string;
  admin_id: string | null;
};
