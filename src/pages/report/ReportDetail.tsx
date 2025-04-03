import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { useDeleteReportQuery, useSingleReportQuery } from '@/hooks/useReportsQuery';
import { formatDateYMD, formatReportTypeToText } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function ReportDetail() {
  const { id } = useParams() as { id: string }; // as 없이 할 수 있는 방법 찾기
  console.log(id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const { data: report } = useSingleReportQuery(id);
  console.log(report);

  const navigate = useNavigate();
  const deleteReportMutation = useDeleteReportQuery();

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6">
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

          <div className="flex justify-between gap-2 text-zinc-500 dark:text-zinc-400">
            <span>유형: {formatReportTypeToText(report?.type ?? 'OTHER')}</span>
            <span>날짜: {formatDateYMD(report?.created_at ?? '')}</span>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">문의</h3>
            <p className="pt-2">
              <span className="font-extralight whitespace-pre-wrap text-zinc-600 dark:text-zinc-200">
                {report?.description}
              </span>
            </p>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">답변</h3>
            {report?.admin_comment ? (
              <p className="pt-2 font-extralight whitespace-pre-wrap text-zinc-600 dark:text-zinc-200">
                <span>{report?.admin_comment}</span>
              </p>
            ) : (
              <p className="pt-2 font-extralight whitespace-pre-wrap text-zinc-600 dark:text-zinc-200">
                <span>답변 대기 중</span>
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 max-sm:justify-between">
            {report?.admin_comment ? (
              <Button variant="outline" disabled className="max-sm:w-[48%] md:px-12 md:py-5">
                수정하기
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
                className="max-sm:w-[48%] md:px-12 md:py-5"
              >
                수정하기
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() => setIsDeleteModalOpen(true)}
              className="max-sm:w-[48%] md:px-12 md:py-5"
            >
              삭제하기
            </Button>
          </div>

          {/* 수정 모달 */}
          <Modal
            isOpen={isEditModalOpen}
            content={
              <div className="flex flex-col gap-8 py-2">
                <p>수정 하시겠습니까?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-20"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/report/edit/${id}`);
                    }}
                    className="w-20"
                  >
                    수정
                  </Button>
                </div>
              </div>
            }
            closeModal={() => setIsEditModalOpen(false)}
          />

          {/* 삭제 모달 */}
          <Modal
            isOpen={isDeleteModalOpen}
            content={
              <div className="flex flex-col gap-8 py-2">
                <p>삭제 하시겠습니까?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-20"
                  >
                    취소
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteReportMutation.mutate(id);
                      navigate('/report/page?p=1');
                    }}
                    className="w-20"
                  >
                    삭제
                  </Button>
                </div>
              </div>
            }
            closeModal={() => setIsDeleteModalOpen(false)}
          />
        </section>
      </div>
    </main>
  );
}
