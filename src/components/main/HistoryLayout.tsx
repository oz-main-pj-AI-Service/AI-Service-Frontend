import { Outlet } from 'react-router';

export default function HistoryLayout() {
  return (
    <main className="flex justify-center pl-[200px]">
      <section className="max-w-5xl">
        <h2>검색 기록 보기</h2>
        <Outlet />
      </section>
    </main>
  );
}
