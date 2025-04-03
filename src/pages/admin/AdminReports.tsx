import PagenationBundle from '@/components/PagenationBundle';
import { useReportsQuery } from '@/hooks/useReportsQuery';
import { Link, useSearchParams } from 'react-router';

export default function AdminReports() {
  const [page] = useSearchParams();

  const { data: reports } = useReportsQuery(page.get('p') ?? '1');
  console.log(reports);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-16 max-md:pb-20 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">문의 사항 관리</h2>

          {/* <div className="w-full border px-4 py-2">여기 아마 검색창?</div> */}

          <section className="py-4">
            {/* 리스트 말고 다른거로? */}
            <ul className="flex justify-between gap-2 border-b pb-2">
              <li className="w-1/12 min-w-16 text-center">날짜</li>
              <li className="w-1/12 min-w-16 text-center">유형</li>
              <li className="min-w-40 grow text-center">제목</li>
              <li className="w-1/12 min-w-16 text-center">답변 여부</li>
            </ul>

            {/* <ul className="flex flex-col gap-2 py-2">
            <li className="border-b hover:cursor-pointer hover:text-[#FFA500]">
              <Link to={`/admin/reports/1`} className="flex justify-between gap-2 py-2">
                <div className="w-1/12 min-w-60 grow text-center">accountsample1234@gmail.com</div>
                <div className="w-1/12 min-w-36 grow text-center">010-1234-5678</div>
                <div className="w-1/12 min-w-20 grow text-center">홍길동</div>
                <div className="w-1/12 min-w-16 text-center">O</div>
              </Link>
            </li>
          </ul> */}

            {/* 문의 사항 목록 */}
            <ul className="flex flex-col gap-2 py-2">
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

                const date = new Date(report.created_at);
                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

                return (
                  <li
                    key={report.id}
                    className="border-b hover:cursor-pointer hover:text-[#FFA500]"
                  >
                    <Link
                      to={`/admin/reports/detail/${report.id}`}
                      className="flex justify-between gap-2 py-2"
                    >
                      <div className="w-1/12 min-w-16 text-center">{formattedDate}</div>
                      <div className="w-1/12 min-w-16 text-center">{formattedType}</div>
                      <div className="min-w-40 grow pl-4">{report.title}</div>
                      <div className="w-1/12 min-w-16 text-center">{formattedStatus}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <PagenationBundle
            currentPage={parseInt(page.get('p') ?? '1')}
            totalCount={reports?.count ?? 1}
            url="/admin/reports/page?"
          />
        </div>
      </div>
    </main>
  );
}
