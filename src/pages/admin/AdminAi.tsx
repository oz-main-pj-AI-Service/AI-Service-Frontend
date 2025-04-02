import { useNavigate, useParams, useSearchParams } from 'react-router';
import PagenationBundle from '@/components/PagenationBundle';
import { useHistoryQuery } from '@/hooks/useAiQuery';
import LogContentCard from '@/components/admin/LogContentCard';
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
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AdminAi() {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const [page] = useSearchParams();
  const { category } = useParams();

  let categoryValue = category;
  switch (category) {
    case 'all':
      categoryValue = '';
      break;
    case 'recipe':
      categoryValue = 'RECIPE';
      break;
    case 'menu':
      categoryValue = 'FOOD';
      break;
    case 'diet':
      categoryValue = 'HEALTH';
      break;
  }

  const { data: logs } = useHistoryQuery(page.get('p') || '1', categoryValue as SearchType, search);
  console.log(logs);

  const handleCategoryChange = (value: SearchType) => {
    navigate(`/admin/ai/${value}/page?p=1`);
  };

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">AI 로그 관리</h2>

          <div className="mx-auto flex w-full gap-4">
            <Select defaultValue={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-1/3">
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

            {/* 쓰로틀링: 3초? */}
            <Input
              placeholder="이메일을 입력하세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow"
            />
          </div>

          <ul className="flex w-full flex-col gap-1">
            {logs?.results.map((content) => <LogContentCard key={content.id} content={content} />)}
          </ul>

          {/* 페이지네이션 */}
          <PagenationBundle
            currentPage={parseInt(page.get('p') ?? '1')}
            totalCount={logs?.count ?? 1}
            url="/admin/ai/page?"
          />
        </section>
      </div>
    </main>
  );
}
