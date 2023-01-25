'use client'; // error boundary는 반드시 client component여야 합니다.

const error = () => {
  return (
    <div>
      <h1>error!</h1>
    </div>
  );
};

export default error;

// 자동으로 페이지를 <ErrorBoudary>로 감쌉니다.
// <ErrorBoundary fallback={<Error/>}>
//      <Page/>
// </ErrorBoundary>

// data fetching or server component 내부에서 에러가 발생하면, Next.js는 가장 가까운 error.tsx 파일을 찾습니다.
