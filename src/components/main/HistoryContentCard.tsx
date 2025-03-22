import { Recipe, Menu, Diet } from '@/types/ai';

export default function HistoryContentCard({ content }: { content: Recipe | Menu | Diet }) {
  // 타입에 따라 조건부 렌더링?
  console.log(content);
  return (
    <li className="flex w-full flex-col gap-2 border-b pb-4">
      <h3 className="text-lg font-bold">검색 기록</h3>
      <p className="font-extralight text-zinc-600 dark:text-zinc-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, eum nulla. Hic quia optio
        provident nesciunt mollitia, ipsum inventore reiciendis sint. Hic numquam fugiat consequatur
        minus itaque maiores corrupti assumenda? Fugit nulla iste placeat numquam maxime esse
        perferendis repudiandae voluptatibus. Repudiandae, perspiciatis, perferendis dolores unde,
        adipisci maiores distinctio explicabo reiciendis tenetur quae incidunt porro minima odit!
        Dignissimos, nisi in. Quidem?
      </p>
    </li>
  );
}
