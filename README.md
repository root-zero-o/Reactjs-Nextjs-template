# Reactjs-Nextjs-template

by [```root-zero-o```](https://github.com/root-zero-o/Reactjs-Nextjs-template)

## Index

- [Files]()
- [Route]()
- [Components]()
- [Styling]()
- [SEO]()
- [Google Analytics, Google tag manager]()
- [ESLint, Prettier]()
- [Build]()
- [etc]()

<br/>

> ❕ Next.js v13 업데이트에 관한 약간의 설명이 함께 적혀있습니다.

<br/>

## Getting Started

### Create new Project :

```
yarn
yarn dev
```

### Framework & library

- Next.js (SSR framework) [v13 doc](https://beta.nextjs.org/docs)
- next-seo (SEO)
- TailwindCSS, PostCSS, AutoPrefixer (Styling)

### Features

- Prettier, ESLint
- Github Action
- Next.js v13 directory structure & example codes
- TailwindCSS basic settings
- Next-Seo
- Font(@next/font)
- absolute path import
- Google Analytics, Google tag manager
- Docker

<br/>

---

<br/>

## Files

- layout.tsx

  - 모든 route가 공유하는 UI

  - app/layout.tsx는 기존 Next.js의 \_app, \_document의 역할을 한다고 합니다.

- page.tsx

  - route별 유니크한 UI

  - 기본 props로 `params`, `searchParams`를 지원합니다.

- loading.tsx

  - React Suspense의 fallback으로 사용되는 로딩 UI

  - 기본적으로 server component입니다.

  - 자동으로 페이지를 `<Suspense/>`로 감쌉니다.

  - 커스텀 스켈레톤 컴포넌트 구현에 적합합니다.

- error.tsx

  - 자동으로 페이지를 `<ErrorBoudary/>`로 감쌉니다.

  - 반드시 client component여야 합니다.

- head.tsx

  - 해당 route에서 `<head/>`를 조작할 수 있게 해줍니다.

  - 반드시 React fragment(`</>`)를 리턴해야합니다.(`<head/>`를 리턴해서는 안됩니다.)

- not-found.tsx

  - `notFound()` 함수가 404 에러를 리턴하면 렌더링되는 UI

> 다음과 같은 구조가 됩니다.
>
> ```javascript
> <Layout>
>   <Template>
>     <ErrorBoundary fallback={<Error />}>
>       <Suspense fallback={<Loading />}>
>         <Page />
>       </Suspense>
>     </ErrorBoundary>
>   </Template>
> </Layout>
> ```

<br/>

## Route

- 폴더 구조를 기반으로 라우팅이 이루어집니다.

- `app/page.tsx`가 기본 페이지가 되며, 폴더로 구분합니다.(`login` 폴더 => `/login`)

- 중첩 라우팅 : 마찬가지로 폴더 구조를 통해 구현할 수 있습니다.(`app/nested/routing` 참고)

- 그룹화 라우팅

  - (폴더명) 으로 폴더를 만들어 라우팅을 그룹화할 수 있습니다 (`(auth)/login`).

  - 이 때 (폴더명)은 URL에서 생략됩니다.

  - 그룹화된 라우팅별로 레이아웃을 따로 생성할 수 있습니다.(폴더 안에 `layout.tsx` 생성, `(auth)/layout.tsx` 참고)
    <br/>

- 다이나믹 라우팅

  - [폴더명]으로 폴더를 만들어 다이나믹 라우팅을 구현할 수 있습니다.(`/post/[slug]/page.tsx` 참고)

  - generateStaticParams()로 데이터에 맞는 param을 생성할 수 있습니다.([여기](https://beta.nextjs.org/docs/data-fetching/generating-static-params)를 참고하세요)

    ```javascript
    export async function generateStaticParams() {
      const posts = await getPosts();

      return posts.map((post) => ({
        slug: post.slug,
      }));
    }
    ```

<br/>

## Components

- app 폴더 내 component는 기본적으로 server component입니다.(page도 마찬가지)

- component 내에서 react hook을 사용하기 위해서는 최상단에 `use client`를 명시하여 client component로 만들어준 뒤 사용해야 합니다.

> ⚠️ server component는 client component에서 import할 수 없습니다.

<br/>

## Styling

- TailwindCSS를 사용하기 위한 세팅이 되어 있습니다.(`tailwind.config.js`, `app/globals.css`를 확인하세요.)

- Next.js에서는 data fetching이 일어나지 않는 client component에서 스타일링을 모두 처리할 것을 권장하고 있습니다. (client component에서의 data fetching 권장하지 않음)

- TailwindCSS의 class를 다이나믹하게 이용하기 위해 `tailwind-merge`와 `clsx` 라이브러리르 사용하고 있습니다.

  - 자세한 코드는 `src/lib/utils.ts`에서 확인하세요.

> ⚠️ CSS-in-JS 라이브러리는 현재 server component에서 사용할 수 없습니다.(이후 업데이트될 예정이라고 함) <br/>

- 폰트

  - `@next/font`를 통해 구글 폰트를 더 쉽게 사용할 수 있습니다.

  - 자세한 코드는 `app/layout.tsx`를 확인하세요.(현재 Roboto 폰트가 적용되어 있습니다.)

<br/>

## Data Fetching

- Next.js에서는 기본적으로 server component에서 데이터를 불러오는 것을 권장합니다.

- client component에서의 data fetching이 필요한 경우, React의 `use()`를 사용하거나 `SWR`, `React Query`를 사용할 수 있습니다. (Next.js에서는 아직 `use()`를 사용하지 않는 것을 권장합니다.)

- Data fetching에는 static data fetching, dynamic data fetching의 두 가지가 있습니다.

  - Static Data Fetching : 자주 바뀌지 않는 데이터, 자동적으로 데이터를 캐싱합니다.

  - Dynamic Data Fetching : 자주 바뀌는 데이터, 데이터가 캐싱되지 않습니다.

- 자세한 fetching 코드는 `app/post/[slug]/page.tsx` 를 참고하세요.

<br/>

## SEO

- next-seo 라이브러리를 사용하고 있습니다.

- Next.js v13 next-seo reference는 [여기](https://github.com/garmeeh/next-seo/blob/HEAD/APP_DIRECTORY.md)에서 확인하세요.

- `app/head.tsx` 에서 `next-seo.config.js`를 통해 전역 SEO를 사용하고 있습니다.

- 페이지별 SEO 오버라이딩은 `app/login/head.tsx` 를 확인하세요.

- Next.js v13부터 새롭게 사용되는 app 폴더를 사용하려면 `useAppDir` props를 반드시 사용해야 합니다.

> ⚠️ `layout.tsx` 의 `<head/>` 안에 작성한 코드는 모든 페이지에 적용되며, 오버라이딩할 수 없습니다.

<br/>

## Google Analytics, Google tag manager

- vercel에서 제공하는 예시를 참고했습니다. 예시는 [여기](https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics)에서 확인하세요.

<br/>

## ESLint, Prettier

- 자세한 설정은 `.prettierrc.json`, `.eslintrc.js`에서 확인하세요.

<br/>

## Build

<br/>

![share-nextjs drawio](https://user-images.githubusercontent.com/113869712/210694574-408e5335-3988-495d-bfa6-ad70291e100e.png)


- Docker를 이용해 이미지를 만들고, Github Actions를 통해 자동으로 이미지를 AWS ECR에 업로드합니다.

- Next.js에서 권장하는 `Dockerfile` 형식을 기반으로 하고 있습니다. 구체적인 예시는 [여기](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile)를 확인하세요.

- AWS ECR register, repo 주소는 테스트용이니, 사용하실 주소로 변경 후 사용해주세요.

- Github Secret에 access key, secret access key가 저장되어 있지 않으니, 사용하시기 전 등록해주세요.

> ⚠️ 빌드 시 발생하는 아래 warning은 next.js v13 app directory 사용에 의해 발생하는 것입니다.
>
> - You have enabled experimental feature (appDir) in next.config.js.
> - Experimental features are not covered by semver, and may cause unexpected or broken application behavior. Use at your own risk.

<br/>

## Storybook(⛔️현재 미사용중입니다.)

- UI 문서화를 위해 storybook을 사용합니다.

- 스토리북의 전반적인 이해와 활용 방법은 [여기](https://velog.io/@velopert/design-system-using-typescript-and-storybook)를 참고했습니다.(⚠️ 현재 버전과 맞지 않는 부분이 있으니 주의하세요.)

- `.storybook/main.cjs`와 `src/components/Hello` 에서 예시 코드를 확인하세요.

> ⚠️ `.storybook/main.cjs`를 ES module 형식인 `main.js`로 바꾸게 되면 에러가 발생합니다.
>
> - 이 템플릿에서는 commonJS 형식인 `main.cjs`로 파일명을 변경하여 에러를 해결했습니다.
> - 해당 이슈는 [여기](https://github.com/storybookjs/storybook/issues/11587)에서 확인할 수 있습니다.

- 스토리북 실행

  ```
  yarn storybook
  ```

- 스토리북 local

  ```
  http://localhost:6006/
  ```

- 애드온

  - Docs : 컴포넌트의 props와 주석으로 문서를 자동 생성해주는 애드온

    - Docs로 문서를 생성하는 방법은 `components/Hello/Hello.tsx`의 주석을 참고하세요.

> ⚠️ 현재 빌드시 아래와 같은 peer dependency warning이 발생하고 있으며, 해당 이슈는 해결 후 배포될 예정이라고 합니다.
>
> - @storybook/react@6.5.15" has unmet peer dependency "require-from-string@^2.0.2"
> - 자세한 내용은 [여기](https://github.com/storybookjs/storybook/issues/18241)를 확인하세요.

_⛔️ Storybook이 React18과 아직 완전히 호환되지 않는 부분(peer dependency 등)이 있어, 빌드 시 관련 warning이 발생합니다. 추후 storybook이 업데이트되면 다시 사용하겠습니다._

<br/>

## etc

- `@`를 사용해 absolute import를 할 수 있습니다.

  - 해당 코드는 `tsconfig.json`에서 확인하실 수 있습니다.
    ```javascript
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    },
    ```

- IE 접속시 크롬 다운로드 팝업이 노출됩니다.

  - 해당 코드는 `app/layout.tsx`에서 확인하실 수 있습니다.(Next.js Script 사용)
