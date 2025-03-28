import { History } from '@/types/ai';

export default function HistoryContentCard({ content }: { content: History }) {
  // 타입에 따라 조건부 렌더링?
  // console.log(content);
  return (
    <li className="flex w-full flex-col gap-4 border-b pb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">타입별로 이름</h3>
        <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {content.request_type}
        </span>
      </div>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">임시: {content.id}</span>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{content.created_at}</span>

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
