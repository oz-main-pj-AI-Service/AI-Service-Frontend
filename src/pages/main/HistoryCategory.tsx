// import HistoryContentCard from '@/components/main/HistoryContentCard';
import HistoryContentCard from '@/components/main/HistoryContentCard';
import PagenationBundle from '@/components/PagenationBundle';
import { useHistoryQuery } from '@/hooks/useAiQuery';
import { useParams, useSearchParams } from 'react-router';

export default function HistoryCategory() {
  const { category } = useParams();
  const [page] = useSearchParams();
  const { data } = useHistoryQuery(page.get('p') || '1');
  console.log(data);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 md:px-8">
        <ul className="flex w-full flex-col gap-1">
          {/* 검색 기록 받아서 맵돌리기 */}
          {data?.results.map((content) => (
            <HistoryContentCard key={content.id} content={content} />
          ))}

          <PagenationBundle
            currentPage={parseInt(page.get('p') || '1')}
            totalCount={data?.count || 1}
            url={`/history/${category}/page?`}
          />
        </ul>
      </div>
    </div>
  );
}
