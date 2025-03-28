import { Link } from 'react-router';

export default function AdminAi() {
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">AI 로그 관리</h2>

          <div className="w-full border px-4 py-2">여기 아마 검색창?</div>

          <section className="py-4">
            {/* 리스트 말고 다른거로? */}
            <ul className="flex justify-between gap-2 border-b pb-2">
              <li className="w-1/12 min-w-60 grow text-center">이메일</li>
              <li className="w-1/12 min-w-36 grow text-center">전화번호</li>
              <li className="w-1/12 min-w-20 grow text-center">이름</li>
              <li className="w-1/12 min-w-16 text-center">활성화</li>
            </ul>

            {/* 문의 사항 목록 */}
            <ul className="flex flex-col gap-2 py-2">
              <li className="border-b hover:cursor-pointer hover:text-[#FFA500]">
                <Link to={`/admin/ai/1`} className="flex justify-between gap-2 py-2">
                  <div className="w-1/12 min-w-60 grow text-center">
                    accountsample1234@gmail.com
                  </div>
                  <div className="w-1/12 min-w-36 grow text-center">010-1234-5678</div>
                  <div className="w-1/12 min-w-20 grow text-center">홍길동</div>
                  <div className="w-1/12 min-w-16 text-center">O</div>
                </Link>
              </li>
              {/* 받아와서 맵 돌리기 (서스펜스쿼리로 바꾸면 ? 떼기)
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
                    <Link to={`/report/${report.id}`} className="flex justify-between gap-2 py-2">
                      <div className="w-1/12 min-w-16 text-center">{formattedDate}</div>
                      <div className="w-1/12 min-w-16 text-center">{formattedType}</div>
                      <div className="min-w-40 grow pl-4">{report.title}</div>
                      <div className="w-1/12 min-w-16 text-center">{formattedStatus}</div>
                    </Link>
                  </li>
                );
              })} */}
            </ul>
          </section>

          {/* 페이지네이션 */}
          {/* 기능 추가하기 + 컴포넌트화 */}
          {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </section>
      </div>
    </main>
  );
}
