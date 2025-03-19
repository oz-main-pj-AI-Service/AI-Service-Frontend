import { useSearchParams } from 'react-router';

export default function HistorySearch() {
  const [search] = useSearchParams();
  const searchParams = search.get('query');

  return (
    <main className="flex h-full items-center justify-center pt-14 pl-[200px]">
      <section className="max-w-5xl">
        <h2>{`검색 기록: ${searchParams}`}</h2>
      </section>
    </main>
  );
}
