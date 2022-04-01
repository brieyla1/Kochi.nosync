import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import ProgressLoad from '/src/components/ProgressLoad';
import { SidebarProvider } from '/src/context/SidebarContext';

import { Windmill } from '@windmill/react-ui';

// SSR displays warnings without this
import React from 'react';
React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#f0efeb" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png"></link>

        <title>Kochipad</title>
        <meta name="description" content="Windmill Dashboard for nextjs" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.1.1/css/all.css" />
      </Head>

      <style jsx global>{`
        html {
          font-family: 'Roboto', sans-serif;
          scroll-behavior: smooth;
          scroll-behavior: smooth;
        }
      `}</style>

      <DefaultSeo />
      <SidebarProvider>
        <Windmill usePreferences={true}>
          <ProgressLoad />
          <Component {...pageProps} />
        </Windmill>
      </SidebarProvider>
    </>
  );
}

export default App;
