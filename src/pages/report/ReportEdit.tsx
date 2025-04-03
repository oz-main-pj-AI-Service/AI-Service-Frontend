import ReportForm from '@/components/report/ReportForm';
import { useEditReportQuery, useSingleReportQuery } from '@/hooks/useReportsQuery';
import { ReportFormInput } from '@/types/report';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

export default function ReportEdit() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { data: report } = useSingleReportQuery(id);
  console.log(report);
  const editMutation = useEditReportQuery(id);

  const form = useForm<ReportFormInput>({
    defaultValues: {
      title: '',
      description: '',
      type: report?.type,
    },
    // 유효성 검사
    // resolver: zodResolver(reportFormSchema),
  });

  // 새로고침해야 타입이 들어감
  // 로딩 상태 추가하면 해결될듯
  useEffect(() => {
    if (report) {
      form.reset({
        title: report.title,
        type: report.type,
        description: report.description,
      });
    }
  }, [report, form]);

  const onSubmit = (data: ReportFormInput) => {
    console.log(data);
    editMutation.mutate(data);
    // 모달
    navigate(`/report/${id}`);
  };

  return (
    <ReportForm
      form={form}
      onSubmit={onSubmit}
      submitText="수정"
      onCancel={() => navigate(`/report/${id}`)}
    />
  );
}
