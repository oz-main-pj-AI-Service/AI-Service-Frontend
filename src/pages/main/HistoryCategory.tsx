// import HistoryContentCard from '@/components/main/HistoryContentCard';
import HistoryContentCard from '@/components/main/HistoryContentCard';
import PagenationBundle from '@/components/PagenationBundle';
import { useHistoryQuery } from '@/hooks/useAiQuery';
import { useParams, useSearchParams } from 'react-router';

export default function HistoryCategory() {
  const { category } = useParams();
  const [page] = useSearchParams();
  const { data: history } = useHistoryQuery(page.get('p') || '1');
  console.log(history);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 md:px-8">
        <ul className="flex w-full flex-col gap-1">
          {/* 검색 기록 받아서 카테고리 필터 돌려서 맵돌리기 */}
          {history?.results
            // 필터링하면 원래 페이지에서 10개 있던거 중에서 필터링된 것만 나와서 1페이지에 10개를 보장할 수 없음
            // .filter((content) => content.request_type.toLowerCase() === category) // all 이면 필터하지 말아야 함
            .map((content) => <HistoryContentCard key={content.id} content={content} />)}
        </ul>

        <PagenationBundle
          currentPage={parseInt(page.get('p') ?? '1')}
          totalCount={history?.count ?? 1}
          url={`/history/${category}/page?`}
        />
      </div>
    </div>
  );
}
