import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';

export default function ReportDetail() {
  const { id } = useParams();

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <div className="flex justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">문의 제목 {`#${id}`}</h2>
            {/* 이런식으로 둘중 하나? */}
            <div className="flex items-center rounded-lg bg-teal-900 px-2 py-1 text-sm text-white">
              답변 완료
            </div>
            <div className="flex items-center rounded-lg bg-zinc-800 px-2 py-1 text-sm text-white">
              답변 대기
            </div>
          </div>

          <div className="flex flex-col gap-2 text-zinc-500 dark:text-zinc-400">
            <span>문의 날짜: 2025-03-23</span>
            <span>문의 유형: 기능 요청</span>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">문의</h3>
            <p className="pt-2">
              문의해요. 어쩌꾸저쩌구. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio amet assumenda, corrupti reiciendis, cum asperiores consequatur ratione
              libero et cupiditate quae officia unde facilis facere labore ea? Beatae, dicta
              deserunt! Fugiat, dolorum placeat autem qui pariatur libero! Tempore, deleniti amet.
              Voluptatum, aliquid. Deserunt illum magni commodi aut unde dolore quae accusamus
              perferendis nisi, iusto corrupti quaerat maiores! Exercitationem, ex delectus.
            </p>
          </div>

          <div>
            <h3 className="border-b pb-2 text-lg font-bold">답변</h3>
            <p className="pt-2">
              답변합니다. 블라블라. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              repellat voluptatem molestiae velit expedita voluptates sapiente esse aperiam.
              Veritatis a, maxime consequatur reprehenderit quisquam doloribus quas voluptates neque
              repudiandae facere. Pariatur voluptas debitis hic commodi aperiam! Facere tenetur
              temporibus doloremque perspiciatis corrupti provident unde sit sint animi, iure
              voluptate? Eius odio cupiditate cum dolorum aliquam recusandae consequuntur excepturi
              repudiandae iusto. Quidem ut porro ab dolor eveniet optio pariatur dolore, sint
              suscipit consequuntur assumenda sapiente recusandae quaerat natus, error laudantium
              libero, earum quibusdam cum sequi nemo quos! Deleniti eligendi nostrum nihil.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            {/* 수정하기는 답변이 없을 경우에만 활성화 */}
            {/* 문의 사항 작성페이지로 보내기 + 글 내용을 디폴트로? */}
            <Button variant="outline">수정하기</Button>
            {/* 확인 모달 띄우기 */}
            <Button>삭제하기</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
