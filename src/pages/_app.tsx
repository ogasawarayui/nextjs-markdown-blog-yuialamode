import Layout from 'components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SEO from 'next-seo.config';
import { DefaultSeo } from 'next-seo';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

// Google Analytics のトラッキングIDを設定
const GA_TRACKING_ID = 'G-JZ1WSV6MWZ';

// ページ遷移時に Google Analytics でページビューを記録する関数
const handleRouteChange = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // ルートが変更されるたびにページビューを記録
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return(
    <>
      {/* Google Analyticsのスクリプトを読み込む */}
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
    </>
  );
}

export default MyApp;