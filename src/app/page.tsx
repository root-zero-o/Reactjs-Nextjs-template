import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <h1>홈</h1>
      <div>
        <Link href="/login">로그인으로 이동</Link>
      </div>
      <div>
        <Link href="/nested">중첩 라우팅</Link>
      </div>
      <div>
        <Link href="/post/1">다이나믹 라우팅, data fetching</Link>
      </div>
      <div className="mt-2">
        <span className="font-bold">TailwindCSS</span>가 적용되어 있습니다.
      </div>
    </div>
  );
};

export default Page;
