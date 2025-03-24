import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useReportsQuery } from '@/hooks/useReportsQuery';
import { Link } from 'react-router';

export default function Report() {
  const { data: reports } = useReportsQuery();
  console.log(reports);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
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
              {/* 받아와서 맵 돌리기 */}

              <li className="border-b hover:cursor-pointer hover:text-[#FFA500]">
                <Link to="/report/1" className="flex justify-between gap-2 py-2">
                  <div className="w-1/12 min-w-16 text-center">10/8</div>
                  <div className="w-1/12 min-w-16 text-center">기능 요청</div>
                  <div className="min-w-40 grow pl-4">문의사항 1</div>
                  <div className="w-1/12 min-w-16 text-center">X</div>
                </Link>
              </li>

              <li className="border-b hover:cursor-pointer hover:text-[#FFA500]">
                <Link to="/report/2" className="flex justify-between gap-2 py-2">
                  <div className="w-1/12 min-w-16 text-center">1/1</div>
                  <div className="w-1/12 min-w-16 text-center">문의</div>
                  <div className="min-w-40 grow pl-4">문의사항 2</div>
                  <div className="w-1/12 min-w-16 text-center">O</div>
                </Link>
              </li>

              <li className="border-b hover:cursor-pointer hover:text-[#FFA500]">
                <Link to="/report/3" className="flex justify-between gap-2 py-2">
                  <div className="w-1/12 min-w-16 text-center">12/30</div>
                  <div className="w-1/12 min-w-16 text-center">오류</div>
                  <div className="min-w-40 grow pl-4">문의사항 3</div>
                  <div className="w-1/12 min-w-16 text-center">X</div>
                </Link>
              </li>

              <li className="border-b hover:cursor-pointer hover:text-[#FFA500]">
                <Link to="/report/4" className="flex justify-between gap-2 py-2">
                  <div className="w-1/12 min-w-16 text-center">1/24</div>
                  <div className="w-1/12 min-w-16 text-center">기타</div>
                  <div className="min-w-40 grow pl-4">문의사항 4</div>
                  <div className="w-1/12 min-w-16 text-center">O</div>
                </Link>
              </li>
            </ul>
          </section>

          {/* 페이지네이션 */}
          {/* 기능 추가하기 + 컴포넌트화 */}
          <Pagination>
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
          </Pagination>
        </div>
      </div>
    </main>
  );
}
