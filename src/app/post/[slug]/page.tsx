import { notFound } from 'next/navigation';

// Data Fetching
const getData = async () => {
  // static data fetching
  // const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  // dynamic data fetching
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    cache: 'no-store', // SSR
    // cache : "force-cache" // SSG
    // {
    //   next : { revalidate: 10 }  // 10초마다 한 번씩 revalidate
    // }
  });

  if (!response.ok) {
    // 가장 가까운 error.tsx를 활성화합니다.
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const data = await getData();

  if (!params.slug) {
    // throws NEXT_NOT_FOUNT error
    // render not-found.tsx
    notFound();
  }

  return (
    <div>
      <h3>data : {data.title}</h3>
      <h3>params.slug : {params.slug}</h3>
    </div>
  );
};

export default PostPage;
