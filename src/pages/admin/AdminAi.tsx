import { useSearchParams } from 'react-router';
import PagenationBundle from '@/components/PagenationBundle';
import { useHistoryQuery } from '@/hooks/useAiQuery';
import LogContentCard from '@/components/admin/LogContentCard';

export default function AdminAi() {
  const [page] = useSearchParams();
  const { data: logs } = useHistoryQuery(page.get('p') || '1');
  console.log(typeof logs);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">AI 로그 관리</h2>

          <div className="w-full border px-4 py-2">여기 아마 검색창?</div>

          <ul className="flex w-full flex-col gap-1">
            {/* 검색 기록 받아서 카테고리 필터 돌려서 맵돌리기 */}
            {logs?.results
              // 필터링하면 원래 페이지에서 10개 있던거 중에서 필터링된 것만 나와서 1페이지에 10개를 보장할 수 없음
              // .filter((content) => content.request_type.toLowerCase() === category) // all 이면 필터하지 말아야 함
              .map((content) => <LogContentCard key={content.id} content={content} />)}
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
