import { Button } from '@/components/ui/button';
import { useDeleteReportQuery, useSingleReportQuery } from '@/hooks/useReportsQuery';
import { useNavigate, useParams } from 'react-router';

export default function ReportDetail() {
  const { id } = useParams() as { id: string }; // as 없이 할 수 있는 방법 찾기
  console.log(id);

  const { data: report } = useSingleReportQuery(id);
  console.log(report);

  const navigate = useNavigate();
  const deleteReportMutation = useDeleteReportQuery();

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <div className="flex justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">{report?.title}</h2>
            {report?.status === 'CLOSED' ? (
              <div className="flex items-center rounded-lg bg-teal-900 px-2 py-1 text-sm text-white">
                답변 완료
              </div>
            ) : (
              <div className="flex items-center rounded-lg bg-zinc-800 px-2 py-1 text-sm text-white">
                답변 대기
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-zinc-500 dark:text-zinc-400">
            <span>id (테스트 용): {id}</span>
            {/* 여기도 데이터 다듬는거 함수로 분리 해놓으면 그거 가져다가 쓰기 */}
            <span>문의 날짜: {report?.created_at}</span>
            <span>문의 유형: {report?.type}</span>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">문의</h3>
            <p className="pt-2">
              <span className="whitespace-pre-wrap">{report?.description}</span>
            </p>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">답변</h3>
            {report?.status === 'CLOSED' ? (
              <p className="pt-2">
                <span>{report?.admin_comment}</span>
              </p>
            ) : (
              <p className="pt-2">
                <span>답변 대기 중</span>
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            {report?.status === 'CLOSED' ? (
              <Button variant="outline" disabled>
                수정하기
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  navigate(`/report/edit/${id}`);
                }}
              >
                수정하기
              </Button>
            )}
            {/* 확인 모달 띄우기 */}
            <Button
              onClick={() => {
                deleteReportMutation.mutate(id);
                navigate('/report');
              }}
            >
              삭제하기
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
