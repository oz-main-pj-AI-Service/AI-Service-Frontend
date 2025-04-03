import { useReportsQuery } from '@/hooks/useReportsQuery';
import { Link, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import PagenationBundle from '@/components/PagenationBundle';
import { formatDateMD } from '@/lib/utils';

export default function Report() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('p') || '1';
  console.log(page);

  const { data: reports } = useReportsQuery(page);
  console.log(reports);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between pb-2">
            <h2 className="my-4 text-2xl font-bold">내 문의사항</h2>
            <Link to="/report/post">
              <Button>문의하기</Button>
            </Link>
          </div>

          <section className="py-4">
            {/* 리스트 말고 다른거로? */}
            <ul className="flex justify-between gap-2 border-b pb-2">
              <li className="w-1/12 min-w-16 text-center">날짜</li>
              <li className="w-1/12 min-w-16 text-center">유형</li>
              <li className="min-w-40 grow text-center">제목</li>
              <li className="w-1/12 min-w-16 text-center">답변 여부</li>
            </ul>

            {/* 문의 사항 목록 */}
            <ul className="flex flex-col gap-2 py-2">
              {/* 받아와서 맵 돌리기 (서스펜스쿼리로 바꾸면 ? 떼기) */}
              {reports?.results.map((report) => {
                // 여기 데이터 다듬는거 함수로 분리
                let formattedType = '';
                switch (report.type) {
                  case 'ERROR':
                    formattedType = '오류';
                    break;
                  case 'QUESTION':
                    formattedType = '문의';
                    break;
                  case 'FEATURE_REQUEST':
                    formattedType = '기능 요청';
                    break;
                  case 'OTHER':
                    formattedType = '기타';
                    break;
                }

                let formattedStatus = '';
                switch (report.status) {
                  case 'RESOLVED':
                    formattedStatus = 'O';
                    break;
                  default:
                    formattedStatus = 'X';
                }

                return (
                  <li
                    key={report.id}
                    className="border-b hover:cursor-pointer hover:text-[#FFA500]"
                  >
                    <Link to={`/report/${report.id}`} className="flex justify-between gap-2 py-2">
                      <div className="w-1/12 min-w-16 text-center">
                        {formatDateMD(report.created_at)}
                      </div>
                      <div className="w-1/12 min-w-16 text-center">{formattedType}</div>
                      <div className="min-w-40 grow pl-4">{report.title}</div>
                      <div className="w-1/12 min-w-16 text-center">{formattedStatus}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* 페이지네이션 */}
          {reports && (
            <PagenationBundle
              currentPage={parseInt(page)}
              totalCount={reports.count}
              url={`/report/page?`}
            />
          )}
        </div>
      </div>
    </main>
  );
}
