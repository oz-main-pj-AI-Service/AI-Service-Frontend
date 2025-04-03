import { SearchType } from '@/types/ai';
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Outlet, useNavigate, useParams } from 'react-router';

export default function HistoryLayout() {
  const { category } = useParams();
  console.log(category);
  const navigate = useNavigate();

  const handleCategoryChange = (value: SearchType) => {
    navigate(`/history/${value}/page?p=1`);
  };

  // 서치바?

  return (
    <main className="fixed inset-0 flex flex-col max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <div className="bg-background flex w-full flex-col items-center py-4">
        <h2 className="text-center text-xl font-bold md:text-2xl">검색 기록 보기</h2>

        <div className="mx-auto w-full max-w-md p-4">
          <Select defaultValue={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="카테고리를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리</SelectLabel>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="recipe">레시피</SelectItem>
                <SelectItem value="menu">메뉴</SelectItem>
                <SelectItem value="diet">식단</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="w-full max-w-5xl border px-4 py-2">여기 아마 검색창? / 카테고리 아직</div> */}
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}
