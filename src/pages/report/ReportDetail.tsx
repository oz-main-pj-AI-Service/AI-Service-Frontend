import { useParams } from 'react-router';

export default function ReportDetail() {
  const { id } = useParams();

  return (
    <main className="flex justify-center pl-[200px]">
      <section className="max-w-5xl">
        <h2>문의 {`#${id}`}</h2>
      </section>
    </main>
  );
}
