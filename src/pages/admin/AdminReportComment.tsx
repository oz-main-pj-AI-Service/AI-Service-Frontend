import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormLabel, FormItem, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useSingleReportQuery } from '@/hooks/useReportsQuery';
import { ReportAnswerFormInput } from '@/types/report';
import { useParams } from 'react-router';
import { useAdminReportCommentQuery } from '@/hooks/useAdminQuery';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminReportComment() {
  const { id } = useParams() as { id: string };
  const { data: report } = useSingleReportQuery(id);
  const reportCommentMutation = useAdminReportCommentQuery(id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<ReportAnswerFormInput>({
    defaultValues: {
      title: report?.title,
      type: report?.type,
      status: 'RESOLVED',
      description: report?.description,
      admin_comment: report?.admin_comment || '',
    },
  });

  const onSubmit = (data: ReportAnswerFormInput) => {
    console.log(data);

    if (data.admin_comment === '') {
      data.status = 'OPEN';
      data.admin_comment = null;
    }

    reportCommentMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reports', id] });
        navigate(`/admin/reports/detail/${id}`);
      },
    });
  };

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-16 max-md:pb-20 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">문의 사항 답변하기</h2>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">{report?.title}</h3>
            <div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                문의 유형: {report?.type}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                문의 날짜: {report?.created_at}
              </span>
            </div>
            <p className="pt-2">
              <span className="whitespace-pre-wrap">{report?.description}</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="admin_comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="내용을 입력하세요."
                        className="min-h-60 resize-none"
                        {...field}
                        value={field.value || ''} // null 값이 들어올 수 있어 빈 문자열로 처리
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">답변하기</Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
