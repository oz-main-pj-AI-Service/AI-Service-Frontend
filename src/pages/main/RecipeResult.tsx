// import { useRecipeQuery } from '@/hooks/useAiQuery';
// import { RecipeFormInput } from '@/types/ai';
// import { RawAxiosRequestHeaders } from 'axios';
import { useSearchParams } from 'react-router';

export default function RecipeResult() {
  const [searchParams] = useSearchParams();
  // const accessToken = localStorage.getItem('access_temp');

  const query = searchParams.get('q');

  // const recipeMutation = useRecipeQuery();

  // 여기 로그인 토큰 있어야함

  // 나중에 로그인 구현 기능 끝나면 정리
  // const requestHeader: RawAxiosRequestHeaders = {
  //   Authorization: `Bearer ${userToken?.access_token}`,
  //   'Content-Type': 'application/json',
  // };

  // const requestBody: RecipeFormInput = {
  //   ingredients: data.ingredients,
  //   serving_size: data.serving_size,
  //   cooking_time: data.cooking_time,
  //   difficulty: data.difficulty,
  // };

  // recipeMutation.mutate({ requestBody, headers: requestHeader });

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="w-full">
        <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
          <h1 className="my-4 text-center text-2xl font-bold">검색 결과</h1>
          <section className="w-full border p-4">
            <p>검색한 조건 (쿼리스트링): {query}</p>
          </section>
          <section className="mt-4 min-h-[500px] w-full border p-4">
            <p>api 응답 결과</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolores tenetur,
              dolore laborum sint consequuntur, officiis accusamus harum debitis, consectetur odit
              ea omnis sequi sed praesentium doloremque veniam asperiores labore? Expedita esse modi
              perspiciatis eaque laboriosam officiis vero? Porro illum facilis labore. Aliquid,
              minus minima distinctio assumenda deserunt asperiores dolor culpa excepturi unde id.
              Nam possimus fugiat obcaecati voluptate. Autem! Placeat non eum tempora nulla
              doloribus, facere vitae sed neque maiores nostrum numquam velit atque voluptatum ullam
              aliquam totam. Impedit, excepturi. Necessitatibus sapiente eius sint doloribus,
              assumenda id placeat aut. Perspiciatis excepturi maiores tenetur eaque rem quos,
              consequuntur dicta minus velit fuga ab voluptates consectetur, illo commodi atque
              expedita magnam? Porro cum aspernatur officiis quasi, hic maiores non consequuntur
              voluptates? Eligendi maxime esse nam, ut quos repudiandae. Ipsa fuga enim
              exercitationem reprehenderit nisi vero voluptatem ab aliquam deserunt repellendus!
              Similique officiis, omnis consequuntur officia excepturi in possimus sint corporis
              nemo? Repudiandae enim commodi minus illum, iste aspernatur ducimus cumque ipsum
              aliquam tempora quia facere cupiditate quisquam necessitatibus iusto quod numquam
              placeat deleniti. Ipsa, maxime at aliquam voluptatibus quidem commodi. Possimus. Odio
              quas deserunt quasi dolore inventore molestias est accusamus eum repellat explicabo,
              voluptates totam distinctio autem enim libero cum porro rem fuga quod odit aliquid
              iusto minima! Cupiditate, fugit odio. Eaque culpa sapiente incidunt. Deserunt quasi
              dolores maxime animi sed natus placeat numquam sit porro quas harum totam recusandae
              voluptatem laborum molestiae officia ipsa, inventore quidem nesciunt, molestias, eum
              sunt. Deserunt optio odit id iste amet! Nisi, rerum beatae ut doloremque deleniti
              aliquam est sapiente molestiae perferendis error sit voluptatibus. Eum dolorem fuga
              facere? Doloribus, deleniti cupiditate. Reiciendis, hic suscipit. Laboriosam, enim.
              Assumenda cumque doloribus quod sapiente molestias optio molestiae similique minus
              dolore? Quas velit ducimus aperiam asperiores similique. Vero blanditiis praesentium,
              aspernatur itaque sunt repudiandae iste adipisci. Deleniti, incidunt!
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
