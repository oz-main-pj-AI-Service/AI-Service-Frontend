import { useForm } from 'react-hook-form';
import { ReportFormInput } from '@/types/report';
import { usePostReportQuery } from '@/hooks/useReportsQuery';
import { useNavigate } from 'react-router';
import ReportForm from '@/components/report/ReportForm';

export default function ReportPost() {
  const navigate = useNavigate();
  const reportMutation = usePostReportQuery();
  console.log(reportMutation);

  const form = useForm<ReportFormInput>({
    defaultValues: {
      title: '', // 이게 없으면 undefined 로 시작해서 오류 발생, main쪽에선 안 그렇던데, 왜?
      description: '',
    },
    // 유효성 검사
    // resolver: zodResolver(reportFormSchema),
  });

  const onSubmit = (data: ReportFormInput) => {
    console.log(data);

    reportMutation.mutate(data);
    navigate('/report/page?p=1');
  };

  return (
    <ReportForm
      form={form}
      onSubmit={onSubmit}
      submitText="등록"
      onCancel={() => navigate('/report/page?p=1')}
    />
  );
}
