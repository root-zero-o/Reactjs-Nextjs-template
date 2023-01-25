import { NextSeo, NextSeoProps } from 'next-seo';

import { NEXT_SEO_DEFAULT } from '../../../../next-seo.config';

export default function Head() {
  // SEO Overriding
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'login',
    description: '로그인 페이지입니다.',
  };
  return (
    <>
      <NextSeo {...updateMeta} useAppDir={true} />
    </>
  );
}
