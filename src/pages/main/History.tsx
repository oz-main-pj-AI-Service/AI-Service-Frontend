// import HistoryContentCard from '@/components/main/HistoryContentCard';
import HistoryContentCard from '@/components/main/HistoryContentCard';
import PagenationBundle from '@/components/PagenationBundle';
import { useHistoryQuery } from '@/hooks/useAiQuery';
import { useParams, useSearchParams } from 'react-router';
import { SearchType } from '@/types/ai';

export default function History() {
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

  const { data: history } = useHistoryQuery(page.get('p') || '1', categoryValue as SearchType);
  console.log(history);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 md:px-8">
        <ul className="flex w-full flex-col gap-1">
          {history?.results.map((content) => (
            <HistoryContentCard key={content.id} content={content} />
          ))}
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
