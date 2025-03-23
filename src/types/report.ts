export type ReportFormInput = {
  title: string;
  description: string;
  type: ReportType;
};

export type ReportType = 'ERROR' | 'QUESTION' | 'FEATURE_REQUEST' | 'OTHER';

export type Report = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: string; // 여기 OPEN 말고 타입 또 뭐있는지 문의
  type: ReportType;
  created_at: string;
  admin_id: string | null;
};
