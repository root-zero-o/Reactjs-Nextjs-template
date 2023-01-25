import { Roboto } from '@next/font/google';
import Script from 'next/script';
import './globals.css';

// Google font
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={roboto.className}>
      <head>
        {/* 모든 사이트에 동일하게 적용할 태그는 여기에 입력합니다(오버라이딩 불가) */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* Google Analytics */}
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID`}
        />
        {/* Google tag manager */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'ID');
          `,
          }}
        />
      </head>
      <body>
        <Script
          id="ie-popup"
          defer
          dangerouslySetInnerHTML={{
            __html: `
          function isIE() {
            const ua = window.navigator.userAgent;
            const ie = /MSIE|Trident/.test(ua);
      
            return ie;
          }
          if (isIE()) {
            let path_to_images = '../';

            let logo = document.createElement('img');
            logo.src = path_to_images;
            logo.style.marginLeft = '20px';
            logo.style.marginTop = '20px';

            document.body.appendChild(logo);

            let isIEWrraper = document.createElement('div');
            isIEWrraper.style.minWidth = '1024px';
            isIEWrraper.style.position = 'absolute';
            isIEWrraper.style.top = '50%';
            isIEWrraper.style.left = '50%';
            isIEWrraper.style.transform = 'translate(-50%,-50%)';
            document.body.appendChild(isIEWrraper);
            isIEWrraper.setAttribute('id', 'isIeBox');
      
            let title = document.createElement('p');
            title.innerHTML = '인터넷 익스플로러에서는 서비스 이용이 제한됩니다.';
            title.setAttribute('id', 'isIeTitle');
      
            title.style.color = '#505050';
            title.style.fontWeight = 400;
            title.style.fontSize = '25px';
      
            title.style.textAlign = 'center';
            title.style.lineHeight = 1.4;
            title.style.letterSpacing = '-0.4px';
            title.style.marginTop = 'auto';
            title.style.marginBottom = 0;
      
            let subTitle = document.createElement('p');
            subTitle.innerHTML =
              '아래 버튼을 통해 새로운 브라우저를 다운로드 및 설치하신 후, 다시 접속해 주세요.';
            subTitle.setAttribute('id', 'isIeSubTitle');
      
            subTitle.style.color = '#505050';
            subTitle.style.fontWeight = 300;
            subTitle.style.fontSize = '25px';
      
            subTitle.style.textAlign = 'center';
            title.style.lineHeight = 1.4;
            title.style.letterSpacing = '-0.4px';
            subTitle.style.marginTop = 0;
            subTitle.style.marginBottom = '48px';
      
            let goChromeBtn = document.createElement('button');
      
            goChromeBtn.style.display = 'block';
            goChromeBtn.style.background =
              'linear-gradient(90deg, #5661D1 0%, #715FE2 100%)';
            goChromeBtn.style.borderRadius = '50px';
            goChromeBtn.style.border = 'none';
            goChromeBtn.style.color = 'white';
            goChromeBtn.style.padding = '10px 30px';
            goChromeBtn.style.cursor = 'pointer';
            goChromeBtn.style.fontSize = '20px';
            goChromeBtn.style.fontWeight = 500;
      
            goChromeBtn.style.marginLeft = 'auto';
            goChromeBtn.style.marginRight = 'auto';
      
            goChromeBtn.addEventListener('click', function () {
              window.location =
                'https://www.google.co.kr/chrome/?brand=CHBD&gclid=Cj0KCQiAg_KbBhDLARIsANx7wAyEXSWKw5K[…]8PZdx2-W2vAJhSXvp3WLM425MUUC9b_o_IaAtHZEALw_wcB&gclsrc=aw.ds';
            });
      
            let goChromeBtnText = document.createTextNode('크롬 다운로드 받기');
      
            goChromeBtn.appendChild(goChromeBtnText);
      
            document.querySelector('#isIeBox').appendChild(title);
            document.querySelector('#isIeBox').appendChild(subTitle);
            document.querySelector('#isIeBox').appendChild(goChromeBtn);
          }
          `,
          }}
        ></Script>
        <h3>기본 레이아웃</h3>
        {children}
      </body>
    </html>
  );
}
