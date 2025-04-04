// import { useState } from 'react';
// import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
// import { useAdminReportDeleteQuery } from '@/hooks/useAdminQuery';
import { useSingleReportQuery } from '@/hooks/useReportsQuery';
import { useNavigate, useParams } from 'react-router';

export default function AdminReportDetail() {
  const { id } = useParams() as { id: string }; // as 없이 할 수 있는 방법 찾기
  const { data: report } = useSingleReportQuery(id);
  // const deleteReportMutation = useAdminReportDeleteQuery();
  const navigate = useNavigate();

  // const [isDeleteModalOn, setIsDeleteModalOn] = useState<boolean>(false);

  console.log(id);
  console.log(report);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-16 max-md:pb-20 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">문의 사항 상세 정보</h2>
          <div className="flex justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">{report?.title}</h2>
            {report?.admin_comment ? (
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
            <div className="pt-2">
              <pre className="whitespace-pre-wrap">{report?.description}</pre>
            </div>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">답변</h3>
            {report?.admin_comment ? (
              <div className="pt-2">
                <pre className="whitespace-pre-wrap">{report?.admin_comment}</pre>
              </div>
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
                  navigate(`/admin/reports/comment/${id}`);
                }}
              >
                답변하기
              </Button>
            )}
            {/* 확인 모달 띄우기 */}
            {/* <Button variant="destructive" onClick={() => setIsDeleteModalOn(true)}>
              삭제하기
            </Button> */}
          </div>

          {/* 삭제 모달 */}
          {/* <Modal
            isOpen={isDeleteModalOn}
            content={
              <div className="flex flex-col gap-8 py-2">
                <p>삭제 하시겠습니까?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteModalOn(false)}
                    className="w-20"
                  >
                    취소
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteReportMutation.mutate(id);
                      navigate('/admin/reports');
                    }}
                    className="w-20"
                  >
                    삭제
                  </Button>
                </div>
              </div>
            }
            closeModal={() => setIsDeleteModalOn(false)}
          /> */}
        </section>
      </div>
    </main>
  );
}
