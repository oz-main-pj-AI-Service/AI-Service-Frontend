export default function Admin() {
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2>관리자 페이지</h2>
          <p>존재의 의미가 뭐지?</p>
          <p>그냥 유저 관리 페이지로 리다이렉트?</p>
          <p>하위 라우팅 중에 메인을 정하기 애매하면 그중 하나로 걍 리다이렉트?</p>
          <p>ai 검색 결과 / 문의 사항 / 어드민</p>
          <p>이거 세개가 아마 요게 필요할지도</p>
        </section>
      </div>
    </main>
  );
}
