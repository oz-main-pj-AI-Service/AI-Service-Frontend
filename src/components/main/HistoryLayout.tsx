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
import { Outlet, useNavigate } from 'react-router';

export default function HistoryLayout() {
  const navigate = useNavigate();

  const handleCategoryChange = (value: SearchType) => {
    if (value === 'all') {
      navigate('/history');
    } else {
      navigate(`/history/${value}`);
    }
  };

  // 서치바?

  return (
    <main className="flex h-full w-full flex-col pt-14 pl-[200px]">
      <div className="bg-background sticky top-0 z-10 flex w-full flex-col items-center py-4">
        <h2 className="text-center text-2xl font-bold">검색 기록 보기</h2>

        <div className="mx-auto mt-4 w-full max-w-md px-4">
          <Select onValueChange={handleCategoryChange}>
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
      </div>

      <div className="w-full flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}
