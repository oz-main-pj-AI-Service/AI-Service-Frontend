import { Link, useSearchParams } from 'react-router';
import { useAdminUsersQuery } from '@/hooks/useAdminQuery';
import PagenationBundle from '@/components/PagenationBundle';

export default function AdminUsers() {
  const [page] = useSearchParams();

  const { data: users } = useAdminUsersQuery(page.get('p') ?? '1');
  console.log(users);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-bold">회원 관리</h2>

          {/* <div className="w-full border px-4 py-2">여기 아마 검색창?</div> */}
          <div className="py-4">
            {/* 리스트 말고 다른거로? */}
            <ul className="flex justify-between gap-2 border-b pb-2">
              <li className="w-1/12 min-w-60 grow text-center">이메일</li>
              <li className="w-1/12 min-w-36 grow text-center">전화번호</li>
              <li className="w-1/12 min-w-20 grow text-center">이름</li>
              <li className="w-1/12 min-w-16 text-center">활성화</li>
            </ul>

            {/* 유저 목록 */}
            <ul className="flex flex-col gap-2 py-2">
              {users?.results.map((user) => (
                <li key={user.id} className="border-b hover:cursor-pointer hover:text-[#FFA500]">
                  <Link to={`/admin/users/${user.id}`} className="flex justify-between gap-2 py-2">
                    <div className="w-1/12 min-w-60 grow text-center">{user.email}</div>
                    <div className="w-1/12 min-w-36 grow text-center">{user.phone_number}</div>
                    <div className="w-1/12 min-w-20 grow text-center">{user.nickname}</div>
                    <div className="w-1/12 min-w-16 text-center">O</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <PagenationBundle
            currentPage={parseInt(page.get('p') ?? '1')}
            totalCount={users?.count ?? 1}
            url={`/admin/users/page?`}
          />
        </section>
      </div>
    </main>
  );
}

// 검색창이 필요할 듯

// 스웨거에 PUT, PATCH 차이점 물어보기 (전체 수정 PUT이 필요한 이유가 있나?)
// 해결된듯?

// 요청 URL 등 모든 정보는 스웨거가 맞는건지 다시 한번 확인하기
