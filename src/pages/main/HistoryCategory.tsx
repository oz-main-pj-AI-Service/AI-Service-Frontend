import { useParams } from 'react-router';

export default function HistoryCategory() {
  const { category } = useParams();

  return (
    <main className="flex justify-center">
      <section className="max-w-5xl">
        <h2>{`카테고리: ${category}`}</h2>
      </section>
    </main>
  );
}
