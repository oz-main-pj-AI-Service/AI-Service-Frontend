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
    },
    // 유효성 검사
    // resolver: zodResolver(reportFormSchema),
  });

  // 새로고침해도 디폴트 값 유지
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
    navigate('/report');
  };

  return <ReportForm form={form} onSubmit={onSubmit} submitText="수정" />;
}
