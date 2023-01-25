const loading = () => {
  return <div>loading~</div>;
};

export default loading;

// 자동으로 페이지를 <Suspense/>로 감쌉니다.
// <Suspense fallback={<Loading/>}>
//      <Page/>
// </Suspense>
