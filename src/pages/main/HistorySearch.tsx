import { useSearchParams } from 'react-router';

export default function HistorySearch() {
  const [search] = useSearchParams();
  const searchParams = search.get('query');

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 md:px-8">
        <h2 className="text-center text-xl">{`검색 기록: ${searchParams}`}</h2>
        <ul className="flex w-full flex-col gap-8">
          {/* 검색 기록 받아서 맵돌리기 */}
          {/* <HistoryContentCard content={content} /> */}

          <li className="flex w-full flex-col gap-2 border-b pb-4">
            <h3 className="text-lg font-bold">검색 기록1</h3>
            <p className="font-extralight text-zinc-600 dark:text-zinc-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, eum nulla. Hic quia
              optio provident nesciunt mollitia, ipsum inventore reiciendis sint. Hic numquam fugiat
              consequatur minus itaque maiores corrupti assumenda? Fugit nulla iste placeat numquam
              maxime esse perferendis repudiandae voluptatibus. Repudiandae, perspiciatis,
              perferendis dolores unde, adipisci maiores distinctio explicabo reiciendis tenetur
              quae incidunt porro minima odit! Dignissimos, nisi in. Quidem?
            </p>
          </li>
          <li className="flex w-full flex-col gap-2 border-b pb-4">
            <h3 className="text-lg font-bold">검색 기록2</h3>
            <p className="font-extralight text-zinc-600 dark:text-zinc-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, sapiente dolore.
              Obcaecati tempore perferendis libero sed optio harum, voluptatum beatae. Corrupti fuga
              sapiente est sed odit voluptatibus laudantium, quia temporibus! Aut voluptate autem,
              consequuntur repudiandae eius cupiditate incidunt facilis minus ipsum qui, modi dolor!
              Aliquam, suscipit in assumenda iste voluptate eos, voluptatum odit, id sunt modi minus
              libero repellat aspernatur. Recusandae, consequuntur maxime? Dolor, pariatur odio,
              sapiente voluptatem illo mollitia deleniti debitis tenetur quasi ad, obcaecati eius.
              Ex quod, vitae praesentium commodi quasi excepturi facere deleniti ut eius veniam
              recusandae?
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
